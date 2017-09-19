angular
    .module('myApp')
    .factory('myInterceptor', myInterceptor);

    myInterceptor.$inject = ['ToastService'];

    function myInterceptor(ToastService) {
        // console.log('myInterceptor load');
        var interceptor = {
            'request': function(config) { // successful request method
                // console.log('request config: ', config);			
                return config; // or promise $q.when(config);
            },
            'response': function(response) { // successful response
                // console.log('response: ', response);
                return response; // or $q.when(config);
            },
            'requestError': function(requestError) { // an error happened on the request
                // console.log('requestError: ', requestError);
                ToastService.showToast('warning', 'Error en la request :(');
                return requestError; // or new promise or requestError $q.reject(requestError))
            },
            'responseError': function(responseError) { // an error happened on the request
                console.log('responseError: ', responseError);                
                ToastService.showToast('warning', 'Error en la response :(');              
                return responseError; // or new promise or responseError $q.reject(responseError))
            }
        };
        return interceptor;
    }
