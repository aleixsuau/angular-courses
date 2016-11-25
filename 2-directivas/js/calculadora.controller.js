angular.module('myApp').controller('CalculadoraController',CalculadoraController);
	
function CalculadoraController () {
    this.result= 0;
    
    this.consoleUser = function () {
        console.log('user', $scope.user);
    }
};
