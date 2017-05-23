angular
    .module('myApp')
    .directive('myAddSubstract',myAddSubstract);

// WITHOUT ISOLATED SCOPE
/*function myAddSubstract () {
    // console.log('myAddSubstract >>>');
    return {
        restrict: 'E',
        templateUrl: '/common/directives/add-substract/add-substract.html',
        controller: 'AddSubstractController as ctrl'
    }
}*/

// WITH ISOLATED SCOPE
function myAddSubstract () {
    // console.log('myAddSubstract >>>');
    return {
        scope: {
            model:"=",
            onSave:"&"
        },
        bindToController: true,
        restrict: 'E',
        templateUrl: '/common/directives/add-substract/add-substract.html',
        controller: 'AddSubstractController as ctrl'
    }
}