/** 
 *   EventsApp
 * 
 *   This file includes the code for the EventsApp CRUD functionality using $http service.
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
    EventsHttpController.$inject = ['$scope', 'EventsDataService', '$log'];

    //Contructor function
    function EventsHttpController($scope, EventsDataService, $log) {
        var ctrl = this;

        //Variables
        ctrl.event = {};
        ctrl.events = [];

        //Functions
        ctrl.init = init;
        ctrl.getEventsUsingCallback = getEventsUsingCallback;
        ctrl.getEventsUsingPromise = getEventsUsingPromise;
        ctrl.addEvent = addEvent;
        ctrl.upVote = upVote;
        ctrl.downVote = downVote;
        ctrl.clearForm = clearForm;

        //Initialization
        ctrl.init();

        //Function Definitions
        function init() {
//            getEventsUsingCallback();
            getEventsUsingPromise();
        }

        function getEventsUsingCallback() {
            $log.info('Started getEvents function');
            EventsDataService.getEventsWithCallback(function (response) {
                ctrl.events = response.data.events;
                $log.info('Got events using callback');
                $log.info('Displaying events');
            });
            $log.info('Ended getEvents function');
        }
        
        function getEventsUsingPromise() {
            $log.info('Started getEvents function');
            EventsDataService
                .getEventsWithPromise()
                .then(
                    function (response) {
                        ctrl.events = response.data.events;
                        $log.info('Got events using promise');
                        $log.info('Displaying events');
                    },
                    function (status) {
                        //$log.log('getEventsWithPromise status log', status);
                        //$log.info('getEventsWithPromise status info', status);
                        //$log.warn('getEventsWithPromise status warn', status);
                        $log.error('getEventsWithPromise status error', status);
                        //$log.debug('getEventsWithPromise status debug', status);
                    }
                );
            $log.info('Ended getEvents function');
        }

        function addEvent(event) {
            //Setting default values;
            event.upVoteCount = 0;
            event.downVoteCount = 0;

            //Add the new event in the array of event and the save it on the server side
            ctrl.events.push(event);
            //localStorageService.set('events', ctrl.events);

            //Resetting it back to empty
            ctrl.clearForm();
        }

        function upVote(event) {
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