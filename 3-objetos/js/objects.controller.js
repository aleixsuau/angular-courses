angular.module('myApp').controller('ObjectsController',ObjectsController);
	
function ObjectsController () {

    this.cars = {
        luxe:{
            jaguar: {
                company: 'Jaguar',
                model: 'yeah',
                rate: 9,
                price: 15000
            },
            audi: {
                company: 'Audi',
                model: 'S3',
                rate: 8,
                price: 15000
            }
        },
        regular:{
            renault: {
                company: 'Renault',
                model: 'R5',
                rate: 7,
                price: 6000
            },
            seat: {
                company: 'Seat',
                model: 'Ibiza',
                rate: 8,
                price: 9000
            }
        } 
    }

    angular.forEach(this.cars, function(){
        
    });  

};
