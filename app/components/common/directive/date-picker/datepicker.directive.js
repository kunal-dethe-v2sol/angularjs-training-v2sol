/** 
 *   EventsApp
 * 
 *   This file includes the code for the atribute directive that will
 *   jQuery Datepicker on the element.
 *   Created on : 17 Jul, 2017, 05:38:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .directive('atvDatepicker', atvDatepicker);

    //Inject the dependencies if any.
    atvDatepicker.$inject = [];

    //Contructor function
    function atvDatepicker() {
        return {
            restrict: 'A',
            link: function(scope, element, attributes, controller) {
                element.datepicker({
                    format: 'yyyy-mm-dd'
                });
            }
        };
    }
})();