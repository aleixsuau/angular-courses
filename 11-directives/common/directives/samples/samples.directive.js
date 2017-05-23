angular
    .module('myApp')
    // .directive('sample',behaviourDirective)
    // .directive('mySample',templateDirective);
    .directive('mySample',bindingsDirective)
    // PARENT-CHILD SAMPLE
    .directive('myParent',parentDirective)
    .directive('myChild',childDirective)
    .controller('parentController', parentController)
    // .directive('mySample',tableDirective);


// BEHAVIOUR DIRECTIVE 
function behaviourDirective () {
    console.log('behaviourDirective >>>>>>');
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
           /* console.log('scope, element, attrs: ', scope, element, attrs);
            
            var content = element.html();
                content += " yeah!";
                element.html(content);*/

            element.on('click', function(event){
                this.style.color = "red";
                this.style.width = "600px";
            });

            element.on('mouseenter', function(event){
                this.style.backgroundColor = "#dddbdb";
            });

            /*// Vanilla JS
            var element = element[0];
            var content = element.innerHTML;
            element.innerHTML = content + ' yeah!';

            element.addEventListener('click', function () {
                this.style.color = "red";
            });
            element.addEventListener('mouseenter', function () {
                this.style.backgroundColor = "#dddbdb";
            });*/
        }
    }
}

// templateDirective SIN SCOPE AISLADO
function templateDirective () {
    console.log('templateDirective >>>>>');
    return {
        scope: true,
        restrict: 'E',
        template: '<div style="width:400px; height:100px; margin: 100px; background-color: green;">' + 
                        'Hola soy una directiva template' +
                        '<h3>Count: {{ count || 0 }}</h3>' +
                        '<button type="button" class="btn btn-sm btn-default"' +
                                'ng-click="count = count + 1;">+</button>' +
                        '<button type="button" class="btn btn-sm btn-default"' +
                                'ng-click="count = count - 1;">-</button>' +
                  '</div>'
    }
}

// templateDirective CON SCOPE AISLADO
/*function templateDirective () {
    console.log('templateDirective (SCOPE Aislado) >>>>>');
    return {
        scope: {
            logIt:"&"
        },
        restrict: 'E',
        template: '<div style="width:400px; height:100px; margin: 100px; background-color: green;">' + 
                        'Hola soy una directiva template' +
                        '<h3>Count: {{ ctrl.count || 0 }}</h3>' +
                        '<button type="button" class="btn btn-sm btn-default"' +
                                'ng-click="ctrl.count = ctrl.count + 1;">+</button>' +
                        '<button type="button" class="btn btn-sm btn-default"' +
                                'ng-click="ctrl.count = ctrl.count - 1;">-</button>' +
                  '</div>',        
        controller: function ($scope, $element, $attrs) {
            this.count = 10;
            // add ctrl.printCount(ctrl.count) to the ng-click
            this.printCount = function (count) {
                console.log('The count is: ', count);
            }
        },
        controllerAs: 'ctrl'
    }
}*/

// BINDINGS TYPES
function bindingsDirective () {
    console.log('bindingsDirective >>>');
    return {
        scope: {
            money: "=",
            logIt: "&"
        },
        bindToController: true,
        restrict: 'E',
        template: '<div style="background-color:WhiteSmoke; margin: 10px;">' +
                    'DIRECTIVE TEMPLATE:<br>Money: {{ ctrl.money }}<br>' + 
                    '<button type="button" class="btn btn-sm btn-default" ng-click="showInput = !showInput">^</button> ' + 
                    '<input ng-model="ctrl.money" ng-if="showInput" ng-change="ctrl.logIt({data:ctrl.money})">' + 
                  '</div>',     
        controller: function ($scope, $element, $attrs) {            
            /* BINDINGS SAMPLES */
            // SIN bindToController
            // console.log("money: ", $scope.money, typeof $scope.money);
            // CON bindToController          
            /* Print the binding typeof */
            console.log("money: ", this.money, typeof this.money);
            /* Print coins property */
            // @ BINDING >> Undefined, como es un string no podemos acceder a su propiedad
            // = BINDING >> 100, now is an object
            // console.log("money.coins: ", this.money.coins);
        },
        controllerAs: 'ctrl'
    }
}

// COMUNICATION BETWEEN DIRECTIVES SAMPLE
function parentDirective () {
    return {
        scope: {},
        restrict: 'AE',
        controller: 'parentController as ctrl'
    }
}

function parentController () {
    var ctrl = this;
    ctrl.users = [];
    // Add a user to the array
    ctrl.addUser = function (user) {
        ctrl.users.push(user);
    }
    // Log Users
    ctrl.log = function () {
        console.log("Parent ctrl.users: ", ctrl.users);
    }
}

function childDirective () {
    return {
        scope: {},
        restrict: 'AE',
        template:
            '<input ng-model="user"><br>' +
            '<button ng-click="addUser(user)">Add User!</button><br>' +
            '<button ng-click="log()">Log Users</button><br>' +
            '{{ users }}',
        require: '^myParent', // require the myParent's controller
        link: function (scope, element, attrs, parentController) { // Injects myParent's controller as 4th argument
           console.log('childDirective: ', parentController);
           scope.addUser = function (user) {
                parentController.addUser(user);
                scope.user = "";
           };
           // scope.addUser = parentController.addUser;
           scope.log = parentController.log;
           scope.users = parentController.users;
        }
    }
}


// TABLE SAMPLE
function tableDirective () {
    return {
        restrict: 'A',
        controller: function () {},
        link: function (scope, element, attrs, controller) {
           /* console.log('scope, element, attrs: ', scope, element, attrs);

            var content = element.html();
                content += " yeah!";
                element.html(content);*/

            element.on('click', function(event){
                this.style.color = "red";
                this.style.width = "600px";
            });

            element.on('mouseenter', function(event){
                this.style.backgroundColor = "#dddbdb";
            });
        }
    }
}