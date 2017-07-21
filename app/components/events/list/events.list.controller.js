/** 
 *   EventsApp
 * 
 *   This file includes the code for the List Events functionality using $http/$resourse services.
 *   This controller is loaded when the main route is loaded.
 *   Created on : 03 Jun, 2017, 7:06:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
        .module('eventsApp')
        .controller('EventsListController', EventsListController);

    //Inject the dependencies if any.
    EventsListController.$inject = [
        'EventsDataService',
        '$log',
        '$locale',
        '$route',
        '$location',
        'notify'
    ];

    //Contructor function
    function EventsListController(
        EventsDataService,
        $log,
        $locale,
        $route,
        $location,
        notify) {

        var ctrl = this;

//        console.log('$locale', $locale);
//        console.log('$location', $location);

        //Variables
        ctrl.events = [];
        ctrl.order = "";
        ctrl.limitTo = "";
        
        //Functions
        ctrl.init = init;
        ctrl.reload = reload;
        ctrl.getEvents = getEvents;
        ctrl.getEventsUsingCallback = getEventsUsingCallback;
        ctrl.getEventsUsingPromise = getEventsUsingPromise;
        ctrl.getEventsUsingResource = getEventsUsingResource;
        ctrl.getEventsUsingRestangular = getEventsUsingRestangular;
        ctrl.upVote = upVote;
        ctrl.downVote = downVote;
        
        //Initialization
        ctrl.init();

        //Function Definitions
        function init() {
            getEvents();
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
//            getEventsUsingResource();
            getEventsUsingRestangular();
        }

        function getEventsUsingCallback() {
            EventsDataService.getEventsWithCallback(function (response) {
                ctrl.events = response.data.events;
            });
        }

        function getEventsUsingPromise() {
            EventsDataService
                .getEventsWithPromise()
                .then(
                    function (response) {
                        ctrl.events = response.data.events;
                    },
                    function (status) {
                        $log.error('getEventsWithPromise status error', status);
                    }
                );
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
        
        function getEventsUsingRestangular() {
            EventsDataService
                .getEventsWithRestangular()
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

        function upVote(event) {
            EventsDataService
                .updateEventVote('up', event.id)
                .then(
                    function (response) {
                        event.upVoteCount = response.data.event.upVoteCount;
                        notify({ message:'Successfully up-voted the event.', classes :'alert-success'});
                    },
                    function (status) {
                        $log.error('updateEventUpVote status', status);
                    }
                );
        }

        function downVote(event) {
            EventsDataService
                .updateEventVote('down', event.id)
                .then(
                    function (response) {
                        event.downVoteCount = response.data.event.downVoteCount;
                        notify({ message:'Successfully down-voted the event.', classes :'alert-success'});
                    },
                    function (status) {
                        $log.error('updateEventDownVote status', status);
                    }
                );
        }
    }
})();