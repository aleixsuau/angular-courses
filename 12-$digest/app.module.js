angular
    .module('myApp', [])
    .run(function ($rootScope) {
        var count = 0;
        // Console every $rootScope digest
        $rootScope.$watch(function () {
            console.log('$rootScope $digest count: ', count++);
        });
    });
    