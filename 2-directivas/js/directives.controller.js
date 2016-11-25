angular
.module('myApp')

.controller('DirectivesController',DirectivesController);
	
function DirectivesController ($timeout) {
    
    var self = this;
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

    this.customers = [
        {
        name: 'Aleix',
        surname: 'Martínez',
        email: 'info@macrofonoestudio.es',
        activity: this.activities[0]
        },
        {
        name: 'Jack',
        surname: 'Daniels',
        email: 'jackdaniels@hotelbeds.com',
        activity: this.activities[1]
        }
    ]
    
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

    this.newCustomer = {
        activity: this.activities[0]
    }

    this.errors = {};

    // Public Methods
    this.getCode = getCode;
    this.deleter = deleter;
    this.addActivity = addActivity;
    this.addCustomer = addCustomer;
    this.matchPattern = matchPattern;

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

    /*function getActivityTypes () {               
        angular.forEach(self.activities, function (activity) {
            if (self.types.indexOf(activity.type) === -1) {
                self.types.push(activity.type);
            }
        })
        console.log('getActivityTypes: ',self.types);
    }*/

    function addActivity (newActivity,activities,form) {
        var include = true;

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
        activities.push(newActivity);

        // Show messages
        this.toast.message = 'Genial, has añadido una nueva actividad!'
        this.toast.success = true;
        
        // Clear form
        form.$setPristine();
        form.$setUntouched();
        this.newActivity = {};

        // COMPROBAMOS SI LA ACTIVIDAD YA ESTÁ EN THIS.ACTIVITIES
        /*angular.forEach(vm.activities, function(activity){
            var activityTitle = activity.title.toLowerCase();
            var newActivityTitle = newActivity.title.toLowerCase()
            var activityCoach = activity.coach.toLowerCase();
            var newActivityCoach = newActivity.coach.toLowerCase();
            console.log('activityTitle,newActivityTitle,activityCoach,newActivityCoach: ',activityTitle,newActivityTitle,activityTitle.indexOf(newActivityTitle),activityCoach,newActivityCoach,activityCoach.indexOf(newActivityCoach));

            if (activityTitle.indexOf(newActivityTitle) !== -1 && activityCoach.indexOf(newActivityCoach) !== -1) {
                console.warn('Sorry, activity repeated');
                include = false;
            }
        })
        if (include) {
            vm.activities.push(newActivity);
        } */
    }

    function addCustomer (newCustomer,customers,form,errors) {
        var taken = false;
        
        // Check if the user already exists
        angular.forEach(customers, function(customer){
             if (newCustomer.email === customer.email) {
                console.log('taken',newCustomer.email, customer.email);
                taken = true;
             }
        });

        // Push the user to user's Array if it's new
        if (taken) {
            errors.email.taken = true;
            return;
        } else {
            var customerToPush = angular.copy(newCustomer);
            customers.push(customerToPush);
        }

        // Show messages
        this.toast.message = 'Genial, has añadido un nuevo customer!'
        this.toast.success = true;
        
        // Clear form & model
        form.$setPristine();
        form.$setUntouched();
        newCustomer.name = "";
        newCustomer.surname = "";
        newCustomer.email = "";
        newCustomer.activity = this.activities[0];
    }

    function matchPattern (model,errors) {        
        var pattern = new RegExp(".*@hotelbeds.com$");
        if (pattern.test(model)) {
            console.log('matchPattern: pass ',model);
            errors.email.domain = false;
        } else {
           console.log('matchPattern: NO pass ',model);
           errors.email.domain = true;
        }
    }



};
