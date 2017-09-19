angular
    .module('myApp')
    .controller('AddSubstractController',AddSubstractController);

AddSubstractController.$inject = ['ActivitiesService'];

function AddSubstractController (ActivitiesService) {
    this.save = function (activity) {
        console.log('save!', activity);
        ActivitiesService.put(activity);
    }
}