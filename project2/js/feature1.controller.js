angular.module('myApp').controller('Feature1Controller',Feature1Controller);
	
function Feature1Controller () {
    this.name = "Aleix";

    this.print = function () {
        console.log('asdasd',this.user);
    }

   
};
