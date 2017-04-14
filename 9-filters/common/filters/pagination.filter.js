angular
    .module('myApp')
    .filter('pagination',pagination);

pagination.$inject = [];

// Service
function pagination () {
    // NEW WAY
    return function (collection, fromItem, step) {
        if (!angular.isObject(collection)) return collection;
        return collection.slice(fromItem, fromItem + step);
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