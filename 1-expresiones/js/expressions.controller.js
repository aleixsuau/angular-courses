angular.module('myApp').controller('ExpressionsController',ExpressionsController);
	
function ExpressionsController () {

    this.productList = [
        {
            name: 'Manzana',
            type: 'Golden',
            price: 1.20,
            stock: 20
        },
        {
            name: 'Pera',
            type: 'Agua',
            price: 1.80,
            stock: 30
        },
        {
            name: 'Plátano',
            type: 'Canarias',
            price: 2.20,
            stock: 15
        }
    ];

    this.result = 0;
    this.input = 0;
    this.consoleUser = function () {
        console.log($scope.user);
    }
};
