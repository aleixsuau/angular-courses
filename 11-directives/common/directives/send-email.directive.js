angular
    .module('myApp')
    .directive('mySendEmail',mySendEmail);

myClickEdit.$inject = ['$timeout'];

function mySendEmail ($timeout) {
    return {
        restrict: 'E',
        scope: {
            email: '=',
            collection: '=',
            send: '&'
        },
        template: '<div ng-class="{toSend: ctrl.isInCollection(ctrl.email)}"> {{ctrl.email}} </div>' +
                  '<a ng-href="" ng-click="ctrl.addRemoveFromCollection(ctrl.email)" class="btn btn-xs btn-default" role="button">' +
                    '<div ng-if="ctrl.isInCollection(ctrl.email)"> - </div>' + 
                    '<div ng-if="!ctrl.isInCollection(ctrl.email)"> + </div>' + 
                  '</a> ' +
                  '<a ng-href="" ng-click="ctrl.send()" class="btn btn-xs btn-default" role="button">' +
                    '<span class="glyphicon glyphicon-envelope" aria-hidden="true"></span>' + 
                  '</a>',
                  
        controller: function ($scope, $element, $attrs) {
            var ctrl = this;
            ctrl.addRemoveFromCollection = addRemoveFromCollection;
            ctrl.isInCollection = isInCollection;

            function addRemoveFromCollection (email) {
                var index = ctrl.collection.indexOf(email);
                if ( index === -1) {
                    ctrl.collection.push(email);
                } else {
                    ctrl.collection.splice(index, 1);
                }            
            }

            function isInCollection(email) {
               return ctrl.collection.indexOf(email) === -1 ? false : true;
            }
        },
        bindToController: true,
        controllerAs: 'ctrl'
    }
}