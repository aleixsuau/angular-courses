angular
    .module('myApp')
    // .directive('sample',behaviourDirective)
    // .directive('mySample',templateDirective);
    // .directive('mySample',bindingsDirective)    
    // .directive('mySample',tableDirective);


// BEHAVIOUR DIRECTIVE 
function behaviourDirective () {
    console.log('behaviourDirective >>>>>>');
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            console.log('scope:\n', scope,'\n element:\n',  element,'\n attrs:\n', attrs);
            
            // Vanilla JS
            // var element = element[0];            
            /*var content = element.innerHTML;
            element.innerHTML = content + ' yeah!';*/
            /*element.innerHTML += ' yeah!';            

            element.addEventListener('click', function () {
                this.style.color = "red";
            });
            element.addEventListener('mouseenter', function () {
                this.style.backgroundColor = "#dddbdb";
            });*/
            
            var content = element.html();
                content += " yeah!";
                element.html(content);

            element.on('click', function(event){
                this.style.color = "red";
            });

            element.on('mouseenter', function(event){
                this.style.backgroundColor = "#dddbdb";
            });
        }
    }
}

// templateDirective SIN SCOPE AISLADO
/*function templateDirective () {
    console.log('templateDirective >>>>>');
    return {
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
}*/

// templateDirective CON SCOPE AISLADO
function templateDirective () {
    console.log('templateDirective (SCOPE Aislado) >>>>>');
    return {
        scope: {
            // logIt:"&"
        },
        restrict: 'E',
        template: '<div style="width:400px; height:100px; margin: 100px; background-color: green;">' + 
                        'Hola soy una directiva template' +
                        '<h3>Count: {{ ctrl.count || 0 }}</h3>' +
                        '<button type="button" class="btn btn-sm btn-default"' +
                                'ng-click="ctrl.count = ctrl.count + 1; ctrl.printCount(ctrl.count)">+</button>' +
                        '<button type="button" class="btn btn-sm btn-default"' +
                                'ng-click="ctrl.count = ctrl.count - 1; ctrl.printCount(ctrl.count)">-</button>' +
                  '</div>',        
        controller: function ($scope, $element, $attrs) {
            var ctrl = this;
            ctrl.count = 10;
            ctrl.printCount = function (count) {
                console.log('The count is: ', count);
            }
        },
        controllerAs: 'ctrl'
    }
}

// BINDINGS TYPES
function bindingsDirective () {
    console.log('bindingsDirective >>>');
    return {
        scope: {
            money: "=",
            // logIt: "&"
        },
        bindToController: true,
        controllerAs: 'ctrl',
        restrict: 'E',
        template: '<div style="background-color:WhiteSmoke; margin: 10px;">' +
                    'DIRECTIVE TEMPLATE:<br>Money: {{ ctrl.money }}<br>' + 
                    '<button type="button" class="btn btn-sm btn-default" ng-click="showInput = !showInput">Show Directive Input</button><br>' + 
                    '<input ng-model="ctrl.money" ng-if="showInput" ng-change="ctrl.logIt()">' +
                    // '<input ng-model="ctrl.money" ng-if="showInput" ng-change="ctrl.logIt({dataFromDirective: 123})">' + 
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
        
    }
}

// PARENT-CHILD SAMPLE
angular
    .module('myApp')
    .directive('myParent',parentDirective)
    .controller('parentController', parentController)    
    .directive('myChild',childDirective)

// COMUNICATION BETWEEN DIRECTIVES SAMPLE
function parentDirective () {
    return {
        scope: {},
        restrict: 'E',
        controller: 'parentController as ctrl'
    }
}

function parentController () {
    this.users = [];
    // Add a user to the array
    this.addUser = function (user) {
        this.users.push(user);
    }
    // Log Users
    this.log = function () {
        console.log("Parent this.users: ", this.users);
    }
}

function childDirective () {
    return {
        scope: {},
        restrict: 'E',
        template:
            '<br><br><input ng-model="user"><br>' +
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