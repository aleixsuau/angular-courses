angular
    .module('myApp')
    .service('AuthService',AuthService);

AuthService.$inject = ['$q','$state'];

// Service
function AuthService ($q, $state) {

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
            return $q.resolve(self.user);
        } else {
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
            return $q.resolve(self.user || param);
        } else {
            return $q.reject('User is not Logged');
        }
    }
}