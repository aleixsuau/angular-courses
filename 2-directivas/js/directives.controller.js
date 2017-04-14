angular
.module('myApp')

.controller('DirectivesController',DirectivesController);
	
function DirectivesController ($filter) {
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
        email: 'amartinezsuau@hotelbeds.com',
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
    // Model to add a new Activity with the Array of schedules (used to add multiple at once (ng-repeat))
    this.newActivity = {
        schedules: [{}]
    };

    // PUBLIC METHODS
    // Get the activity code
    this.getCode = getCode;
    // Delete an element from a collection
    this.deleter = deleter;
    this.addActivity = addActivity;
    this.addSchedule = addSchedule;
    this.addCustomer = addCustomer;
    // Check if the email match a pattern
    this.matchPattern = matchPattern;
    // Check if the email is already taken
    this.emailTaken = emailTaken;

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

       /* // Build activity's schedule
        var scheduleDay = newActivity.schedule.day.toLowerCase();
        var scheduleHour = newActivity.schedule.time.getHours();
        var scheduleMinute = newActivity.schedule.time.getMinutes();
        var scheduleTime = Number(scheduleHour + '.' + scheduleMinute);

        // Build new activity's model
        newActivity.schedule = {};
        newActivity.schedule[scheduleDay] = [];
        newActivity.schedule[scheduleDay].push(scheduleTime);
        newActivity.scores = [];
        newActivity.users = 0;*/

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

    // Push a new schedule to the schedule's array
    function addSchedule (schedules) {
        schedules.push({});
    }

    function addCustomer (newCustomer,customers,form) {
        // Push the new customer
        customers.push(angular.copy(newCustomer));

        // Show messages
        this.toast.message = 'Genial, has añadido un nuevo customer!'
        this.toast.success = true;
        
        // Clear form & model        
        newCustomer.name = "";
        newCustomer.surname = "";
        newCustomer.email = "";
        newCustomer.activity = this.activities[0];
        form.$setPristine();
        form.$setUntouched();        
    }

    function matchPattern (model, form) {    
        var pattern = new RegExp(".*@hotelbeds.com$");
        if (pattern.test(model)) {
            console.log('matchPattern: pass ',model);
            form.email.$setValidity("domain", true);
        } else {
           console.log('matchPattern: NO pass ',model);
           form.email.$setValidity("domain", false);
        }
    }

    function emailTaken (email, customers, form) {
        var taken = false;
        angular.forEach(customers, function(customer){
             if (email === customer.email) {
                console.log('taken',email, customer.email);
                taken = true;
             }
        });

        // OPCIONES DE FILTRADO
        // With .filter
        /* var taken = customers.filter(function(customer){
            return newCustomer.email === customer.email;
        })[0]; */

        // With $filter STRING (NO funcionaría puesto que considera match cualquier string
        // que CONTENGA el criterio de búsqueda, no que coincida estrictamente. Por eso filtramos por Object(Abajo))
        // var taken = $filter('filter')(customers,newCustomer.email)[0];

        // With $filter OBJECT (SI funcionaría puesto que busca la propiedad
        // que CONTENGA el criterio de búsqueda exacto. (===)
        // var taken = $filter('filter')(customers,{email:newCustomer.email})[0];  

        if (taken) {
            console.log("Email Taken");
            form.email.$setValidity("taken", false);
        } else {
            console.log("Email NOT Taken");
            form.email.$setValidity("taken", true);
        }
    }
};
