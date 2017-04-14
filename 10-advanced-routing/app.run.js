angular
    .module('myApp')
    .run(run)
    .constant('user','Aleix');

run.$inject = ['$rootScope', '$state', 'AuthService'];

function run ($rootScope, $state, AuthService) {
    $rootScope
        .$on('$stateChangeStart', function(event, toState, toStateParams){
            console.log('RUN $stateChangeStart: ', toState, toStateParams);
            if (toState.data && toState.data.auth) {
                console.log('RUN Auth route: ');
                AuthService
                    .getAuth()
                    .catch(function () {
                        console.log('Login Failed');
                        $state.go('login');
                    });
            }
        });
}