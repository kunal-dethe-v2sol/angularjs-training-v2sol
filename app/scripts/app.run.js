/** 
 *   EventsApp
 * 
 *   This file includes the code that needs to be executed when the application runs.
 *   This is executed only once, when the angular application runs
 *   Created on : 19 May, 2017, 1:06:25 AM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')  //Do not remove the empty bracket from here. It is required.
            .run(run);

    //Inject the dependencies if any.
    run.$inject = [];

    //Contructor function
    function run() {
        //Any code that needs to be run at the start of the application.
    }
})();
