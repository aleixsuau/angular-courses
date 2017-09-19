angular
    .module('myApp')
    .service('ToastService', ToastService);

ToastService.$inject = ['$timeout'];

// Service
function ToastService ($timeout) {

    var ctrl = this;

    ctrl.toast = {
        message: null,
        success: null,
        warning: null
    }

    ctrl.showToast = showToast;

    function showToast (type, message) {
        ctrl.toast[type] = true;
        ctrl.toast.message = message;
        // Clear Toast after 10 secs
        $timeout(function(){
            ctrl.toast[type] = null;
            ctrl.toast.message = null;
        }, 10000);
    }
    
}