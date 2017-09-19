angular
    .module('myApp')
    .service('AuthService',AuthService);

AuthService.$inject = [];

// Service
function AuthService () {

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
            // TODO: return a resolved promise with the user data
        } else {
            console.log('AuthService > Login Fail');
            // TODO: return a rejected promise with the error message "Login failed"
        }        
    }

    function logOut () {
         self.user = "";
         // TODO: redirect the user to the login page
    }

    function getAuth (param) {
        // Get auth 
        if (self.user || param) {
            console.log('AuthService > getAuth > user: ', self.user);
            // TODO: return a resolved promise with the user data
        } else {
            console.log('AuthService > getAuth > User is not logged');
            // TODO: return a rejected promise with the error message "User is not Logged"
        }
    }
}