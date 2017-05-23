angular
    .module('myApp')
    .controller('ActivitiesController',ActivitiesController);

ActivitiesController.$inject = ['ActivitiesService', 'CoachesService', '$q', 'activities', 'activitiesCodes', 'coachesCodes', '$rootScope', '$timeout'];

function ActivitiesController (ActivitiesService, CoachesService, $q, activities, activitiesCodes, coachesCodes, $rootScope, $timeout){
    // Emit event sample
    // $rootScope.$emit('eventone', {user:'aleix'});
    
    // Freeze the 'this'
    var ctrl = this;
    // Interface (Bindable Members)  
    // Model to show messages
    ctrl.toast = {};
    // Model to add a new Activity with the Array of schedules (used to add multiple at once (ng-repeat))
    ctrl.newActivity = {
        schedules: [{}]
    };

    // Public Methods
    ctrl.getActivityCode = getActivityCode;
    ctrl.addActivity = addActivity;
    ctrl.removeActivity = removeActivity;
    ctrl.addSchedule = addSchedule;
    ctrl.deleteSchedule = deleteSchedule;
    ctrl.saveActivity = saveActivity;

    // & Binding Sample
    ctrl.logIt = function (data) {
        console.log("logIt: ", data);
    } 

    // BINDING TO RESOLVED DEPENDENCIES (ROUTER)
    ctrl.activitiesCodes = activitiesCodes;
    ctrl.coachesCodes = coachesCodes;
    ctrl.activities = activities;
    
    function getActivityCode (title,coach,activitiesCodes,coachesCodes) {
        console.log('getActivityCode: ', ActivitiesService.getActivityCode(title,coach,activitiesCodes,coachesCodes));
        return ActivitiesService.getActivityCode(title,coach,activitiesCodes,coachesCodes);
    }

    function addActivity (newActivity,form) {        
        // Send to the server
        ActivitiesService
            .post(newActivity)
            .then(function(response){
                // Show messages
                ctrl.toast.message = 'Genial, has añadido una nueva actividad!';
                ctrl.toast.success = true;
                // Clear model & form
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
                // Show messages
                ctrl.toast.message = 'Ups, ha ocurrido un error!';
                ctrl.toast.warning = true;
            });
    }

    function removeActivity (id) {
        ActivitiesService
            .remove(id)
            .catch(function(){
                // Show messages
                ctrl.toast.message = 'Ups, ha ocurrido un error!';
                ctrl.toast.warning = true;
            });
    }

    function saveActivity (activity, dificulty) {
        console.log('saveActivity: ',activity, dificulty);
        // Mixed parameter solution (from inside(dificulty)/outside(activity) of the directive) solution
        /*activity.dificulty = dificulty;
        console.log('saveActivity 2: ',activity, dificulty);*/

        // $Timeout solution
       /* $timeout(function(){
                console.log('saveActivity 3: ',activity, dificulty);
        }, 0);*/

        // $Timeout solution
        $timeout(function(){
                ActivitiesService
                    .put(activity)
                    .catch(function(){
                        // Show messages
                        ctrl.toast.message = 'Ups, ha ocurrido un error!';
                        ctrl.toast.warning = true;
                    });
        }, 0);
        
    }

    // Push a new schedule to the schedule's array
    function addSchedule (schedules) {
        schedules.push({});
    }

    // Delete an schedule from the schedule's array
    function deleteSchedule (index,collection) {
        collection.splice(index,1);
    }

}
