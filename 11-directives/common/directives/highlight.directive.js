angular
    .module('myApp')
    .directive('myHighlight',myHighlight);

function myHighlight () {
    // console.log('myHighlight directive');
    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            // console.log('$scope, $element, $attrs: ', $scope, $element, $attrs);
            
            $element.on('mouseenter', function(event){
                // console.log('mouseenter!', event, this, $element);
                this.style.fontWeight = "bold";
                this.style.backgroundColor = "#dddbdb";
            });

            $element.on('mouseleave', function(event){
                // console.log('mouseleave!', event);
                this.style.fontWeight = "normal";
                this.style.backgroundColor = "";
            });
             
            /*// Vanilla JS
            var element = $element[0];
            element.addEventListener('mouseenter', function () {
                console.log('mouseenter!', event, this, $element);
                this.style.fontWeight = "bold";
                this.style.backgroundColor = "#dddbdb";
            });
            element.addEventListener('mouseleave', function () {
                console.log('mouseleave!', event);
                this.style.fontWeight = "normal";
                this.style.backgroundColor = "";
            });*/
            

        }
    }
}