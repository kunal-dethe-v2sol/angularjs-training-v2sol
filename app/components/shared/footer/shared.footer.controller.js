/** 
 *   EventsApp
 * 
 *   This file includes the code for the layout footer.
 *   Created on : 14 Jul, 2017, 02:51:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
        .module('eventsApp')
        .controller('SharedFooterController', SharedFooterController);

    //Inject the dependencies if any.
    SharedFooterController.$inject = [
        '$location',
        '$anchorScroll'
    ];

    //Contructor function
    function SharedFooterController(
        $location,
        $anchorScroll) {
        
        var ctrl = this;

        //Variables
        
        //Functions
        ctrl.init = init;
        ctrl.scrollToTop = scrollToTop;

        //Initialization
        ctrl.init();

        //Function Definitions
        function init() {
        }

        function scrollToTop() {
            //Set the browser url hash value manually
            $location.hash('top');
            
            //Call the scroll, it will check for the browser url hash value
            $anchorScroll();
        }
    }
})();