angular
    .module('myApp')
    .service('CoachesService',CoachesService);

CoachesService.$inject = ["$http"];

// Service
function CoachesService ($http) {

    var self = this;
    // Bindable members
    self.coachesCodes;
    // Public Methods
    self.getCodes = getCodes;

    function getCodes () {
        return $http
                .get('https://angularbeds.firebaseio.com/aleix/coachesCodes.json')
                .then(function (response) {
                    // Update model
                    self.coachesCodes = response.data;
                    return self.coachesCodes;
                });
    };

}