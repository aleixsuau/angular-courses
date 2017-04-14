angular
    .module('myApp')
    .controller('Feature2Controller',Feature2Controller);
	
function Feature2Controller ($scope) {    
    $scope.names = ["Aleix","Elena","Bernat","Joana"];
    $scope.titulo = "Gran party";
    /*
    this.name = "Aleix2";
    this.names = ["Aleix","Elena","Bernat","Joana"];
    this.titulo = "Gran party";

    this.printUser = printUser;

    function printUser (){
        console.log(this.user);
    }*/
};
