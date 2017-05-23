angular
    .module('myApp')
    .directive('myButton',myButton);

function myButton () {
    // console.log('myButton directive');
    return {
        restrict: 'E',
        scope: {
            link: '@'
        },               
        transclude: true,
        template: '<a ng-href="{{ link }}" class="btn btn-xs btn-default" role="button">' +
                    '<span class="glyphicon glyphicon-link" aria-hidden="true"></span> ' +
                    '<ng-transclude></ng-transclude>' +
                  '</a>'
    }
}

// TAKING ACTIVITIES IDS 
/*function myButton () {
    // console.log('myButton directive');
    return {
        restrict: 'E',
        scope: {
            link: '@'
        },               
        transclude: true,
        template: '<a ng-href="#" class="btn btn-xs btn-default" role="button">' +
                    '<span class="glyphicon glyphicon-link" aria-hidden="true"></span>' +
                    '<ng-transclude></ng-transclude>' +
                  '</a>'
    }
}*/