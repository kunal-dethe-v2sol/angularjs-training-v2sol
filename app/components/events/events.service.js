/** 
 *   EventsApp
 * 
 *   This file includes the code for consuming the APIs for managing the data.
 *   Created on : 14 Jul, 2017, 11:05:25 AM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
            .module('eventsApp')
            .service('EventsDataService', EventsDataService);

    //Inject the dependencies if any.
    EventsDataService.$inject = [
        '$http',
        '$q',
        '$resource',
        'Restangular'
    ];

    //Contructor function
    function EventsDataService(
        $http,
        $q,
        $resource,
        Restangular) {
        
        var service = this;
        
        //Variables
        var resource = $resource('/server/index.php',
            {id: '@id'},
            {
                getAll: {
                    method: 'GET',
                    isArray: false
                }
            }
        );
        
        //Functions
        service.getEventsWithCallback = getEventsWithCallback;
        service.getEventsWithPromise = getEventsWithPromise;
        service.getEventsWithResource = getEventsWithResource;
        service.getEventsWithRestangular = getEventsWithRestangular;
        service.addEvent = addEvent;
        service.getEventWithResource = getEventWithResource;
        service.updateEventVote = updateEventVote;
        
        function getEventsWithCallback(callback) {
            $http({
                method: 'GET',
                url: '/server/index.php'
            })
            .then(function(data, status, headers, config) {
                callback(data);
            }, function(data, status, headers, config) {
                console.log('Error occured receiving events from the API');
            });
        }
        
        function getEventsWithPromise() {
            var deferred = $q.defer();
            
            $http({
                method: 'GET',
                url: '/server/index.php'
            })
            .then(function(data, status, headers, config) {
                deferred.resolve(data);
            }, function(data, status, headers, config) {
                console.log('Error occured receiving events from the API');
                deferred.reject(status);
            });
            
            return deferred.promise;
        }
        
        function getEventsWithResource() {
            return resource.getAll();
        }
        
        function getEventsWithRestangular() {
            return Restangular.all('server/index.php').getList();
        }
        
        function getEventWithResource(id) {
            return resource.get({id:id});
        }
        
        function addEvent(event) {
            return resource.save(event);
        }
        
        function updateEventVote(type, id) {
            var deferred = $q.defer();
            
            $http({
                method: 'PUT',
                url: '/server/update.php',
                data: {action: type+'VoteCount', id: id}
            })
            .then(function(data, status, headers, config) {
                deferred.resolve(data);
            }, function(data, status, headers, config) {
                console.log('Error occured receiving event upVoteCount from the API');
                deferred.reject(status);
            });
            
            //console.log('End of calling API');
            return deferred.promise;
        }
        
        return service;
    }
})();