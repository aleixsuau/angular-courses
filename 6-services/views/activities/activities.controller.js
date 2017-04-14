https://angularbeds.firebaseio.com/aleix/activities.json


angular
    .module('myApp')
    .controller('ActivitiesController',ActivitiesController);

ActivitiesController.$inject = ["$filter", "ActivitiesService"];

function ActivitiesController ($filter, ActivitiesService) {

    var ctrl = this;

    // Interface (Bindable Members)
    //Data
    this.logged = true;
    // Model to show messages
    this.toast = {};
    // Array
    /*this.activities = [
        {
            title: 'Body Combat',
            coach: 'Rebeca Chan',
            dificulty: 9,
            type: 'hard',
            schedule: {
                sun: null,
                mon: [11.30,17],
                tue: null,
                wed: null,
                thu: [11.30,17],
                fri: [17],
                sat: null
            },
            scores:[4,4,8,8],
            users: 15
        },
        {
            title: 'Body Pump',
            coach: 'Kike 5',
            dificulty: 5,
            type: 'soft',
            schedule: {
                sun: [18],
                mon: [11.30,17],
                tue: null,
                wed: null,
                thu: [11.30,17],
                fri: [17],
                sat: null
            },
            scores:[4,2],
            users: 35
        },
        {
            title: 'Pilates',
            coach: 'Caty Mas',
            dificulty: 8,
            type: 'hard',
            schedule: {
                sun: [10],
                mon: [11.30,17],
                tue: null,
                wed: null,
                thu: [11.30,17],
                fri: [17],
                sat: null
            },
            scores:[7,8],
            users: 22
        }
    ]*/
    this.types = ['hard','soft'];  
    // Object
    /*this.activities = {
        bodycombat: {
            title: 'Body Combat',
            coach: 'Rebeca Chan',
            dificulty: 9,
            schedule: {
                sun: null,
                mon: [11.30,17],
                tue: null,
                wed: null,
                thu: [11.30,17],
                fri: [17],
                sat: null
            },
            scores:[4,4,8,8]
        },
        bodypump: {
            title: 'Body Pump',
            coach: 'Kike 5',
            dificulty: 5,
            schedule: {
                sun: null,
                mon: [11.30,17],
                tue: null,
                wed: null,
                thu: [11.30,17],
                fri: [17],
                sat: null
            },
            scores:[4,2]
        },
        pilates: {
            title: 'Pilates',
            coach: 'Caty Mas',
            dificulty: 8,
            schedule: {
                sun: null,
                mon: [11.30,17],
                tue: null,
                wed: null,
                thu: [11.30,17],
                fri: [17],
                sat: null
            },
            scores:[7,8]
        }
    }*/    
    this.activitiesCodes = {
        'BodyCombat': 'BC22',
        'BodyPump': 'BP23',
        'Pilates': 'PP24'
    }
    this.coachesCodes = {
        'RebecaChan': 'RCHAN',
        'Kike5': 'KK5',
        'CatyMas': 'CMAS'
    }
    // Model to add a new Activity with the Array of schedules (used to add multiple at once (ng-repeat))
    this.newActivity = {
        schedules: [{}]
    };

    // Public Methods
    this.getCode = getCode;
    this.remove = remove;
    this.addActivity = addActivity;
    this.addSchedule = addSchedule;
    this.deleteSchedule = deleteSchedule;

    // Controller initialization
    init();

    function init () {
        // this.activities = ActivitiesService.getAll();
        // ctrl.activities = ActivitiesService.getAll();
        ActivitiesService
            .getAll()
            .then(function(response){
                ctrl.activities = response.data;
            }); 
    }
    
    function getCode (title,coach,activitiesCodes,coachesCodes) {
        var title = title.replace(/ /g,'');
        var coach = coach.replace(/ /g,'');
        var activityCode = activitiesCodes[title];
        var coachCode = coachesCodes[coach];

        if ( activityCode && coachCode ) {
            return activityCode + '-' + coachCode;
        } else {
            return "No Code";
        }        
    }

    function addActivity (newActivity,activities,form) {
        /** Multiple Schedules */
        // Build new activity's model
        newActivity.schedule = {};
        angular.forEach(newActivity.schedules, function(schedule){
            // Build activity's schedule
            var scheduleDay = schedule.day.toLowerCase();
            var scheduleHour = schedule.time.getHours();
            var scheduleMinute = schedule.time.getMinutes();
            var scheduleTime = Number(scheduleHour + '.' + scheduleMinute);

            newActivity.schedule[scheduleDay] = schedule[scheduleDay] || [];
            newActivity.schedule[scheduleDay].push(scheduleTime);
        });
        newActivity.scores = [];
        newActivity.users = 0;
        // Delete schedules Array (is not in the original model)
        delete newActivity.schedules;

        var activitiesCopy = angular.copy(activities);
        activitiesCopy.push(newActivity);
        // Send to the server (Because Firebase doesn't accept store arrays directly, we need to put
        // the entire array to preserve the arrayish order.')
        ActivitiesService
            .put(activitiesCopy)
            .then(function(response){
                ctrl.activities = response;
                // Show messages
                ctrl.toast.message = 'Genial, has añadido una nueva actividad!'
                ctrl.toast.success = true;

                // Clear form
                newActivity.title = "";
                newActivity.coach = "";
                newActivity.dificulty = "";
                newActivity.type = "";
                newActivity.schedule = {};
                newActivity.schedules = [{}];
                form.$setPristine();
                form.$setUntouched();
            })
            .catch(function(){
                console.log("Sorry, something went wrong.");
            });

        /*// Build activity's schedule 
        var scheduleDay = newActivity.schedule.day.toLowerCase();
        var scheduleHour = newActivity.schedule.time.getHours();
        var scheduleMinute = newActivity.schedule.time.getMinutes();
        var scheduleTime = Number(scheduleHour + '.' + scheduleMinute);

        // Build new activity's model
        newActivity.schedule = {};
        newActivity.schedule[scheduleDay] = [];
        newActivity.schedule[scheduleDay].push(scheduleTime);
        newActivity.scores = [];
        newActivity.users = 0;

        // Send to the server (Because Firebase doesn't accept store arrays directly, we need to put
        // the entire array to preserve the arrayish order.')
        var activitiesCopy = angular.copy(activities);
        activitiesCopy.push(newActivity);
        ActivitiesService
            .put(activitiesCopy)
            .then(function(response){
                ctrl.activities = response.data;
                // Show messages
                ctrl.toast.message = 'Genial, has añadido una nueva actividad!'
                ctrl.toast.success = true;
                
                // Clear form
                newActivity.title = "";
                newActivity.coach = "";
                newActivity.dificulty = "";
                newActivity.type = "";
                newActivity.schedule = {};
                newActivity.schedules = [{}];
                form.$setPristine();
                form.$setUntouched();
            })
            .catch(function(){
                console.log("Sorry, something went wrong.");
            });*/
    }

    function remove (index) {
        if (!this.logged) return;
        ActivitiesService
            .remove(index)
            .then(function(response){
                ctrl.activities = response;
            })
            .catch(function(){
                console.log("Sorry, something went wrong.");
            });
    }

    // Push a new schedule to the schedule's array
    function addSchedule (schedules) {
        schedules.push({});
    }

    function deleteSchedule (index,collection) {
        if (!this.logged) return; 
        collection.splice(index,1);
    }

    /*this.go = go;
    function go (state) {
        console.log('Go to: ', state, $state, $state.current.name);
        $state.go(state);
    }*/
}
