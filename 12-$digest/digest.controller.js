angular
    .module('myApp')
    .controller('DigestController', DigestController);

DigestController.$inject = ['$scope'];
	
function DigestController ($scope) {
    var ctrl = this;

    this.name = 'Aleix';

    $scope.$watch(function () {
        return ctrl.name;
    }, function (newValue, oldValue) {
        console.log("DigestController: ", newValue, oldValue);
    });
}