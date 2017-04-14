angular.module('myApp').controller('CalculadoraController',CalculadoraController);
	
function CalculadoraController () {
    this.result= 0;

    this.operate = operate;
    
    function operate (operator) {        
        switch (operator) {
            case "+":
                this.result = this.result + 2;
                break;
            case "-":
                this.result = this.result - 2;
                break;
            case "*":
                this.result = this.result * 2;
                break;
            case "/":
                this.result = this.result / 2;
                break;
        }

        // this.result = eval(this.result = this.result + operator + 2);
    }
    
    
    /*this.comeon = function () {
        console.log('comeon');
    }*/
}

