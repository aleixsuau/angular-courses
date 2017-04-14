angular
    .module('myApp')
    .controller('ActivitiesController',ActivitiesController);

ActivitiesController.$inject = ['$filter'];

function ActivitiesController ($filter) {

    // Interface (Bindable Members)
    //Data
    this.logged = true;
    // Model to show messages
    this.toast = {};
    // Array
    this.activities = [
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
    ]
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
    this.errors = {};

    // Public Methods
    this.getCode = getCode;
    this.deleter = deleter;
    this.addActivity = addActivity;

    // Controller initialization
    init();


    function init () {
        /*getActivityTypes();*/

    }
    
    function getCode (title,coach,activitiesCodes,coachesCodes) {
        var title = title.replace(/ /g,'');
        var coach = coach.replace(/ /g,'');
        var activityCode = activitiesCodes[title];
        var coachCode = coachesCodes[coach];

        if ( activityCode && coachCode ) {
            return activityCode + '-' + coachCode;
        } else {
            return "No Code"
        }        
    }

    function deleter (index,group) {
        if (!this.logged) return; 
        group.splice(index,1);
    }

    function addActivity (newActivity,activities,form) {      

        // Build activity's schedule 
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

        // Push it to array
        activities.push(angular.copy(newActivity));

        // Show messages
        this.toast.message = 'Genial, has añadido una nueva actividad!'
        this.toast.success = true;
        
        // Clear form
        newActivity.title = "";
        newActivity.coach = "";
        newActivity.dificulty = "";
        newActivity.type = "";
        newActivity.schedule = {};
        newActivity.schedules = [{}];
        form.$setPristine();
        form.$setUntouched();
    }

};
