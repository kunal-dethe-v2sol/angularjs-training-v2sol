/** 
 *   EventsApp
 * 
 *   This file includes the code for the Events CRUD functionality using $http service.
 *   This controller is loaded when the main route is loaded.
 *   Created on : 03 Jun, 2017, 7:06:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
        .module('eventsApp')
        .controller('EventsHttpController', EventsHttpController);

    //Inject the dependencies if any.
    EventsHttpController.$inject = [
        '$scope',
        'EventsDataService',
        '$log',
        '$locale',
        '$routeParams',
        '$route',
        '$location'
    ];

    //Contructor function
    function EventsHttpController(
        $scope,
        EventsDataService,
        $log,
        $locale,
        $routeParams,
        $route,
        $location) {

        var ctrl = this;

        //console.log('$locale', $locale);
        //console.log('$location', $location);

        //Variables
        //To load via route resolve property.
        ctrl.event = $route.current.locals.event;
        //ctrl.events = [];
        //To load via route resolve property.
        ctrl.events = $route.current.locals.events;
        ctrl.order = "";
        ctrl.limitTo = "";
        ctrl.routeParams_id = "";
        ctrl.route_current_params_id = "";
        ctrl.route_current_pathParams_id = "";

        //Functions
        ctrl.init = init;
        ctrl.reload = reload;
        ctrl.getEvents = getEvents;
        ctrl.getEventsUsingCallback = getEventsUsingCallback;
        ctrl.getEventsUsingPromise = getEventsUsingPromise;
        ctrl.getEventsUsingResource = getEventsUsingResource;
        ctrl.addEvent = addEvent;
        ctrl.getEvent = getEvent;
        ctrl.upVote = upVote;
        ctrl.downVote = downVote;
        ctrl.clearForm = clearForm;

        //Initialization
        ctrl.init();

        //Function Definitions
        function init() {
            
        }
        
        function reload() {
            $route.reload();
        }
        
        function getEvents() {
            //Default value is set from the app.route.php file for the listing page.
            if($route.current.order) {
                ctrl.order = $route.current.order;
            }
            
            //Default value is set from the query string for the listing page.
            if($route.current.params.limitTo) {
                ctrl.limitTo = $route.current.params.limitTo;
            }
            
//            getEventsUsingCallback();
//            getEventsUsingPromise();
            getEventsUsingResource();
        }

        function getEventsUsingCallback() {
            //$log.info('Started getEvents function');
            EventsDataService.getEventsWithCallback(function (response) {
                ctrl.events = response.data.events;
                //$log.info('Got events using callback');
                //$log.info('Displaying events');
            });
            //$log.info('Ended getEvents function');
        }

        function getEventsUsingPromise() {
            //$log.info('Started getEvents function');
            EventsDataService
                .getEventsWithPromise()
                .then(
                    function (response) {
                        ctrl.events = response.data.events;
                        //$log.info('Got events using promise');
                        //$log.info('Displaying events');
                    },
                    function (status) {
                        //$log.log('getEventsWithPromise status log', status);
                        //$log.info('getEventsWithPromise status info', status);
                        //$log.warn('getEventsWithPromise status warn', status);
                        $log.error('getEventsWithPromise status error', status);
                        //$log.debug('getEventsWithPromise status debug', status);
                    }
                );
            //$log.info('Ended getEvents function');
        }
        
        function getEventsUsingResource() {
            EventsDataService
                .getEventsWithResource()
                .$promise
                .then(
                    function (response) {
                        ctrl.events = response.events;
                    },
                    function (status) {
                        $log.error('getEventsWithResource status error', status);
                    }
                );
        }

        function addEvent(event) {
            //Setting default values;
            event.upVoteCount = 0;
            event.downVoteCount = 0;

            //Add the new event in the array of event and the save it on the server side
            EventsDataService
                .addEvent(event)
                .$promise
                .then(
                    function (response) {
                        ctrl.events.push(event);
                    },
                    function (status) {
                        $log.error('addEvent status error', status);
                    }
                );
            
            //Resetting it back to empty
            ctrl.clearForm();
        }

        function getEvent() {
            //Only provides the route params.
            ctrl.routeParams_id = $routeParams.id;
            
            //Provides all the params (route and querystring).
            ctrl.route_current_params_id = $route.current.params.id;
            
            //Only provides the route params.
            ctrl.route_current_pathParams_id = $route.current.pathParams.id;
            
            EventsDataService
                .getEventWithResource(ctrl.routeParams_id)
                .$promise
                .then(
                    function (response) {
                        ctrl.event = response.event;
                    },
                    function (response) {
                        $log.error('getEventWithResource response error', response);
                    }
                );
        }

        function upVote(event) {
            console.log('UpVote');
            EventsDataService
                .updateEventVote('up', event.id)
                .then(
                    function (response) {
                        event.upVoteCount = response.data.event.upVoteCount;
                    },
                    function (status) {
                        $log.error('updateEventUpVote status', status);
                    }
                );
        }

        function downVote(event) {
            console.log('DownVote');
            EventsDataService
                .updateEventVote('down', event.id)
                .then(
                    function (response) {
                        event.downVoteCount = response.data.event.downVoteCount;
                    },
                    function (status) {
                        $log.error('updateEventDownVote status', status);
                    }
                );
        }

        function clearForm() {
            ctrl.event = {};
            $scope.eventsForm.$setUntouched();
            $scope.eventsForm.$setPristine();
            angular.element($('#preview_image')).attr('src', '');
        }
    }
})();