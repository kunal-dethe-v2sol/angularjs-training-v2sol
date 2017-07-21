/** 
 *   EventsApp
 * 
 *   This file includes the code for the Add Event functionality using $http/$resourse services.
 *   This controller is loaded when the main route is loaded.
 *   Created on : 03 Jun, 2017, 7:06:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
        .module('eventsApp')
        .controller('EventsAddController', EventsAddController);

    //Inject the dependencies if any.
    EventsAddController.$inject = [
        '$scope',
        'EventsDataService',
        '$log',
        '$location',
        'notify'
    ];

    //Contructor function
    function EventsAddController(
        $scope,
        EventsDataService,
        $log,
        notify) {

        var ctrl = this;

        //Variables
        //To load via route resolve property.
        ctrl.event = {};
        ctrl.routeParams_id = "";
        ctrl.route_current_params_id = "";
        ctrl.route_current_pathParams_id = "";

        //Functions
        ctrl.init = init;
        ctrl.addEvent = addEvent;
        ctrl.clearForm = clearForm;

        //Initialization
        ctrl.init();

        //Function Definitions
        function init() {
            
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
                        notify({ message:'Event is successfully added.', classes :'alert-success'});
                    },
                    function (status) {
                        $log.error('addEvent status error', status);
                    }
                );
            
            //Resetting it back to empty
            ctrl.clearForm();
        }
        
        function clearForm() {
            ctrl.event = {};
            $scope.eventsForm.$setUntouched();
            $scope.eventsForm.$setPristine();
            angular.element($('#preview_image')).attr('src', '');
        }
    }
})();