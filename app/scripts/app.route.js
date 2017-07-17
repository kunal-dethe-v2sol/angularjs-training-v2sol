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
    route.$inject = [
        '$routeProvider'
    ];

    //Contructor function
    function route(
        $routeProvider
        ) {
        
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
                    controllerAs: 'events',
                    //Data is taking some time to load the content and
                    //so providing the content from here before displaying the content.
//                    resolve: {
//                        events: function(EventsDataService) {
//                            return EventsDataService
//                                    .getEventsWithPromise()
//                                    .then(
//                                        function (response) {
//                                            console.log('Got events using promise');
//                                            return response.data.events; 
//                                        },
//                                        function (status) {
//                                            console.log('resolve events getEventsWithPromise status error', status);
//                                        }
//                                    );
//                        }
//                    }
                })
                .when('/events-order-by-cost', {
                    order: 'cost',
                    templateUrl: 'components/events/events.list.template.html',
                    controller: 'EventsHttpController',
                    controllerAs: 'events'
                })
                .when('/events-top', {
                    templateUrl: 'components/events/events.list.template.html',
                    controller: 'EventsHttpController',
                    controllerAs: 'events'
                })
                .when('/events-add', {
                    templateUrl: 'components/events/events.add.template.html',
//                    controller: 'EventsLocalStorageController',
                    controller: 'EventsHttpController',
                    controllerAs: 'events'
                })
                .when('/events-detail/:id', {
                    //If both template and templateUrl are set, still template is loaded.
                    //Does not matter if template or templateUrl is set first.
                    //template: '<h1>This is loading content from template rather than templateUrl</h1>',
                    templateUrl: 'components/shared/event/event.detail.layout.template.html',
                    controller: 'EventsHttpController',
                    controllerAs: 'events',
                    //Data is taking some time to load the content and
                    //so providing the content from here before displaying the content.
//                    resolve: {
//                        event: function($route, EventsDataService) {
//                            return EventsDataService
//                                .getEventWithResource($route.current.params.id)
//                                .$promise
//                                .then(
//                                    function (response) {
//                                        return response.event;
//                                    },
//                                    function (response) {
//                                        console.log('getEventWithResource response error', response);
//                                    }
//                                );
//                        }
//                    }
                });
    }
})();