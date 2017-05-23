angular
    .module('myApp')
    .run(run)
    .constant('user','Aleix');

run.$inject = ['$rootScope', '$state', 'AuthService'];

function run ($rootScope, $state, AuthService) {
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