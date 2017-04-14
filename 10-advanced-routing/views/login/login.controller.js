angular
    .module('myApp')
    .controller('LoginController',LoginController);

LoginController.$inject = ['AuthService','$state'];
	
function LoginController (AuthService,$state) {
    var ctrl = this;
    // Interface (Bindable Members)
    
    // Public Methods
    ctrl.login = login;

    function login (userName, password) {
        AuthService
            .login(userName, password)
            .then(function(response){
                console.log('Go activities');
                $state.go('app.activities');
            });
    }
}