angular
    .module('myApp')
    .controller('ActivitiesController',ActivitiesController);

ActivitiesController.$inject = ["ActivitiesService", "CoachesService", "$q"];

function ActivitiesController (ActivitiesService, CoachesService, $q) {
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

    // Controller initialization
    init();

    function init () {
        /*ActivitiesService
            .getCodes()
            .then(function(){
                ctrl.activitiesCodes = ActivitiesService.activitiesCodes;
            });
        CoachesService
            .getCodes()
            .then(function(){
                ctrl.coachesCodes = CoachesService.coachesCodes;
            });
        ActivitiesService
            .getAll()
            .then(function(){
                ctrl.activities = ActivitiesService.activities;
            });*/
        var ActivitiesCodesPromise = ActivitiesService.getCodes();
        var ActivitiesPromise = ActivitiesService.getAll();
        var CoachesPromise = CoachesService.getCodes();
        
        $q.all([ActivitiesCodesPromise, ActivitiesPromise, CoachesPromise])
            .then(function(){
                ctrl.activitiesCodes = ActivitiesService.activitiesCodes;
                ctrl.coachesCodes = CoachesService.coachesCodes;
                ctrl.activities = ActivitiesService.activities;
            })
            .catch(function(){
                // Show messages
                ctrl.toast.message = 'Ups, ha ocurrido un error!'
                ctrl.toast.warning = true;
            });
    }
    
    function getActivityCode (title,coach,activitiesCodes,coachesCodes) {
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
            .then(function(){
                // Show messages
                ctrl.toast.message = 'Hecho, has eliminado una actividad!';
                ctrl.toast.success = true;
            })
            .catch(function(){
                // Show messages
                ctrl.toast.message = 'Ups, ha ocurrido un error!';
                ctrl.toast.warning = true;
            });
    }

    // Push a new schedule to the schedule's array
    function addSchedule (schedules) {
        schedules.push({});
    }

    // Delete an schedule from the schedule's array
    function deleteSchedule (index,collection) {
        collection.splice(index,1);
    }

    // EXAMPLE: Use case of $q.deferred
    ctrl.playAudio = function playAudio () {
        ActivitiesService
            .playAudio()
            .then(function (audio) {
                console.log("playAudio: ", audio);
                ctrl.showPlayerMessage = true;
                ctrl.audio = audio;
            });
    }

    ctrl.pause = function () {
        ctrl.audio.pause();
    }

}
