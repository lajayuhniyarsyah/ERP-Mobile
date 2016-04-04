angular.module('app.controllers', [])
  
.controller('menuutamaCtrl', function($scope) {

})
   

.controller('menuloginCtrl', function($scope, LoginService, $ionicPopup, $state, $http, $httpParamSerializerJQLike) {


	

	// $http.get("http://10.36.15.51:8000/custom/get/?format=json")
	// jsonp('http://10.36.15.51:8000/custom/get/?format=json');
	if (! localStorage.reload) {
		localStorage.setItem("reload","true");
		window.location.reload();
	}
	$scope.data = {};
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;

	if (name!=null && pass!=null){

	   
		 LoginService.loginUser(name, pass).success(function(data) {
			$state.go('salesactivity');
		
		}).error(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
				template: 'Please check your credentials!1'
			});
		});
	}
	$scope.login = function() {
		console.log(window.btoa($scope.data.username))  
		LoginService.loginUser(window.btoa($scope.data.username),window.btoa($scope.data.pass)).success(function(data) {
			$state.go('salesactivity');

		 
		   
			window.localStorage.setItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd",window.btoa($scope.data.username))
			window.localStorage.setItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug",window.btoa($scope.data.pass))
		  
		}).error(function(data) {
			var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
				template: 'Please check your credentials!2'
			});
		});
	}
	$scope.test_service = function() {
		$ionicPopup.alert({
			title:"Errorrr",
			template:"testttt dulu bos"
		});

	}
})

   
.controller('submenusalesCtrl', function($scope) {

})
   
.controller('menuactivityCtrl', function($scope) {

})
   
.controller('salesactivityCtrl', function($scope,$http,$state,$ionicLoading,$window) {
   
	  // $scope.loadingIndicator = $ionicLoading.show({
	  //       template: '<ion-spinner icon="spiral"></ion-spinner>'
	  //   });
	
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	var salesdata = (window.localStorage.getItem('salesdata'));

	 if (salesdata==null) {
			
			$http(
				{
					method: 'POST',
					url: 'http://10.36.15.51:8000/openerp/sales.activity/',
					data: {'usn':name,'pw':pass , 'fields':['user_id','begin','end','write_date']},
					headers: {
						'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
					  
					},
				
				}
			).then(
				function successCallback(response){
					console.log('success isi storage kosong dari server');
					$scope.sales = response.data['Result']

					var sd = response.data['Result'];
					
					window.localStorage.setItem( 'salesdata', JSON.stringify(sd));
				
	   
				},
				function errorCallback(response){
					console.log('erroor data kosong');
					$window.localStorage.clear();
					$state.go('menulogin');
				}
			)
			// $scope.loadingstop = $ionicLoading.hide();          
	 }
	 else {

		 var ambilsales = JSON.parse( window.localStorage.getItem( 'salesdata' ));
		 
		 $scope.sales = ambilsales;

		 var ids = ambilsales[0].id;         

		$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/sales.activity/getupdate/',
				data: {'usn':name,'pw':pass , 'fields':['user_id','begin','end','write_date'],'ids':ids},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				  
				},
			
			}
		).then(
			function successCallback(response){
				console.log('success tembak server');
				$scope.sales = response.data['Result']

				// // window.localStorage.setItem('salesvalue',$scope.sales );
				// var sd = {
				//     'sdat':response.data['Result']
				// };
				// window.localStorage.setItem( 'salesdata', JSON.stringify(sd));
			
   
			},
			function errorCallback(response){
				console.log('erroor tembak reza');
				$window.localStorage.clear();
				$state.go('menulogin');
			}
		)
   
	 
	 } 
	 $scope.loadingstop = $ionicLoading.hide();    
})
   
.controller('formactivityCtrl', function($scope,$http,$state) {
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;

	
		$http(
				{
					method: 'POST',
					url: 'http://10.36.15.51:8000/openerp/res.users/search/',
					data: {'usn':name,'pw':pass,'searchfield':'login','searchoperator':'=','searchcateg':window.atob(name),'fields':['name']},
					headers: {
						'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
					  
					},
				
				}
			).then(
				function successCallback(response){
					console.log('success isi storage kosong dari server');
					console.log((response.data['Result'])[0].name)
					$scope.user = (response.data['Result'])[0].name

					// var sales_tm = response.data['data'];
					
					// window.localStorage.setItem( 'sales_tm', JSON.stringify(sales_tm));
				
	   
				},
				function errorCallback(response){
					console.log('erroor data kosong');
					// $window.localStorage.clear();
					// $state.go('menulogin');
				}
			)

	

})
   
