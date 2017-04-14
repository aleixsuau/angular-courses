angular
    .module('myApp')
    .controller('Feature1Controller',Feature1Controller);

function Feature1Controller ($scope) {
    // Public vars    
    $scope.name = "Aleix";
    $scope.titulo = "Gran Party 2";

    /*this.name = "Aleix";
    this.titulo = "Gran Party 2";*/


    // Public methods
    $scope.print = print;
    
    function print () {
        externalLibrary.aplaudirComplex($scope.name);
    }

}

/*function Feature1Controller () {
    this.name = "Aleix";

    this.print = function () {
        console.log('asdasd',this.user);
    };

}*/

