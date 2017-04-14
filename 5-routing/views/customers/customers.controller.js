angular
    .module('myApp')
    .controller('CustomersController',CustomersController);
	
function CustomersController ($filter,$state) {
    // Interface (Bindable Members)
    //Data
    this.logged = true;
    // Model to show messages
    this.toast = {};
    this.activities = [
        {
            title: 'Body Combat',
            coach: 'Rebeca Chan',
            dificulty: 9,
            type: 'hard',
            schedule: {
                sun: null,
                mon: [11.30,17],
                tue: null,
                wed: null,
                thu: [11.30,17],
                fri: [17],
                sat: null
            },
            scores:[4,4,8,8],
            users: 15
        },
        {
            title: 'Body Pump',
            coach: 'Kike 5',
            dificulty: 5,
            type: 'soft',
            schedule: {
                sun: [18],
                mon: [11.30,17],
                tue: null,
                wed: null,
                thu: [11.30,17],
                fri: [17],
                sat: null
            },
            scores:[4,2],
            users: 35
        },
        {
            title: 'Pilates',
            coach: 'Caty Mas',
            dificulty: 8,
            type: 'hard',
            schedule: {
                sun: [10],
                mon: [11.30,17],
                tue: null,
                wed: null,
                thu: [11.30,17],
                fri: [17],
                sat: null
            },
            scores:[7,8],
            users: 22
        }
    ]  
    this.customers = [
        {
        name: 'Aleix',
        surname: 'Martínez',
        email: 'amartinezsuau@hotelbeds.com',
        activity: this.activities[0]
        },
        {
        name: 'Jack',
        surname: 'Daniels',
        email: 'jackdaniels@hotelbeds.com',
        activity: this.activities[1]
        }
    ]
    this.newCustomer = {
        activity: this.activities[0]
    }

    // Public Methods
    this.addCustomer = addCustomer;
    this.matchPattern = matchPattern;
    this.emailTaken = emailTaken;
    this.go = go;

    // Controller initialization
    init();

    function init () {
        /*getActivityTypes();*/
    }

    function addCustomer (newCustomer,customers,form) {
        // Push the new customer
        customers.push(angular.copy(newCustomer));

        // Show messages
        this.toast.message = 'Genial, has añadido un nuevo customer!'
        this.toast.success = true;
        
        // Clear form & model        
        newCustomer.name = "";
        newCustomer.surname = "";
        newCustomer.email = "";
        newCustomer.activity = this.activities[0];
        form.$setPristine();
        form.$setUntouched();        
    }

    function matchPattern (model, form) {    
        var pattern = new RegExp(".*@hotelbeds.com$");
        if (pattern.test(model)) {
            console.log('matchPattern: pass ',model);
            form.email.$setValidity("domain", true);
        } else {
           console.log('matchPattern: NO pass ',model);
           form.email.$setValidity("domain", false);
        }
    }

    function emailTaken (email, customers, form) {
        var taken = false;
        angular.forEach(customers, function(customer){
             if (email === customer.email) {
                console.log('taken',email, customer.email);
                taken = true;
             }
        });

        // OPCIONES DE FILTRADO
        // With .filter
        /* var taken = customers.filter(function(customer){
            return newCustomer.email === customer.email;
        })[0]; */

        // With $filter STRING (NO funcionaría puesto que considera match cualquier string
        // que CONTENGA el criterio de búsqueda, no que coincida estrictamente. Por eso filtramos por Object(Abajo))
        // var taken = $filter('filter')(customers,newCustomer.email)[0];

        // With $filter OBJECT (SI funcionaría puesto que busca la propiedad
        // que CONTENGA el criterio de búsqueda exacto. (===)
        // var taken = $filter('filter')(customers,{email:newCustomer.email})[0];  

        if (taken) {
            console.log("Email Taken");
            form.email.$setValidity("taken", false);
        } else {
            console.log("Email NOT Taken");
            form.email.$setValidity("taken", true);
        }
    }
};
