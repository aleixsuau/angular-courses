angular
    .module('myApp')
    .config(config);

function config ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('app', {
                url:'/app',
                abstract: true,
                templateUrl: 'app.html',
                resolve: {
                    activities: ['ActivitiesService', function (ActivitiesService) {
                         return ActivitiesService.getAll();
                    }],
                    activitiesCodes: ['ActivitiesService', function (ActivitiesService) {
                         return ActivitiesService.getCodes();
                    }],                   
                    coachesCodes: ['CoachesService', function (CoachesService) {
                         return CoachesService.getCodes();
                    }],
                    user: ['AuthService', function (AuthService) {
                        return AuthService
                                    .getAuth();
                    }]
                },
                controller: function (user, AuthService) {
                    this.user = user;
                    this.logOut = AuthService.logOut;
                },
                controllerAs: 'ctrl',
                data: {
                    auth: true
                }
            })
            .state('app.activities', {
                url:'/activities',
                templateUrl: 'views/activities/activities.html',
                controller: 'ActivitiesController as ctrl'
            })
            .state('app.activities-detail', {
                url:'/activities/:id',
                templateUrl: 'views/activities-detail/activities-detail.html',
                controller: 'ActivitiesDetailController as ctrl',
                resolve: {
                    activity: ['activities', 'ActivitiesService', '$stateParams', function (activities, ActivitiesService, $stateParams) {
                        console.log('Resolve $stateParams', $stateParams);
                        return ActivitiesService.getActivityById($stateParams.id);
                    }]
                }
            })
            .state('app.customers', {
                url:'/customers',
                templateUrl: 'views/customers/customers.html',
                controller: 'CustomersController as ctrl',
                resolve: {
                    customers: ['CustomersService', function (CustomersService) {
                         return CustomersService.getAll();
                    }]
                }
            })
            .state('login', {
                url:'/login',
                templateUrl: 'views/login/login.html',
                controller: 'LoginController as ctrl'
            });
            
        $urlRouterProvider.otherwise("/login");        
};