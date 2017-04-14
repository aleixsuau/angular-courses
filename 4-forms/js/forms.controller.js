angular.module('myApp').controller('FormsController',FormsController);
	
function FormsController () {

    this.reset = function () {
        this.user.name = "";
        this.userForm.$setUntouched();
        this.userForm.$setPristine();
        console.log("userForm: ",this.userForm);
    }

      

};
