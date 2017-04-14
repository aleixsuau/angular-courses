angular
    .module('myApp', ['ui.router'])
    .config(function($stateProvider,$urlRouterProvider){

        $stateProvider
            .state('activities', {
                url:'/activities',
                templateUrl: 'views/activities/activities.html',
                controller: 'ActivitiesController as ctrl'
            })
            .state('customers', {
                url:'/customers',
                templateUrl: 'views/customers/customers.html',
                controller: 'CustomersController as ctrl'
            });

        $urlRouterProvider.otherwise("/activities");
    });