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
    self.getAuth = getAuth;

    function login (userName, password) {
        if (userName && password) {
            self.user = { name: userName };
            return $q.resolve(self.user);
        } else {
            return $q.reject('Login Failed');
        }        
    }

    function getAuth (param) {
        // Get auth 
        if (self.user || param) {
            console.log('self.user: ', self.user);
            return $q.resolve(self.user || param);
        } else {
            return $q.reject('User is not Logged');
        }
    }
}