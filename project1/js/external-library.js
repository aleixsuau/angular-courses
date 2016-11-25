console.log('MyLibrary is on');

/*function saludar (name) {
    console.log('Hola ', name);
}

function aplaudir (name) {
    console.log('Plas plas plas ', name);
}*/

var mylibrary = {
    saludar: function (name) {
        console.log('Hola ', name);
    },
    aplaudir: function (name) {
        console.log('Plas plas plas ', name);
    }
}


/*var mylibrary = {
    print: function (target,message,name) {
        var target = document.getElementById(target);
        target.innerHTML = message + ' ' + name;
    }
}*/