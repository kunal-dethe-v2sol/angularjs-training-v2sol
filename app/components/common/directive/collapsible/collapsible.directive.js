/** 
 *   EventsApp
 * 
 *   This file includes the code for the element directive that will
 *   implement the accordian type functionality to the elements.
 *   Created on : 17 Jul, 2017, 4:05:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .directive('atvCollapsible', atvCollapsible);

    //Inject the dependencies if any.
    atvCollapsible.$inject = [];

    //Contructor function
    function atvCollapsible() {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div><h2 class="wel-title" ng-click="toggleVisibility()">{{title}}</h2><div ng-show="visible" ng-transclude></div></div>',
            controller: function($scope) {
                $scope.visible = true;
                
                $scope.toggleVisibility = function() {
                    $scope.visible = !$scope.visible;
                }
            },
            scope: {
                title: '@'
            }
        };
    }
})();