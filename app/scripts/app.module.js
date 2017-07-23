/** 
 *   EventsApp
 * 
 *   This file includes the code that will inject all the commonly required module throughout the application.
 *   This is executed only once, when the angular application runs
 *   Created on : 19 May, 2017, 1:06:25 AM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp', [
                'ngRoute',
                'ngResource',
                'LocalStorageModule',
                'valdr',
                'cgNotify',
                'restangular',
                'ui.router',
            ]);
})();