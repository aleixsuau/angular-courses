angular
    .module('myApp')
    .service('CustomersService',CustomersService);

CustomersService.$inject = ["$http"];

// Service
function CustomersService ($http) {
    
    /*this.customers = [
        {
        name: 'Aleix',
        surname: 'Martínez',
        email: 'amartinezsuau@hotelbeds.com',
        //activity: this.activities[0]
        },
        {
        name: 'Jack',
        surname: 'Daniels',
        email: 'jackdaniels@hotelbeds.com',
        //activity: this.activities[1]
        }
    ];*/

    this.getAll = function () {
        /*console.log('this.customers: ',this.customers);
        return this.customers;*/
        return $http.get('https://angularbeds.firebaseio.com/rifel/customers.json');
             /*.then(function (response) {                
                console.log("response.data: ",response.data);
                return response.data;
             });*/
    };

    this.post = function (data) {
        return $http.post('https://angularbeds.firebaseio.com/rifel/customers.json', data);
    };

    this.put = function (data) {
        return $http.put('https://angularbeds.firebaseio.com/rifel/customers.json', data);
    };

    this.delete = function (index) {
        return $http.delete('https://angularbeds.firebaseio.com/rifel/customers/'+ index + '.json');
    };
    
}

// Factory
/*function CustomersService ($http) {

    function post (data) {
        return $http.get('https://angularbeds.firebaseio.com/rifel/customers.json', data);
    }

    function getAll () {
        return $http.get('https://angularbeds.firebaseio.com/rifel/customers.json');
    }

    return {
        post: post,
        getAll: getAll,
    };
}  */