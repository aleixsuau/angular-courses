angular.module('myApp').controller('Feature2Controller',Feature2Controller);
	
function Feature2Controller () {
    this.name = "Aleix2";

    this.printUser = function (){
        console.log(this.user);
    }
};
