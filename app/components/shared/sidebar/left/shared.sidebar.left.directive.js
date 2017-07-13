/** 
 *   EventsApp
 * 
 *   This file includes the code that will load the template for the layout left sidebar.
 *   This directive is loaded from the index.html
 *   Created on : 03 Jun, 2017, 2:06:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .directive('eventsLeftSidebar', eventsLeftSidebar);

    //Inject the dependencies if any.
    eventsLeftSidebar.$inject = [];

    //Contructor function
    function eventsLeftSidebar() {
        return {
            restrict: 'E',
            templateUrl: 'components/shared/sidebar/left/shared.sidebar.left.template.html',
        };
    }
})();