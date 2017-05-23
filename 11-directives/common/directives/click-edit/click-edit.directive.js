angular
    .module('myApp')
    .directive('myClickEdit',myClickEdit);

myClickEdit.$inject = ['$timeout'];

/*function myClickEdit ($timeout) {
    // console.log('myClickEdit: ');
    return {
        restrict: 'E',
        scope: {
            model: '='
        },
        templateUrl: '/common/directives/click-edit/click-edit.html',
        controller: function ($scope, $element, $attrs) {
            scope.focus = function () {
                console.log('focus', $element.find('input')[0]);
                // $element.find('input')[0].focus();
                $timeout(function(){$element.find('input')[0].focus()},0);
            }
        }
    }
}*/

// MODIFIED TO WORK WITH TABLE-COUNTER DIRECTIVE
function myClickEdit ($timeout) {
    return {
        restrict: 'E',
        scope: {
            rowModel: '=',
            value: '='
        },
        require: '?^myTablePanel',
        templateUrl: '/common/directives/click-edit/click-edit.html',
        link: function (scope, element, attrs, myTablePanelController) {
            scope.focus = function () {
                console.log('focus', element.find('input')[0]);
                // element.find('input')[0].focus();
                $timeout(function(){ element.find('input')[0].focus() }, 0);
            }

            // IF CLICK-EDIT IS INSIDE A TABLE-PANEL DIRECTIVE, track changes and send them to it
            scope.change = function (rowModel) {                
                console.log('Change!', myTablePanelController);
                if (myTablePanelController) {
                    myTablePanelController.addChange(rowModel);
                }
            }

            // RESET MODEL WITH 'ESC'
            /*var oldModel = angular.copy(scope.model);
            // If the user presses 'Esc'            
            element.on('keydown', function(event){
                console.log('keydown: ', event, scope, oldModel);
                if (event.keyCode === 27) {
                    // Reset model changes
                    scope.model = oldModel;
                    // Hide de edit input
                    scope.editing = false;
                    scope.$digest();
                    return;
                }
            });*/
        }
    }
}