/** 
 *   EventsApp
 * 
 *   This file includes the code that will set the initial configurations to the modules.
 *   This is executed only once, when the angular application runs
 *   Created on : 4 Jun, 2017, 2:06:25 AM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .config(config);
    
    //Inject the dependencies if any.
    config.$inject = [
        '$locationProvider',
        'localStorageServiceProvider',
        'valdrMessageProvider',
        '$interpolateProvider'
    ];

    //Contructor function
    function config(
        $locationProvider,
        localStorageServiceProvider,
        valdrMessageProvider,
        $interpolateProvider) {
            
        // use the HTML5 History API
        // required to remove # from the urls
        $locationProvider.html5Mode(true);
        
        //Sets a prefix for storing the data into localStorage
        localStorageServiceProvider.setPrefix('eventsApp');
        
        //Common validation messages
        valdrMessageProvider.addMessages({
            'required': 'This field is required',
            'url': 'Please enter valid url'
        });
        
        //To use [[ and ]] instead of {{ and }} as the sybmols to be used for angularjs expressions
        //$interpolateProvider.startSymbol('[[').endSymbol(']]');
    }
})();