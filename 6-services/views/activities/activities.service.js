angular
    .module('myApp')
    .service('ActivitiesService',ActivitiesService);

ActivitiesService.$inject = ["$http", "$filter"];

// Service
function ActivitiesService ($http, $filter) {
    
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
    ];
    this.getAll = getAll;
    this.getActivityByName = getActivityByName;

   /* var self = this;
    self.activities;
    self.getAll = getAll;
    self.put = put;
    self.remove = remove;
    self.getActivityByName = getActivityByName;*/

    function getAll () {
        // return this.activities;
        // return $http.get('https://angularbeds.firebaseio.com/rifel/activities.json');
        return $http.get('https://angularbeds.firebaseio.com/rifel/activities.json')
                    .then(function (response) {
                        // Update model
                        self.activities = response.data;
                        return self.activities;
                    }, function(error){
                        console.log("Error: ", error);
                    })
                    /*.then(function(response){
                        console.log("Custom Response from then:", response)
                    })*/
    };

    function getActivityByName (activityName) {
        // return $filter('filter')(this.activities,{title:activityName})[0];
        return $filter('filter')(self.activities,{title:activityName})[0];
    }

    function put (data) {
        return $http.put('https://angularbeds.firebaseio.com/rifel/activities.json', data)
                    .then(function(response){
                        // Update model
                        self.activities = response.data;
                        return self.activities;
                    });
    };

    function remove (index) {
        return $http
                .delete('https://angularbeds.firebaseio.com/rifel/activities/'+ index + '.json')
                .then(function(response){
                    // Update model
                    self.activities.splice(index,1);
                    return self.activities;
                });
    };

    /*self.post = function (data) {
        return $http.post('https://angularbeds.firebaseio.com/rifel/activities.json', data);
    };*/    
}

// Factory
/*function ActivitiesService ($http) {

    function post (data) {
        return $http.get('https://angularbeds.firebaseio.com/rifel/activities.json', data);
    }

    function getAll () {
        return $http.get('https://angularbeds.firebaseio.com/rifel/activities.json');
    }

    return {
        post: post,
        getAll: getAll,
    };
}  */