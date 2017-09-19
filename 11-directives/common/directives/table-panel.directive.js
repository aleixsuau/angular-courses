angular
    .module('myApp')
    .directive('myTablePanel',myTablePanel);

myTablePanel.$inject = ['$filter'];

function myTablePanel ($filter) {
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
                var alreadyTracked = $filter('filter')(this.changes, {id: change.id})[0];

                if (!alreadyTracked) {
                    this.changes.push(change);
                }           
            }
        },
        controllerAs: 'ctrl'
    }
}