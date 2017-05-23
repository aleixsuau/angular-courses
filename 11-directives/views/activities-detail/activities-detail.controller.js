angular
    .module('myApp')
    .controller('ActivitiesDetailController',ActivitiesDetailController);

ActivitiesDetailController.$inject = ['activity', 'ActivitiesService', '$state'];

function ActivitiesDetailController (activity, ActivitiesService, $state) {
    // Freeze the 'this'
    var ctrl = this;
    // Interface (Bindable Members)
    // BINDING TO RESOLVED DEPENDECY (ROUTER)
    ctrl.activity = activity;

    // Public Methods
    ctrl.modifyActivity = modifyActivity;
    ctrl.addSchedule = addSchedule;
    ctrl.deleteSchedule = deleteSchedule;
    ctrl.removeActivity = removeActivity;
    ctrl.activity.schedules = createSchedulesArray(activity);

    function modifyActivity (activity) {        
        // Send to the server
        ActivitiesService
            .put(activity)
            .then(function(response){
                $state.go('app.activities');
            })
            .catch(function(){
                console.log('Ups, ha ocurrido un error!');
            });
    }

    function removeActivity (id) {
        ActivitiesService
            .remove(id)
            .then(function(response){
                $state.go('app.activities');
            })
            .catch(function(){
                console.log('Ups, ha ocurrido un error!');
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

    // Process the schedules for the view (convert them to an array)
    function createSchedulesArray (activity) {
        var schedulesArray = activity.schedules || [];
        angular.forEach(activity.schedule, function (schedules, day) {
            angular.forEach(schedules, function (schedule) {                 
                 var splitedSchedule = schedule.toString().split('.');
                 var hour = Number(splitedSchedule[0]);
                 var minute = Number(splitedSchedule[1]);
                 var roundedMinute = minute && minute < 10 ? minute * 10 : minute;
                 var newSchedule = {
                     day: day,
                     time: new Date(1970, 0, 1, hour, roundedMinute || 00, 0)
                 };
                 schedulesArray.push(newSchedule);
            });
        });
        return schedulesArray;
    }

}
