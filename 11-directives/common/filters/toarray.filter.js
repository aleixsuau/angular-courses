angular
    .module('myApp')
    .filter('toArray',toArray);
    
// Service
function toArray () {
    // ANGULAR WAY    
    return function (object) {
        // Avoid execution if it's not an object
        if (!angular.isObject(object)) return object;
        var activitiesArray = [];
        angular.forEach(object,function(value,key){
            // Firebase is an Array-Ish ddbb; when we delete an element, it sets its value to null but doesn't 
            // delete the index property... so we need to check that the key contains a value
            if (object[key]) {
                var activity = object[key];
                activity.id = key;
                activitiesArray.push(activity);
            }            
        });
        return activitiesArray;
    }
    
    // NEW WAY
    /*return function (object) {
        // Avoid execution if it's not an object
        if (!angular.isObject(object)) return object;
        var keys = Object.keys(object);
        var array = keys.map(function(key){
            object[key].id = key;
            return object[key];
        });
        return array;
    };*/

    // OLD WAY
    /*
    return function (object) {
        // Avoid execution if it's not an object
        if (!angular.isObject(object)) return object;
        var activitiesArray = [];
        for (key in object) {
            var activity = object[key];
            activity.id = key;
            activitiesArray.push(activity);
        }
        return activitiesArray;
    }
    */
}