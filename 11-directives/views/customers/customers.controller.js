angular
    .module('myApp')
    .controller('CustomersController',CustomersController);

CustomersController.$inject = ['ActivitiesService', 'CustomersService', 'activities', 'customers'];
	
function CustomersController (ActivitiesService, CustomersService, activities, customers) {
    var ctrl = this;
    // Interface (Bindable Members)
    // Model to show messages
    ctrl.toast = {};
    // Public Methods
    ctrl.addCustomer = addCustomer;
    ctrl.removeCustomer = removeCustomer;
    ctrl.checkDomain = checkDomain;
    ctrl.getActivityByName = getActivityByName;
    ctrl.checkEmailAvailability = checkEmailAvailability;

    // My-Send-Email Directive
    ctrl.emailsCollection = [];
    ctrl.sendEmails = sendEmails;

    function sendEmails(collection) {
        var emailsCollectionString = '';
        collection.forEach(function(item){
            emailsCollectionString += item + ','
        });        
        var link = 'mailto:' + emailsCollectionString;
        collection.length = 0;
        window.location.href = link;
    }

    /*// Controller initialization
    init();

    function init () {
        // Get Data from Service Model ($http)
        ActivitiesService
            .getAll()
            .then(function(response){
                ctrl.activities = ActivitiesService.activities;
            });
        CustomersService
            .getAll()
            .then(function(response){
                ctrl.customers = CustomersService.customers;
            });
    }*/

    // BINDING TO RESOLVED DEPENDENCIES (ROUTER)
    ctrl.activities = activities;
    ctrl.customers = customers;    

    function addCustomer (newCustomer,customers,form) {
        // Copy the newCustomer to avoid unintended edition (by reference)
        var newCustomerCopy = angular.copy(newCustomer);
        CustomersService
            .post(newCustomerCopy)
            .then(function(response){
                // Show messages
                ctrl.toast.message = 'Genial, has añadido un nuevo customer!'
                ctrl.toast.success = true;
                
                // Clear form & model        
                newCustomer.name = "";
                newCustomer.surname = "";
                newCustomer.email = "";
                newCustomer.activity = ctrl.activities[0];
                form.$setPristine();
                form.$setUntouched();
            });
    }

    function removeCustomer (id) {
        CustomersService
            .remove(id);
    }

    // Get the activity data from the name
    function getActivityByName (activityName) {
        return ActivitiesService.getActivityByName(activityName);
    }

    // Check if the email is from Hotelbeds
    function checkDomain (model, form) {    
        var pattern = new RegExp(".*@hotelbeds.com$");
        // Set form's validation
        if (pattern.test(model)) {
            form.email.$setValidity("domain", true);
        } else {
            form.email.$setValidity("domain", false);
        }
    }
    
    // Check if the email is already available
    function checkEmailAvailability (email, customers, form) {       
        var taken = CustomersService.checkEmailAvailability(email, customers);
        // Set the form's validation
        if (taken) {
            form.email.$setValidity("taken", false);
        } else {
            form.email.$setValidity("taken", true);
        }
    }

}