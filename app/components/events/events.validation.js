/** 
 *   EventsApp
 * 
 *   This file includes the code for validating the add new Event form.
 *   This controller is loaded when the Add Event landing page is loaded.
 *   Created on : 13 Jul, 2017, 04:26:25 AM
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
        'valdrProvider'
    ];

    //Contructor function
    function config(
        valdrProvider) {
        
        valdrProvider.addConstraints({
            Event: {
                cost: {
                    min: {
                        value: 0,
                        message: 'Minimum 0 (Free) is allowed'
                    },
                    max: {
                        value: 20000,
                        message: 'Maximum 20000 is allowed'
                    }
                },
            }
        });
    }
})();