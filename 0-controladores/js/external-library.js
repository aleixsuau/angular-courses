console.log('MyLibrary is on');

/*function saludarComplex (name) {
    console.log('Hola ', name);
}

function aplaudirComplex (name) {
    console.log('Plas plas plas ', name);
}*/

var externalLibrary = {
    saludarComplex: function (name) {
        console.log('Hola ', name);
    },
    aplaudirComplex: function (name) {
        console.log('Plas plas plas ', name);
    },
    print: function (message) {
        var targetNode = document.getElementById("message");
        targetNode.innerHTML = message;
    }    
};