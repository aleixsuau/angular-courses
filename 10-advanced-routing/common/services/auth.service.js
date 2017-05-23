angular
    .module('myApp')
    .service('AuthService',AuthService);

AuthService.$inject = ['$q','$state', '$rootScope'];

// Service
function AuthService ($q, $state, $rootScope) {

    var self = this;
    // Bindable members
    self.user = "";
    
    // Public Methods
    self.login = login;
    self.logOut = logOut;
    self.getAuth = getAuth;

    function login (userName, password) {
        if (userName && password) {
            self.user = { name: userName };
            console.log('AuthService > Login Ok > user: ', self.user);            
            return $q.resolve(self.user);
        } else {
            console.log('AuthService > Login Fail');
            return $q.reject('Login Failed');
        }        
    }

    function logOut () {
         self.user = "";
         $state.go('login');
    }

    function getAuth (param) {
        // Get auth 
        if (self.user || param) {
            console.log('AuthService > getAuth > user: ', self.user);
            return $q.resolve(self.user || param);
        } else {
            console.log('AuthService > getAuth > User is not logged');
            return $q.reject('User is not Logged');
        }
    }
}