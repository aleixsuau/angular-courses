angular
    .module('myApp')
    .run(run)

run.$inject = ['$rootScope', '$state', 'AuthService'];

function run ($rootScope, $state, AuthService) {
    // TODO: Delete this skip
    // Skip login page (development)
    // AuthService.login('Aleix', 123);

    $rootScope
        .$on('$stateChangeStart', function(event, toState, toStateParams){
            console.log('$stateChangeStart: ', event, toState, toStateParams);
            if (toState.name === 'login' && AuthService.user) {
                console.log('$stateChangeStart > Login ');
                event.preventDefault();
                $state.go('app.activities');
            }
            if (toState.data && toState.data.auth) {
                console.log('$stateChangeStart > Auth route: ', toState.name);
                AuthService
                    .getAuth()
                    .catch(function () {
                        console.log('Login Failed');
                        event.preventDefault();
                        $state.go('login');
                    });
            }
        });
}