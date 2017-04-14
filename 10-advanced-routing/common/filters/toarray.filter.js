angular
    .module('myApp')
    .filter('toArray',toArray);
    
// Service
function toArray () {
    // NEW WAY
    return function (object) {
        // Avoid execution if it's not an object
        if (!angular.isObject(object)) return object;
        var keys = Object.keys(object);
        var array = keys.map(function(key){
            object[key].id = key;
            return object[key];
        });
        return array;
    };

    // ANGULAR WAY
    /*
    return function (object) {
        // Avoid execution if it's not an object
        if (!angular.isObject(object)) return object;
        var activitiesArray = [];
        angular.forEach(object,function(value,key){
            var activity = object[key];
            activity.id = key;
            activitiesArray.push(activity);
        });
        return activitiesArray;
    }
    */

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