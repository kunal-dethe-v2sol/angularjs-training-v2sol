/** 
 *   EventsApp
 * 
 *   This file includes the code that will load the template for the layout header.
 *   This directive is loaded from the index.html
 *   Created on : 03 Jun, 2017, 2:06:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .directive('eventsHeader', eventsHeader);

    //Inject the dependencies if any.
    eventsHeader.$inject = [];

    //Contructor function
    function eventsHeader() {
        return {
            restrict: 'E',
            templateUrl: 'components/shared/header/shared.header.template.html',
        };
    }
})();