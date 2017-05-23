angular
    .module('myApp')
    .directive('myTablePanel',myTablePanel);

function myTablePanel () {
    return {
        restrict: 'E',
        scope: {},
        transclude: true,
        template:
                '<div class="alert alert-info pull-right" role="alert" style="width:100px">Counter: {{ ctrl.changes.length }} </div><br>' +
                '<div ng-transclude></div>',
        controller:  function ($scope, $element, $attrs) {
            this.changes = [];
            this.addChange = function (change) {
                var alreadyTracked = this.changes.indexOf(change);
                if (alreadyTracked === -1) {                    
                    this.changes.push(change);
                    console.log('Change added: ', change, this.changes);
                }           
            }
        },
        controllerAs: 'ctrl'
    }
}