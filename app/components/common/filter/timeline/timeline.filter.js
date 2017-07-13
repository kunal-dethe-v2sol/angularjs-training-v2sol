/** 
 *   EventsApp
 * 
 *   This file includes the code for the filter that will
 *   accept the "time" as an input parameter and "duration" as the filter option.
 *   Created on : 13 Jul, 2017, 1:43:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .filter('timeline', timeline);

    //Inject the dependencies if any.
    timeline.$inject = [];

    //Contructor function
    function timeline() {
        // In the return function, we must pass in a single parameter which will be the data we will work on.
        // We have the ability to support multiple other parameters that can be passed into the filter optionally
        return function(input, duration) {
            var output = input;
            duration = parseInt(duration);
            
            var datetime = new Date('1970-01-01 ' + input);
            if(datetime != 'Invalid Date' && duration) {
                output = new Date(datetime.getTime() + duration*3600000);
                
                var hour = output.getHours();
                var mins = output.getMinutes();
                var appm = '';

                if(hour >= 12) {
                    hour = hour - 12;
                    hour = ('0'  + hour).slice(-2);
                    appm = ' PM';
                } else {
                    appm = ' AM';
                    hour = ('0'  + hour).slice(-2);
                }
                
                mins = ('0'  + mins).slice(-2);
                output = input + ' - ' + hour + ':' + mins + ' ' + appm;
            }
            return output;
        }
    }
})();