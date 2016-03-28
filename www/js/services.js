angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('LoginService', function($q,$http) {
    return {

        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var today = new Date();
            var timeInMs = today.getDate();
            // console.log(timeInMs+'ini waktunya');
          
            $http(
                {
                    method: 'POST',
                    url: 'http://10.36.15.51:8000/openerp-login/',
                    data: {'usn':name,'pw':pw},
                    headers: {
                        'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
                      
                    },
                    // para
                }
            ).then(
                function successCallback(response){
                    console.log('success');
                    console.log(response)
                    // console.log(response.data['result']);
                    deferred.resolve('Welcome ' + name + '!');
                },
                function errorCallback(response){
                    console.log('erroor',"aaaaaaaaaaaaaaaaaaaaaaaaa");
                    console.log(response);
                    deferred.reject('Wrong credentials.');
                }
            )

          
            // var config=  headers: {
            //             'Authorization': 'Basic ' + window.btoa('reza'+':'+'suprabakti')
            //         },
            // var data = "aaa"
            // $http.post('http://10.36.15.51:8000/custom/get/', data, config).then(successCallback, errorCallback);
           
            // console.log(response.status);
          
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})


// .service('ErpService',)
;