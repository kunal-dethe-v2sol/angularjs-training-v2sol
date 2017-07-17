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
            .module('eventsApp')
            .run(run);

    //Inject the dependencies if any.
    run.$inject = [
        'valdrMessage',
        '$route',
        '$rootScope'
    ];

    //Contructor function
    function run(
        valdrMessage,
        $route,
        $rootScope) {
        
        //Any code that needs to be run at the start of the application.
        
        //Enable valdr to use the override of the error messages set from one 
        //place in the whole application.
        //The override is done in the app.config.php file
        valdrMessage.angularMessagesEnabled = true;
        
        //Common function that can be used in any .html view file for reloading 
        //the angularjs page.
        $rootScope.reload = function() {
            $route.reload();
        }
    }
})();
