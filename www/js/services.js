angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('LoginService', function($q,$http,$ionicPopup,config) {
    return {

        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            var today = new Date();
            var timeInMs = today.getDate();
            // console.log(timeInMs+'ini waktunya');
            var startTime = new Date().getTime();
            $http(
                {
                    method: 'POST',
                    url: 'http://'+config['host']+':'+config['port']+'/openerp-login/',
                    data: {'usn':name,'pw':pw},
                    headers: {
                        'Authorization': 'Basic ' + config['secret'],
                      
                    },
                    // timeout : 1000, 
                    timeout : 10000, 
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
                    var respTime = new Date().getTime() - startTime;
                    if(respTime >= response.config.timeout){
                        //time out handeling
                        var alertPopup = $ionicPopup.alert({
                        title: 'Login failed! ',
                        template: 'Timeout, Check your internet connection !'});
                    } else{
                        //other error hanndling
                        var alertPopup = $ionicPopup.alert({
                        title: 'Login failed! ',
                        template: 'Please check your credentials!'
                    });
                    }

                    console.log('erroor',"aaaaaaaaaaaaaaaaaaaaaaaaa");
                    console.log(response.config);
                    // alert(response.status,response.headers)
                    deferred.reject('Wrong credentials.');
                }
            )
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
.service('config', function($q,$http) {
    return {"host":"10.36.15.51","port":'8000',"secret":"cmV6YTpzdXByYWJha3Rp"}
    // return {"host":"192.168.209.130","port":'8000',"secret":"cmV6YTpzdXByYWJha3Rp"}
    // return {"host":"192.168.9.26","port":'8000',"secret":"cmV6YTpzdXByYWJha3Rp"}
})

.service('menu',function($http,config){
    var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
    var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
        $http(
                {
                    method: 'POST',
                    url: 'http://'+config['host']+':'+config['port']+'/openerp/menu/',
                    data: {'usn':name,
                           'pw':pass,
                           
                        },

                    headers: {
                        'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
                      
                    },
                
                }
            ).then(
                function successCallback(response){
                // data_menu(response.data["Result"]) 
                // console.log(response.data["Result"])
                return {"isi":response.data["Result"]}
                },
                function errorCallback(response){
                return {"gagal":"gagal"}
                }
            )
    // return {"asa":"asdsd"}
})