angular
    .module('myApp')
    .run(run)
    .constant('user','Aleix');

run.$inject = ['$rootScope', '$state', 'AuthService'];

function run ($rootScope, $state, AuthService) {
    // TODO: Delete this skip
    // Skip login page (development)
    AuthService.login('Aleix', 123);
    $rootScope
        .$on('$stateChangeStart', function(event, toState, toStateParams){
            if (toState.name === 'login' && AuthService.user) {
                event.preventDefault();
                $state.go('app.activities');
            }
            if (toState.data && toState.data.auth) {
                AuthService
                    .getAuth()
                    .catch(function () {
                        event.preventDefault();
                        $state.go('login');
                    });
            }
        });
}