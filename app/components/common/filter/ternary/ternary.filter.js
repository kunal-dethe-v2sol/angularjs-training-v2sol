/** 
 *   EventsApp
 * 
 *   This file includes the code for the filter that will
 *   accept the "input" as an input parameter and "defaultValue" as the filter option.
 *   If the input value is not undefined, default value will be returned.
 *   Created on : 14 Jul, 2017, 4:47:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .filter('atvTernary', atvTernary);

    //Inject the dependencies if any.
    atvTernary.$inject = [];

    //Contructor function
    function atvTernary() {
        return function(input, defaultValue) {
            return input != undefined ? input : defaultValue;
        }
    }
})();