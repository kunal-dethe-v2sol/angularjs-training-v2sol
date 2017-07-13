/** 
 *   EventsApp
 * 
 *   This file includes the code that will load the template for the layout footer.
 *   This directive is loaded from the index.html
 *   Created on : 03 Jun, 2017, 2:06:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .directive('eventsFooter', eventsFooter);

    //Inject the dependencies if any.
    eventsFooter.$inject = [];

    //Contructor function
    function eventsFooter() {
        return {
            restrict: 'E',
            templateUrl: 'components/shared/footer/shared.footer.template.html',
        };
    }
})();