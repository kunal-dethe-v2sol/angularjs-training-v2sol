/** 
 *   EventsApp
 * 
 *   This file includes the code for the view single event functionality using $http/$resource services.
 *   This controller is loaded when the main route is loaded.
 *   Created on : 03 Jun, 2017, 7:06:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
        .module('eventsApp')
        .controller('EventsDetailController', EventsDetailController);

    //Inject the dependencies if any.
    EventsDetailController.$inject = [
        'EventsDataService',
        '$log',
        '$routeParams',
        '$route',
        'notify',
        '$stateParams',
        'event'
    ];

    //Contructor function
    function EventsDetailController(
        EventsDataService,
        $log,
        $routeParams,
        $route,
        notify,
        $stateParams,
        event) {

        var ctrl = this;

        //Variables
        //To load via route resolve property.
        ctrl.event_id = 0;
//        ctrl.event = $route.current.locals.event;
        ctrl.event = event;
        
        //Functions
        ctrl.init = init;
        ctrl.getEvent = getEvent;
        ctrl.upVote = upVote;
        ctrl.downVote = downVote;
        
        //Initialization
        ctrl.init();

        //Function Definitions
        function init() {
            //getEvent();
        }

        function getEvent() {
//            //Only provides the route params.
//            ctrl.routeParams_id = $routeParams.id;
//            
//            //Provides all the params (route and querystring).
//            ctrl.route_current_params_id = $route.current.params.id;
//            
//            //Only provides the route params.
//            ctrl.route_current_pathParams_id = $route.current.pathParams.id;
            
            ctrl.event_id = $stateParams.event_id;
            
            EventsDataService
                .getEventWithResource(ctrl.event_id)
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