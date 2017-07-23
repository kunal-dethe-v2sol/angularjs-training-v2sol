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
        '$routeProvider',
        '$stateProvider',
        '$urlRouterProvider',
    ];

    //Contructor function
    function route(
        $routeProvider,
        $stateProvider,
        $urlRouterProvider
        ) {
        
        $urlRouterProvider
                .otherwise('/events');
        
        $stateProvider
                .state('root', {
                    url: '',
                    views: {
                        'root': {
                            template: '<div ui-view ></div>'
                        }
                    },
                    abstract: true,
                    sticky: true,
                    deepStateRedirect: {default: {state: "root.home"}}
                })
                .state('events', {
                    parent: "root",
                    url: "/events",
                    templateUrl: "components/events/list/events.list.template.html",
                    controller: 'EventsListController',
                    controllerAs: 'events',
                })
                .state('events-order-by-cost', {
                    parent: "root",
                    url: "/events-order-by-cost",
                    params: {
                        order: 'cost',
                    },
                    templateUrl: "components/events/list/events.list.template.html",
                    controller: 'EventsListController',
                    controllerAs: 'events',
                })
                .state('events-top', {
                    parent: "root",
                    url: "/events-top?limitTo",
                    templateUrl: "components/events/list/events.list.template.html",
                    controller: 'EventsListController',
                    controllerAs: 'events',
                })
                .state('events-add', {
                    parent: "root",
                    url: "/events-add",
                    templateUrl: "components/events/add/events.add.template.html",
                    controller: 'EventsAddController',
                    controllerAs: 'events',
                })
                .state('events-detail', {
                    parent: "events",
                    url: "/:event_id",
                    views: {
                        'root@': {
                            templateUrl: "components/events/detail/events.detail.layout.template.html",
                            controller: 'EventsDetailController',
                            controllerAs: 'events',
                        }
                    },
                    resolve: {
                        event: function($stateParams, EventsDataService) {
                            return EventsDataService
                                .getEventWithResource($stateParams.event_id)
                                .$promise
                                .then(
                                    function (response) {
                                        return response.event;
                                    },
                                    function (response) {
                                        console.log('getEventWithResource response error', response);
                                    }
                                );
                        }
                    }
                });
                
        
//        $routeProvider
//                .otherwise({
//                    redirectTo: '/events'
//                })
//                .when('/', {
//                    redirectTo: '/events'
//                })
//                .when('/events', {
//                    templateUrl: 'components/events/list/events.list.template.html',
////                    controller: 'EventsLocalStorageController',
//                    controller: 'EventsListController',
//                    controllerAs: 'events',
//                })
//                .when('/events-order-by-cost', {
//                    order: 'cost',
//                    templateUrl: 'components/events/list/events.list.template.html',
//                    controller: 'EventsListController',
//                    controllerAs: 'events'
//                })
//                .when('/events-top', {
//                    templateUrl: 'components/events/list/events.list.template.html',
//                    controller: 'EventsListController',
//                    controllerAs: 'events'
//                })
//                .when('/events-add', {
//                    templateUrl: 'components/events/add/events.add.template.html',
//                    controller: 'EventsAddController',
//                    controllerAs: 'events'
//                })
//                .when('/events-detail/:id', {
//                    //If both template and templateUrl are set, still template is loaded.
//                    //Does not matter if template or templateUrl is set first.
//                    //template: '<h1>This is loading content from template rather than templateUrl</h1>',
//                    templateUrl: 'components/events/detail/events.detail.layout.template.html',
//                    controller: 'EventsDetailController',
//                    controllerAs: 'events',
//                    //Data is taking some time to load the content and
//                    //so providing the content from here before displaying the content.
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
//                });
    }
})();