.controller('previewplanactivityCtrl', function($scope) {

})

.controller('formreviewactivityCtrl', function($scope,$stateParams) {

	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	// console.log($stateParams.idsact)
	var idx = $stateParams.idsact;
	var ambilsales = JSON.parse( window.localStorage.getItem( 'salesdata' ));

})
   
.controller('formupdateactivityCtrl', function($scope) {
	
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	// console.log($stateParams.idsact)
	// $scope.idsact = $stateParams.idsact
	
	// var ids = $stateParams.idsact;

	//     // $http(
	//         //     {
	//         //         method: 'POST',
	//         //         url: 'http://10.36.15.51:8000/openerp/sales.activity/',
	//         //         data: {'usn':name,'pw':pass , 'fields':['user_id','begin','end'] 'ids' : ids},
	//         //         headers: {
	//         //             'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
					  
	//         //         },
				
	//         //     }
	//         // ).then(
	//         //     function successCallback(response){
	//         //         console.log('success isi storage kosong dari server');
	//         //         $scope.sales = response.data['Result']

	//         //         var sd = response.data['Result'];
					
	//         //         window.localStorage.setItem( 'salesdata', JSON.stringify(sd));
				
	   
	//         //     },
	//         //     function errorCallback(response){
	//         //         console.log('erroor data kosong');
	//         //         $window.localStorage.clear();
	//         //         $state.go('menulogin');
	//         //     }
			// )




})
   
.controller('formdaymondayCtrl', function($scope) {

})
 

 .controller('salesactivitytimelineCtrl', function($scope,$http,$state,$ionicLoading) {
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	var timeline =JSON.parse(window.localStorage.getItem("sales_tm"));
	$ionicLoading.show({
		    content: 'Loading',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 200,
		    showDelay: 0
  		});
 		
	if (timeline==null){
		$http(
				{
					method: 'POST',
					url: 'http://10.36.15.51:8000/openerp/getjason/AllData/',
					data: {'usn':name,'pw':pass},
					headers: {
						'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
					  
					},
				
				}
			).then(
				function successCallback(response){
					console.log('success isi storage kosong dari server');
					console.log(response.data['data'])
					$scope.sales_tm = response.data['data']

					var sales_tm = response.data['data'];
					
					window.localStorage.setItem( 'sales_tm', JSON.stringify(sales_tm));
					 $ionicLoading.hide();
	   
				},
				function errorCallback(response){
					console.log('erroor data kosong');
					$window.localStorage.clear();
					$ionicLoading.hide();
					$state.go('menulogin');
				}
			)

	}
	else{
		// console.log(timeline[0].daylight_num)

		$http(
				{
					method: 'POST',
					url: 'http://10.36.15.51:8000/openerp/getjason/GetUpdate/',
					data: {'usn':name,'pw':pass,'activity_id':timeline[0].activity_id,'user_id':timeline[0].user_id,'dow':timeline[0].dow,'day_ligth':timeline[0].daylight_num,'idview':timeline[0].id},
					headers: {
						'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
					  
					},
				
				}
			).then(
				function successCallback(response){
					console.log('success isi storage kosong dari server');

					timeline_update = response.data['data']
					timeline_update.reverse()
					// $scope.sales_tm = response.data['data']
				
					// var sales_tm = response.data['data'];
					console.log(timeline_update)
					
					for (index =0 ; index < timeline_update.length; index++) {
						timeline.unshift(timeline_update[index])
				
						window.localStorage.setItem( 'sales_tm', JSON.stringify(timeline));
						
					
						
						}
					var timeline_cek_pop =JSON.parse(window.localStorage.getItem("sales_tm"));
					if (timeline_cek_pop.length > 150){
						length_sales_tm = timeline_cek_pop.length
						splice = length_sales_tm - 150
						timeline_cek_pop.splice(149,splice)
						console.log(timeline_cek_pop,"masuk")
						window.localStorage.setItem( 'sales_tm', JSON.stringify(timeline_cek_pop));
					} 
					var Update_timeline =JSON.parse(window.localStorage.getItem("sales_tm"));
				
					$scope.sales_tm = Update_timeline
					$ionicLoading.hide();
				
	   
				},
				function errorCallback(response){
					console.log('erroor data kosong');
					$window.localStorage.clear();
					$state.go('menulogin');
					$ionicLoading.hide();
				}
			)
		var timeline =JSON.parse(window.localStorage.getItem("sales_tm"));
		$scope.sales_tm = timeline
	}
	
})