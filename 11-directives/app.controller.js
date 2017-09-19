angular
    .module('myApp')
    .controller('AppController',AppController);

AppController.$inject = ['user', 'AuthService', 'ToastService'];

function AppController (user, AuthService, ToastService) {
    this.user = user;
    this.logOut = AuthService.logOut;
    this.toast = ToastService.toast;
}