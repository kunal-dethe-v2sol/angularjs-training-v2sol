/** 
 *   EventsApp
 * 
 *   This file includes the code that includes the routes for the whole application.
 *   This is executed only once, when the angular application runs
 *   Created on : 3 Jun, 2017, 7:06:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .config(route);

    //Inject the dependencies if any.
    route.$inject = ['$routeProvider'];

    //Contructor function
    function route($routeProvider) {
        $routeProvider
                .otherwise({
                    redirectTo: '/events'
                })
                .when('/', {
                    redirectTo: '/events'
                })
                .when('/events', {
                    templateUrl: 'components/events/events.list.template.html',
//                    controller: 'EventsLocalStorageController',
                    controller: 'EventsHttpController',
                    controllerAs: 'events'
                })
                .when('/events-add', {
                    templateUrl: 'components/events/events.add.template.html',
//                    controller: 'EventsLocalStorageController',
                    controller: 'EventsHttpController',
                    controllerAs: 'events'
                });
    }
})();