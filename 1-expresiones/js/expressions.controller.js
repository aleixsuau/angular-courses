angular.module('myApp').controller('ExpressionsController',ExpressionsController);
	
function ExpressionsController () {

    this.logged = true;
    
    this.stock = [
        {
        product: 'milk',
        price: 1.20,
        tax: 0.08,
        units: 15
        },
        {
        product: 'ron',
        price: 12,
        tax: 0.21,
        units: 12
        },
        {
        product: 'butter',
        price: 1.8,
        tax: 0.08,
        units: 6
        }
    ]

    this.result = 0;
    this.input = 0;
    this.consoleUser = function () {
        console.log($scope.user);
    };
}

