/** 
 *   EventsApp
 * 
 *   This file includes the code for the EventsApp CRUD functionality using localStorageService service.
 *   This controller is loaded when the main route is loaded.
 *   Created on : 03 Jun, 2017, 7:06:25 PM
 *   Author     : Kunal Dethe
 */
(function () {
    "use strict";

    //Set the module name so that the below code will run within its scope.
    angular
        .module('eventsApp')
        .controller('EventsLocalStorageController', EventsLocalStorageController);

    //Inject the dependencies if any.
    EventsLocalStorageController.$inject = ['$scope', 'localStorageService'];

    //Contructor function
    function EventsLocalStorageController($scope, localStorageService) {
        var ctrl = this;

        //Variables
        ctrl.event = {};
        ctrl.events = [
            {
                name: 'The Tripp - Thursday Live!',
                date: '2017-07-13',
                time: '08:30 PM',
                duration: 3, //hours
                image: 'https://lh3.googleusercontent.com/KjTmUWO1UYov6MLS8NyyjXiue6nxzlc_BnxalVrzUT5XePCChu6rVhxA84bAdfOc6ZCBjF-x_BQCdhkbcPIELPzFpA=s731',
                host: 'Hard Rock Cafe Andheri',
                address: 'Hard Rock Cafe Andheri, Andheri, Mumbai',
                details: "Bombay's Blues/Rock outfit The Tripp consists of Joel Padikkal on vocals, David Britto on bass guitar, Keegan Moraes and Ralcus Aguiar on lead guitars. Rinaldo D'souza on rhythmn guitar and Ryan Sequeira on drums. Formed in September 2012, The Tripp has played at festivals venues across the country. The Tripp were also Regional Winners of Hard Rock Rising Battle of the Bands in 2015. The band collaborated with EMERGE to make video for the coming of ALT J to India, covering ALT J’s Left Hand Free. The Tripp's set is complete with some sweet guitars solos, interesting rhythm play and soul powered Vocals. Their original Blues sound has progressed through the years to a more power packed Blues/Rock sound.",
                cost: 500,
                currency: 'Rs. ',
                upVoteCount: 0,
                downVoteCount: 0
            },
            {
                name: 'Illusionist-Blvperd Typ3Records EP Release Supported By DeeperSecrets',
                date: '2017-07-13',
                time: '09:00 PM',
                duration: 2, //hours
                image: 'https://lh3.googleusercontent.com/xRtTKBYKcSo7YfilZghvsVqnKKDAsewauLV9BZg7Weq_Kg9NNG-k5djewW8brkVNkkusb9Avxt6dFbICl07Igbna0Q=s711',
                host: 'Deeper Secrets',
                address: 'Khar Social, Khar, Mumbai',
                details: "This is a story about the power of Being One, when parts merge into The One where they have always belonged. When they finally do, all that you experienced during the journey seem like musings of the \"Illusionist\". Making us believe so strongly in it yet still covered with mystery. The latest release by BLVPERD \”The Illusionist\" TYP3-041 on Typ3 Records draws inspiration from life-events and places of such nature. It makes us listen to the silence inside the illusion of the world.",
                cost: 0,
                currency: '$ ',
                upVoteCount: 0,
                downVoteCount: 0
            },
            {
                name: 'Ballet With Raindrops ~ Painting Party',
                date: '2017-07-13',
                time: '03:00 PM',
                duration: 2, //hours
                image: 'https://lh3.googleusercontent.com/k4Yai-fGGndm94X7VEYpWymgQ00ciHXewSfmaSGM6_Z3_w69WnY_JGtj-tJgS85HwTgj8kIZqYHaDcqIY7U9Rw=s400',
                host: 'Doolally Taproom',
                address: 'Doolally Taproom, Colaba, Mumbai',
                details: "Best way to celebrate monsoon? With a painting party !! Take inspiration from the clouds, lighting and rains, and join us for a relaxing painting party called Ballet with Raindrops. Create masterpiece on a blank canvas, without worrying about supplies (as we'll be giving you those) and have yourself a great time. NO PRIOR EXPERIENCE IN DRAWING & PAINTING NEEDED Entry : 1650/- (Includes all art material, food & beverages)",
                cost: 1650,
                currency: 'Rs. ',
                upVoteCount: 0,
                downVoteCount: 0
            }
        ];

        //Functions
        ctrl.init = init;
        ctrl.getEvents = getEvents;
        ctrl.addEvent = addEvent;
        ctrl.upVote = upVote;
        ctrl.downVote = downVote;
        ctrl.clearForm = clearForm;

        //Initialization
        ctrl.init();

        //Function Definitions
        function init() {
            if (ctrl.events.length === 0 && localStorageService.length() > 0) {
                ctrl.events = localStorageService.get('events');
            } else if (localStorageService.length() > 0) {
                ctrl.events = localStorageService.get('events');
            } else if (ctrl.events.length > 0) {
                localStorageService.set('events', ctrl.events);
            }
        }

        function getEvents() {
            return ctrl.events;
        }

        function addEvent(event) {
            //Setting default values;
            event.upVoteCount = 0;
            event.downVoteCount = 0;

            //Add the new event in the array of event and the save it in the localStroage
            ctrl.events.push(event);
            localStorageService.set('events', ctrl.events);

            //Resetting it back to empty
            ctrl.clearForm();
        }

        function upVote(event) {
            event.upVoteCount++;
            localStorageService.set('events', ctrl.events);
        }

        function downVote(event) {
            event.downVoteCount++;
            localStorageService.set('events', ctrl.events);
        }

        function clearForm() {
            ctrl.event = {};
            $scope.eventsForm.$setUntouched();
            $scope.eventsForm.$setPristine();
            angular.element($('#preview_image')).attr('src', '');
        }
    }
})();