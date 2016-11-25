angular.module('myApp').controller('CalculadoraController',CalculadoraController);
	
function CalculadoraController () {
    this.result= 0;
    
    this.comeon = function () {
        console.log('comeon');
    }
};
