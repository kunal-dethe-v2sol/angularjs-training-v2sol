/** 
 *   EventsApp
 * 
 *   This file includes the code for the attribute directive that will
 *   apply the jQuery uniform plugin to the element.
 *   Created on : 10 Jun, 2017, 1:06:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .directive('avtJqueryUniform', avtJqueryUniform);

    //Inject the dependencies if any.
    avtJqueryUniform.$inject = [
        '$timeout'
    ];

    //Contructor function
    function avtJqueryUniform(
        $timeout) {
        
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                element.uniform({useID: false});
                scope.$watch(function () {
                    return ngModel.$modelValue
                }, function () {
                    $timeout(jQuery.uniform.update, 0);
                });
            }
        };
    }
})();