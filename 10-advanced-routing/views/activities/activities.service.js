angular
    .module('myApp')
    .service('ActivitiesService',ActivitiesService);

ActivitiesService.$inject = ['$http', '$filter', '$q', '$rootScope'];

// Service
function ActivitiesService ($http, $filter, $q, $rootScope) {
    // Events sample
   /* $rootScope.$on('eventone', function(event, data){
        console.log('ActivitiesService eventone: ', event, data);
    });*/

    var self = this;
    // Bindable members
    self.activities;
    self.activitiesCodes;
    // Public Methods
    self.getAll = getAll;
    self.getActivityByName = getActivityByName;
    self.post = post;
    self.put = put;
    self.remove = remove;
    self.getCodes = getCodes;   
    self.getActivityCode = getActivityCode;
    self.getActivityById = getActivityById;

    // Get all activities
    function getAll () {
        return $http
                .get('https://angularbeds.firebaseio.com/aleix/activities.json')
                .then(function (response) {                  
                    // Update model
                    self.activities = response.data;
                    return self.activities;
                });
    };

    // Get the activity object from its title
    function getActivityByName (activityTitle) {
        var toArrayActivities = $filter('toArray')(self.activities);
        var result = $filter('filter')(toArrayActivities,{ title: activityTitle })[0];       
        return result;
    }

    // Get the activity object from its title
    function getActivityById (id) {
        if (!id) return;
        var toArrayActivities = $filter('toArray')(self.activities);
        var result = $filter('filter')(toArrayActivities,{ id: id })[0];
        return result;
    }    

    // Save an activity
    function post (newActivity) {
        // Build new activity's model
        var newActivityModel = buildNewActivityModel(newActivity);
        return $http
                .post('https://angularbeds.firebaseio.com/aleix/activities.json', newActivityModel)
                .then(function(response){
                    // Update Model adding the new activity with the id generated by the server
                    self.activities[response.data.name] = newActivityModel;
                    return self.activities;
                });
    };

    // Save an activity
    function put (activity) {
        // Build new activity's model
        var activityModel = buildNewActivityModel(activity);
        var activityId = activity.id;
        return $http
                .put('https://angularbeds.firebaseio.com/aleix/activities/' + activityId + '.json' , activityModel)
                .then(function(response){
                    // Update Model adding the new activity with the id returned by the server
                    self.activities[response.data.id] = activityModel;
                    return self.activities;
                });
    };

    // Remove an activity
    function remove (id) {
        return $http
                .delete('https://angularbeds.firebaseio.com/aleix/activities/'+ id + '.json')
                .then(function(response){
                    // Update model
                    delete self.activities[id];
                    return self.activities;
                });
    };

    // Get actitivities codes
    function getCodes () {
        return $http
                .get('https://angularbeds.firebaseio.com/aleix/activitiesCodes.json')
                .then(function (response) {
                    // Update model
                    self.activitiesCodes = response.data;
                    return self.activitiesCodes;
                });
    };    

    function getActivityCode (title,coach,activitiesCodes,coachesCodes) {
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

    // Build new activity's model
    /*function buildNewActivityModel (newActivity) {        
        newActivity.schedule = {};
        angular.forEach(newActivity.schedules, function(schedule){
            // Build activity's schedule
            var scheduleDay = schedule.day.toLowerCase();
            var scheduleHour = schedule.time.getHours();
            var scheduleMinute = schedule.time.getMinutes();
            var scheduleTime = Number(scheduleHour + '.' + scheduleMinute);

            newActivity.schedule[scheduleDay] = newActivity.schedule[scheduleDay] || [];
            newActivity.schedule[scheduleDay].push(scheduleTime);
        });
        // Init the scores and users props
        newActivity.scores = newActivity.scores || [];
        newActivity.users = newActivity.users || 0;
        // Delete schedules Array (is not in the original model)
        delete newActivity.schedules;
        // Copy the newActivity to avoid unintended edition (by reference)
        var newActivityCopy = angular.copy(newActivity);
        return newActivityCopy;
    }*/
    // SOLVING EDITING BY REFERENCE PROBLEM (ACTIVITY DETAIL PAGE)
    // Build new activity's model
    function buildNewActivityModel (newActivity) {
        // Copy the newActivity to avoid unintended edition (by reference)
        var newActivityCopy = angular.copy(newActivity);

        newActivityCopy.schedule = {};
        angular.forEach(newActivityCopy.schedules, function(schedule){
            // Build activity's schedule
            var scheduleDay = schedule.day.toLowerCase();
            var scheduleHour = schedule.time.getHours();
            var scheduleMinute = schedule.time.getMinutes();
            var scheduleTime = Number(scheduleHour + '.' + scheduleMinute);

            newActivityCopy.schedule[scheduleDay] = newActivityCopy.schedule[scheduleDay] || [];
            newActivityCopy.schedule[scheduleDay].push(scheduleTime);
        });
        // Init the scores and users props
        newActivityCopy.scores = newActivityCopy.scores || [];
        newActivityCopy.users = newActivityCopy.users || 0;
        // Delete schedules Array (is not in the original model)
        delete newActivityCopy.schedules;        
        return newActivityCopy;
    }
    
}