/** 
 *   EventsApp
 * 
 *   This file includes the code for the element directive that will
 *   display the single event.
 *   Created on : 17 Jul, 2017, 02:20:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .directive('eventsDetail', eventDetail);

    //Inject the dependencies if any.
    eventDetail.$inject = [];

    //Contructor function
    function eventDetail() {
        return {
            restrict: 'E',
            //replace: true,
            templateUrl: 'components/shared/event/event.detail.template.html',
            scope: {
                event: '=singleEvent',
                displayType: '@displayType',
                upVote: '&',
                downVote: '&',
            }
        };
    }
})();