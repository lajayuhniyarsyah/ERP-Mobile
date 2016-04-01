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
			$state.go('menuutama');
		
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
			$state.go('menuutama');

		 
		   
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
   
.controller('salesactivityCtrl', function($scope,$http,$state,$ionicLoading,$window,$timeout) {
   
	  $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });



	$timeout(function () {
    $ionicLoading.hide();  
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	var sales_data_activity = (window.localStorage.getItem('sales_data_activity'));

	 if (sales_data_activity==null) {
			
		$http(
				{
					method: 'POST',
					url: 'http://10.36.15.51:8000/openerp/sales.activity/',
					data: {'usn':name,'pw':pass , 'fields':[]},
					headers: {
						'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
					  
					},
				
				}
			).then(
				function successCallback(response){
					console.log('success isi storage kosong dari server');
					$scope.sda = response.data['Result']

					var sda = response.data['Result'];
					
					window.localStorage.setItem( 'sales_data_activity', JSON.stringify(sda));
				
	   
				},
				function errorCallback(response){
					console.log('erroor data kosong');
					$window.localStorage.clear();
					$state.go('menulogin');
				}
			)          
	 }
	 else {

		 var get_sales_data_activity = JSON.parse( window.localStorage.getItem('sales_data_activity'));
		 console.log(get_sales_data_activity.length,"belajar mencari")

		 var ids = get_sales_data_activity[0].id;         

		$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/sales.activity/getupdate/',
				data: {'usn':name,'pw':pass , 'fields':[],'ids':ids},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				  
				},
			
			}
		).then(
			function successCallback(response){
				console.log('success cek update dari server');
				
				var sda_update = response.data['Result'];
				var currentObj = JSON.parse(window.localStorage.getItem('sales_data_activity')); //object
					
					if(currentObj.length>=4){
						// jika current storage sudah 100
						for (i = 0, len = sda_update.length; i < len; i++){

							currentObj.pop();
							window.localStorage.setItem('sales_data_activity',JSON.stringify(currentObj));
						};
					}					

					//append new object

					for (i = 0, len = sda_update.length; i < len; i++){

						currentObj.unshift(sda_update[i]);
						window.localStorage.setItem('sales_data_activity',JSON.stringify(currentObj));
					};
					
					console.log(currentObj.length,"hasil setelah di push")
					


					console.log(currentObj.length,"hasil setelah di pop")				
				
				var get_sales_data_activity = JSON.parse(window.localStorage.getItem('sales_data_activity'));

				$scope.sda = get_sales_data_activity;

			},
			function errorCallback(response){
				console.log('gagal cek update dari server');
				$window.localStorage.clear();
				$state.go('menulogin');
			}
		) 
	 
	 }
	 }, 1000);    
})
   
.controller('formactivityCtrl', function($scope) {

})
   
.controller('previewplanactivityCtrl', function($scope,$stateParams,$state,$http,$timeout,$ionicLoading) {

	 $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });

	$timeout(function () {
    $ionicLoading.hide(); 
    $scope.pic = $stateParams.pic;
    $scope.begin = $stateParams.begin;
    $scope.end = $stateParams.end; 
	
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	var id = $stateParams.id;
	
	var current_local = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_senin'));
	// console.log(current_local)
	

	if(current_local==null){
		
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.plan.senin/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before plan senin dari server')
				var bp_update_senin = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_plan_senin', JSON.stringify(bp_update_senin));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.plan.senin/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after plan senin dari server')
				$scope.ap_senin = response.data['Result'];
				var ap_update_senin = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_plan_senin', JSON.stringify(ap_update_senin));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.actual.senin/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before actual senin dari server')
				$scope.ba_senin = response.data['Result'];
				var ba_update_senin = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_actual_senin', JSON.stringify(ba_update_senin));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.actual.senin/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after actual senin dari server')
				$scope.aa_senin = response.data['Result'];
				var aa_update_senin = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_actual_senin', JSON.stringify(aa_update_senin));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)

	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.plan.selasa/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before plan selasa dari server')
				$scope.bp_selasa = response.data['Result'];
				var bp_update_selasa = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_plan_selasa', JSON.stringify(bp_update_selasa));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.plan.selasa/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after plan selasa dari server')
				$scope.ap_selasa = response.data['Result'];
				var ap_update_selasa = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_plan_selasa', JSON.stringify(ap_update_selasa));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.actual.selasa/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before actual selasa dari server')
				$scope.ba_selasa = response.data['Result'];
				var ba_update_selasa = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_actual_selasa', JSON.stringify(ba_update_selasa));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.actual.selasa/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after actual selasa dari server')
				$scope.aa_selasa = response.data['Result'];
				var aa_update_selasa = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_actual_selasa', JSON.stringify(aa_update_selasa));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)

	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.plan.rabu/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before plan rabu dari server')
				$scope.bp_rabu = response.data['Result'];
				var bp_update_rabu = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_plan_rabu', JSON.stringify(bp_update_rabu));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.plan.rabu/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after plan rabu dari server')
				$scope.ap_rabu = response.data['Result'];
				var ap_update_rabu = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_plan_rabu', JSON.stringify(ap_update_rabu));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.actual.rabu/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before actual rabu dari server')
				$scope.ba_rabu = response.data['Result'];
				var ba_update_rabu = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_actual_rabu', JSON.stringify(ba_update_rabu));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.actual.rabu/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after actual rabu dari server')
				$scope.aa_rabu = response.data['Result'];
				var aa_update_rabu = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_actual_rabu', JSON.stringify(aa_update_rabu));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)

	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.plan.kamis/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before plan kamis dari server')
				$scope.bp_kamis = response.data['Result'];
				var bp_update_kamis = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_plan_kamis', JSON.stringify(bp_update_kamis));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.plan.kamis/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after plan kamis dari server')
				$scope.ap_kamis = response.data['Result'];
				var ap_update_kamis = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_plan_kamis', JSON.stringify(ap_update_kamis));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.actual.kamis/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before actual kamis dari server')
				$scope.ba_kamis = response.data['Result'];
				var ba_update_kamis = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_actual_kamis', JSON.stringify(ba_update_kamis));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.actual.kamis/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after actual kamis dari server')
				$scope.aa_kamis = response.data['Result'];
				var aa_update_kamis = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_actual_kamis', JSON.stringify(aa_update_kamis));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)

	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.plan.jumat/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before plan jumat dari server')
				$scope.bp_jumat = response.data['Result'];
				var bp_update_jumat = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_plan_jumat', JSON.stringify(bp_update_jumat));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.plan.jumat/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after plan jumat dari server')
				$scope.ap_jumat = response.data['Result'];
				var ap_update_jumat = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_plan_jumat', JSON.stringify(ap_update_jumat));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.actual.jumat/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before actual jumat dari server')
				$scope.ba_jumat = response.data['Result'];
				var ba_update_jumat = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_actual_jumat', JSON.stringify(ba_update_jumat));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.actual.jumat/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after actual jumat dari server')
				$scope.aa_jumat = response.data['Result'];
				var aa_update_jumat = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_actual_jumat', JSON.stringify(aa_update_jumat));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)

	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.plan.sabtu/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before plan sabtu dari server')
				$scope.bp_sabtu = response.data['Result'];
				var bp_update_sabtu = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_plan_sabtu', JSON.stringify(bp_update_sabtu));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.plan.sabtu/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after plan sabtu dari server')
				$scope.ap_sabtu = response.data['Result'];
				var ap_update_sabtu = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_plan_sabtu', JSON.stringify(ap_update_sabtu));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.actual.sabtu/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before actual sabtu dari server')
				$scope.ba_sabtu = response.data['Result'];
				var ba_update_sabtu = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_actual_sabtu', JSON.stringify(ba_update_sabtu));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.actual.sabtu/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after actual sabtu dari server')
				$scope.aa_sabtu = response.data['Result'];
				var aa_update_sabtu = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_actual_sabtu', JSON.stringify(aa_update_sabtu));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)

	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.plan.ahad/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before plan ahad dari server')
				$scope.bp_ahad = response.data['Result'];
				var bp_update_ahad = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_plan_ahad', JSON.stringify(bp_update_ahad));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.plan.ahad/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after plan ahad dari server')
				$scope.ap_ahad = response.data['Result'];
				var ap_update_ahad = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_plan_ahad', JSON.stringify(ap_update_ahad));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.actual.ahad/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before actual ahad dari server')
				$scope.ba_ahad = response.data['Result'];
				var ba_update_ahad = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_before_actual_ahad', JSON.stringify(ba_update_ahad));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
	$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/after.actual.ahad/search/',
				data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong after actual ahad dari server')
				$scope.aa_ahad = response.data['Result'];
				var aa_update_ahad = response.data['Result'];

				window.localStorage.setItem( 'sales_activity_after_actual_ahad', JSON.stringify(aa_update_ahad));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)

		window.localStorage.setItem('current_activity_id',JSON.stringify([id]));

	}
	
	else {
		verifikasi = false
		var current_id = JSON.parse(window.localStorage.getItem('current_activity_id'));
		for (var i = 0; i < current_id.length; i++) {

			if (id == current_id[i]){
				verifikasi = true
			}
		};
			
		if (verifikasi) {
			console.log("id dah ada bos")
		}
		else {
			current_id.push(id);
			window.localStorage.setItem('current_activity_id',JSON.stringify(current_id));
			
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.plan.senin/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before plan senin dari server')
						$scope.bp_senin = response.data['Result'];
						var bp_update_senin = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_senin'));

						for (var i = 0;i<bp_update_senin.length; i++) {
							currentObj.push(bp_update_senin[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_plan_senin',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.plan.senin/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after plan senin dari server')
						$scope.ap_senin = response.data['Result'];
						var ap_update_senin = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_senin'));
						
						for (var i = 0;i<ap_update_senin.length; i++) {
							currentObj.push(ap_update_senin[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_plan_senin',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.actual.senin/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before actual senin dari server')
						$scope.ba_senin = response.data['Result'];
						var ba_update_senin = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_senin'));
						
						for (var i = 0;i<ba_update_senin.length; i++) {
							currentObj.push(ba_update_senin[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_actual_senin',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.actual.senin/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after actual senin dari server')
						$scope.aa_senin = response.data['Result'];
						var aa_update_senin = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_senin'));
						
						for (var i = 0;i<aa_update_senin.length; i++) {
							currentObj.push(aa_update_senin[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_actual_senin',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)

			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.plan.selasa/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before plan selasa dari server')
						$scope.bp_selasa = response.data['Result'];
						var bp_update_selasa = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_selasa'));

						for (var i = 0;i<bp_update_selasa.length; i++) {
							currentObj.push(bp_update_selasa[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_plan_selasa',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.plan.selasa/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after plan selasa dari server')
						$scope.ap_selasa = response.data['Result'];
						var ap_update_selasa = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_selasa'));
						
						for (var i = 0;i<ap_update_selasa.length; i++) {
							currentObj.push(ap_update_selasa[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_plan_selasa',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.actual.selasa/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before actual selasa dari server')
						$scope.ba_selasa = response.data['Result'];
						var ba_update_selasa = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_selasa'));
						
						for (var i = 0;i<ba_update_selasa.length; i++) {
							currentObj.push(ba_update_selasa[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_actual_selasa',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.actual.selasa/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after actual selasa dari server')
						$scope.aa_selasa = response.data['Result'];
						var aa_update_selasa = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_selasa'));
						
						for (var i = 0;i<aa_update_selasa.length; i++) {
							currentObj.push(aa_update_selasa[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_actual_selasa',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)

			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.plan.rabu/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before plan rabu dari server')
						$scope.bp_rabu = response.data['Result'];
						var bp_update_rabu = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_rabu'));

						for (var i = 0;i<bp_update_rabu.length; i++) {
							currentObj.push(bp_update_rabu[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_plan_rabu',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.plan.rabu/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after plan rabu dari server')
						$scope.ap_rabu = response.data['Result'];
						var ap_update_rabu = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_rabu'));
						
						for (var i = 0;i<ap_update_rabu.length; i++) {
							currentObj.push(ap_update_rabu[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_plan_rabu',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.actual.rabu/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before actual rabu dari server')
						$scope.ba_rabu = response.data['Result'];
						var ba_update_rabu = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_rabu'));
						
						for (var i = 0;i<ba_update_rabu.length; i++) {
							currentObj.push(ba_update_rabu[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_actual_rabu',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.actual.rabu/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after actual rabu dari server')
						$scope.aa_rabu = response.data['Result'];
						var aa_update_rabu = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_rabu'));
						
						for (var i = 0;i<aa_update_rabu.length; i++) {
							currentObj.push(aa_update_rabu[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_actual_rabu',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)

			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.plan.kamis/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before plan kamis dari server')
						$scope.bp_kamis = response.data['Result'];
						var bp_update_kamis = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_kamis'));

						for (var i = 0;i<bp_update_kamis.length; i++) {
							currentObj.push(bp_update_kamis[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_plan_kamis',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.plan.kamis/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after plan kamis dari server')
						$scope.ap_kamis = response.data['Result'];
						var ap_update_kamis = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_kamis'));
						
						for (var i = 0;i<ap_update_kamis.length; i++) {
							currentObj.push(ap_update_kamis[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_plan_kamis',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.actual.kamis/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before actual kamis dari server')
						$scope.ba_kamis = response.data['Result'];
						var ba_update_kamis = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_kamis'));
						
						for (var i = 0;i<ba_update_kamis.length; i++) {
							currentObj.push(ba_update_kamis[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_actual_kamis',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.actual.kamis/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after actual kamis dari server')
						$scope.aa_kamis = response.data['Result'];
						var aa_update_kamis = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_kamis'));
						
						for (var i = 0;i<aa_update_kamis.length; i++) {
							currentObj.push(aa_update_kamis[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_actual_kamis',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)

			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.plan.jumat/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before plan jumat dari server')
						$scope.bp_jumat = response.data['Result'];
						var bp_update_jumat = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_jumat'));

						for (var i = 0;i<bp_update_jumat.length; i++) {
							currentObj.push(bp_update_jumat[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_plan_jumat',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.plan.jumat/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after plan jumat dari server')
						$scope.ap_jumat = response.data['Result'];
						var ap_update_jumat = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_jumat'));
						
						for (var i = 0;i<ap_update_jumat.length; i++) {
							currentObj.push(ap_update_jumat[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_plan_jumat',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.actual.jumat/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before actual jumat dari server')
						$scope.ba_jumat = response.data['Result'];
						var ba_update_jumat = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_jumat'));
						
						for (var i = 0;i<ba_update_jumat.length; i++) {
							currentObj.push(ba_update_jumat[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_actual_jumat',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.actual.jumat/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after actual jumat dari server')
						$scope.aa_jumat = response.data['Result'];
						var aa_update_jumat = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_jumat'));
						
						for (var i = 0;i<aa_update_jumat.length; i++) {
							currentObj.push(aa_update_jumat[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_actual_jumat',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)

			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.plan.sabtu/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before plan sabtu dari server')
						$scope.bp_sabtu = response.data['Result'];
						var bp_update_sabtu = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_sabtu'));

						for (var i = 0;i<bp_update_sabtu.length; i++) {
							currentObj.push(bp_update_sabtu[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_plan_sabtu',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.plan.sabtu/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after plan sabtu dari server')
						$scope.ap_sabtu = response.data['Result'];
						var ap_update_sabtu = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_sabtu'));
						
						for (var i = 0;i<ap_update_sabtu.length; i++) {
							currentObj.push(ap_update_sabtu[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_plan_sabtu',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.actual.sabtu/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before actual sabtu dari server')
						$scope.ba_sabtu = response.data['Result'];
						var ba_update_sabtu = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_sabtu'));
						
						for (var i = 0;i<ba_update_sabtu.length; i++) {
							currentObj.push(ba_update_sabtu[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_actual_sabtu',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.actual.sabtu/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after actual sabtu dari server')
						$scope.aa_sabtu = response.data['Result'];
						var aa_update_sabtu = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_sabtu'));
						
						for (var i = 0;i<aa_update_sabtu.length; i++) {
							currentObj.push(aa_update_sabtu[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_actual_sabtu',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)

			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.plan.ahad/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before plan ahad dari server')
						$scope.bp_ahad = response.data['Result'];
						var bp_update_ahad = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_ahad'));

						for (var i = 0;i<bp_update_ahad.length; i++) {
							currentObj.push(bp_update_ahad[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_plan_ahad',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.plan.ahad/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after plan ahad dari server')
						$scope.ap_ahad = response.data['Result'];
						var ap_update_ahad = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_ahad'));
						
						for (var i = 0;i<ap_update_ahad.length; i++) {
							currentObj.push(ap_update_ahad[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_plan_ahad',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/before.actual.ahad/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage before actual ahad dari server')
						$scope.ba_ahad = response.data['Result'];
						var ba_update_ahad = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_ahad'));
						
						for (var i = 0;i<ba_update_ahad.length; i++) {
							currentObj.push(ba_update_ahad[i]);
						};
						
						window.localStorage.setItem('sales_activity_before_actual_ahad',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.actual.ahad/search/',
						data: {'usn':name,'pw':pass ,'searchfield':"activity_id","searchoperator":"=","searchcateg":id,'fields':[]},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},		
					}
				).then(
					function successCallback(response){
						console.log('sukses nambah storage after actual ahad dari server')
						$scope.aa_ahad = response.data['Result'];
						var aa_update_ahad = response.data['Result'];

						var currentObj = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_ahad'));
						
						for (var i = 0;i<aa_update_ahad.length; i++) {
							currentObj.push(aa_update_ahad[i]);
						};
						
						window.localStorage.setItem('sales_activity_after_actual_ahad',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
		}
			var bpsenin = []; var apsenin = []; var basenin = []; var aasenin = [];
			var bpselasa = []; var apselasa = []; var baselasa = []; var aaselasa = [];
			var bprabu = []; var aprabu = []; var barabu = []; var aarabu = [];
			var bpkamis = []; var apkamis = []; var bakamis = []; var aakamis = [];
			var bpjumat = []; var apjumat = []; var bajumat = []; var aajumat = [];
			var bpsabtu = []; var apsabtu = []; var basabtu = []; var aasabtu = [];
			var bpahad = []; var apahad = []; var baahad = []; var aaahad = []; 

			var idx = id;
			
			var get_sales_activity_before_plan_senin = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_senin'));

			for (var i = 0; i < get_sales_activity_before_plan_senin.length; i++) {

				if (idx == get_sales_activity_before_plan_senin[i].activity_id[0]){
					bpsenin.push(get_sales_activity_before_plan_senin[i])
				}
			};
			 
			$scope.bp_senin = bpsenin;	

			var get_sales_activity_after_plan_senin = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_senin'));

			for (var i = 0; i < get_sales_activity_after_plan_senin.length; i++) {

				if (idx == get_sales_activity_after_plan_senin[i].activity_id[0]){
					apsenin.push(get_sales_activity_after_plan_senin[i])
				}
			};
			 
			$scope.ap_senin = apsenin;

			var get_sales_activity_before_actual_senin = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_senin'));

			for (var i = 0; i < get_sales_activity_before_actual_senin.length; i++) {

				if (idx == get_sales_activity_before_actual_senin[i].activity_id[0]){
					basenin.push(get_sales_activity_before_actual_senin[i])
				}
			};
			 
			$scope.ba_senin = basenin;	

			var get_sales_activity_after_actual_senin = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_senin'));

			for (var i = 0; i < get_sales_activity_after_actual_senin.length; i++) {

				if (idx == get_sales_activity_after_actual_senin[i].activity_id[0]){
					aasenin.push(get_sales_activity_after_actual_senin[i])
				}
			};
			 
			$scope.aa_senin = aasenin;

			var get_sales_activity_before_plan_selasa = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_selasa'));

			for (var i = 0; i < get_sales_activity_before_plan_selasa.length; i++) {

				if (idx == get_sales_activity_before_plan_selasa[i].activity_id[0]){
					bpselasa.push(get_sales_activity_before_plan_selasa[i])
				}
			};
			 
			$scope.bp_selasa = bpselasa;	

			var get_sales_activity_after_plan_selasa = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_selasa'));

			for (var i = 0; i < get_sales_activity_after_plan_selasa.length; i++) {

				if (idx == get_sales_activity_after_plan_selasa[i].activity_id[0]){
					apselasa.push(get_sales_activity_after_plan_selasa[i])
				}
			};
			 
			$scope.ap_selasa = apselasa;

			var get_sales_activity_before_actual_selasa = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_selasa'));

			for (var i = 0; i < get_sales_activity_before_actual_selasa.length; i++) {

				if (idx == get_sales_activity_before_actual_selasa[i].activity_id[0]){
					baselasa.push(get_sales_activity_before_actual_selasa[i])
				}
			};
			 
			$scope.ba_selasa = baselasa;	

			var get_sales_activity_after_actual_selasa = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_selasa'));

			for (var i = 0; i < get_sales_activity_after_actual_selasa.length; i++) {

				if (idx == get_sales_activity_after_actual_selasa[i].activity_id[0]){
					aaselasa.push(get_sales_activity_after_actual_selasa[i])
				}
			};
			 
			$scope.aa_selasa = aaselasa;

			var get_sales_activity_before_plan_rabu = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_rabu'));

			for (var i = 0; i < get_sales_activity_before_plan_rabu.length; i++) {

				if (idx == get_sales_activity_before_plan_rabu[i].activity_id[0]){
					bprabu.push(get_sales_activity_before_plan_rabu[i])
				}
			};
			 
			$scope.bp_rabu = bprabu;	

			var get_sales_activity_after_plan_rabu = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_rabu'));

			for (var i = 0; i < get_sales_activity_after_plan_rabu.length; i++) {

				if (idx == get_sales_activity_after_plan_rabu[i].activity_id[0]){
					aprabu.push(get_sales_activity_after_plan_rabu[i])
				}
			};
			 
			$scope.ap_rabu = aprabu;

			var get_sales_activity_before_actual_rabu = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_rabu'));

			for (var i = 0; i < get_sales_activity_before_actual_rabu.length; i++) {

				if (idx == get_sales_activity_before_actual_rabu[i].activity_id[0]){
					barabu.push(get_sales_activity_before_actual_rabu[i])
				}
			};
			 
			$scope.ba_rabu = barabu;	

			var get_sales_activity_after_actual_rabu = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_rabu'));

			for (var i = 0; i < get_sales_activity_after_actual_rabu.length; i++) {

				if (idx == get_sales_activity_after_actual_rabu[i].activity_id[0]){
					aarabu.push(get_sales_activity_after_actual_rabu[i])
				}
			};
			 
			$scope.aa_rabu = aarabu;

			var get_sales_activity_before_plan_kamis = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_kamis'));

			for (var i = 0; i < get_sales_activity_before_plan_kamis.length; i++) {

				if (idx == get_sales_activity_before_plan_kamis[i].activity_id[0]){
					bpkamis.push(get_sales_activity_before_plan_kamis[i])
				}
			};
			 
			$scope.bp_kamis = bpkamis;	

			var get_sales_activity_after_plan_kamis = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_kamis'));

			for (var i = 0; i < get_sales_activity_after_plan_kamis.length; i++) {

				if (idx == get_sales_activity_after_plan_kamis[i].activity_id[0]){
					apkamis.push(get_sales_activity_after_plan_kamis[i])
				}
			};
			 
			$scope.ap_kamis = apkamis;

			var get_sales_activity_before_actual_kamis = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_kamis'));

			for (var i = 0; i < get_sales_activity_before_actual_kamis.length; i++) {

				if (idx == get_sales_activity_before_actual_kamis[i].activity_id[0]){
					bakamis.push(get_sales_activity_before_actual_kamis[i])
				}
			};
			 
			$scope.ba_kamis = bakamis;	

			var get_sales_activity_after_actual_kamis = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_kamis'));

			for (var i = 0; i < get_sales_activity_after_actual_kamis.length; i++) {

				if (idx == get_sales_activity_after_actual_kamis[i].activity_id[0]){
					aakamis.push(get_sales_activity_after_actual_kamis[i])
				}
			};
			 
			$scope.aa_kamis = aakamis;

			var get_sales_activity_before_plan_jumat = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_jumat'));

			for (var i = 0; i < get_sales_activity_before_plan_jumat.length; i++) {

				if (idx == get_sales_activity_before_plan_jumat[i].activity_id[0]){
					bpjumat.push(get_sales_activity_before_plan_jumat[i])
				}
			};
			 
			$scope.bp_jumat = bpjumat;	

			var get_sales_activity_after_plan_jumat = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_jumat'));

			for (var i = 0; i < get_sales_activity_after_plan_jumat.length; i++) {

				if (idx == get_sales_activity_after_plan_jumat[i].activity_id[0]){
					apjumat.push(get_sales_activity_after_plan_jumat[i])
				}
			};
			 
			$scope.ap_jumat = apjumat;

			var get_sales_activity_before_actual_jumat = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_jumat'));

			for (var i = 0; i < get_sales_activity_before_actual_jumat.length; i++) {

				if (idx == get_sales_activity_before_actual_jumat[i].activity_id[0]){
					bajumat.push(get_sales_activity_before_actual_jumat[i])
				}
			};
			 
			$scope.ba_jumat = bajumat;	

			var get_sales_activity_after_actual_jumat = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_jumat'));

			for (var i = 0; i < get_sales_activity_after_actual_jumat.length; i++) {

				if (idx == get_sales_activity_after_actual_jumat[i].activity_id[0]){
					aajumat.push(get_sales_activity_after_actual_jumat[i])
				}
			};
			 
			$scope.aa_jumat = aajumat;

			var get_sales_activity_before_plan_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_sabtu'));

			for (var i = 0; i < get_sales_activity_before_plan_sabtu.length; i++) {

				if (idx == get_sales_activity_before_plan_sabtu[i].activity_id[0]){
					bpsabtu.push(get_sales_activity_before_plan_sabtu[i])
				}
			};
			 
			$scope.bp_sabtu = bpsabtu;	

			var get_sales_activity_after_plan_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_sabtu'));

			for (var i = 0; i < get_sales_activity_after_plan_sabtu.length; i++) {

				if (idx == get_sales_activity_after_plan_sabtu[i].activity_id[0]){
					apsabtu.push(get_sales_activity_after_plan_sabtu[i])
				}
			};
			 
			$scope.ap_sabtu = apsabtu;

			var get_sales_activity_before_actual_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_sabtu'));

			for (var i = 0; i < get_sales_activity_before_actual_sabtu.length; i++) {

				if (idx == get_sales_activity_before_actual_sabtu[i].activity_id[0]){
					basabtu.push(get_sales_activity_before_actual_sabtu[i])
				}
			};
			 
			$scope.ba_sabtu = basabtu;	

			var get_sales_activity_after_actual_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_sabtu'));

			for (var i = 0; i < get_sales_activity_after_actual_sabtu.length; i++) {

				if (idx == get_sales_activity_after_actual_sabtu[i].activity_id[0]){
					aasabtu.push(get_sales_activity_after_actual_sabtu[i])
				}
			};
			 
			$scope.aa_sabtu = aasabtu;

			var get_sales_activity_before_plan_minggu = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_minggu'));

			for (var i = 0; i < get_sales_activity_before_plan_minggu.length; i++) {

				if (idx == get_sales_activity_before_plan_minggu[i].activity_id[0]){
					bpminggu.push(get_sales_activity_before_plan_minggu[i])
				}
			};
			 
			$scope.bp_minggu = bpminggu;	

			var get_sales_activity_after_plan_minggu = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_minggu'));

			for (var i = 0; i < get_sales_activity_after_plan_minggu.length; i++) {

				if (idx == get_sales_activity_after_plan_minggu[i].activity_id[0]){
					apminggu.push(get_sales_activity_after_plan_minggu[i])
				}
			};
			 
			$scope.ap_minggu = apminggu;

			var get_sales_activity_before_actual_minggu = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_minggu'));

			for (var i = 0; i < get_sales_activity_before_actual_minggu.length; i++) {

				if (idx == get_sales_activity_before_actual_minggu[i].activity_id[0]){
					baminggu.push(get_sales_activity_before_actual_minggu[i])
				}
			};
			 
			$scope.ba_minggu = baminggu;	

			var get_sales_activity_after_actual_minggu = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_minggu'));

			for (var i = 0; i < get_sales_activity_after_actual_minggu.length; i++) {

				if (idx == get_sales_activity_after_actual_minggu[i].activity_id[0]){
					aaminggu.push(get_sales_activity_after_actual_minggu[i])
				}
			};
			 
			$scope.aa_minggu = aaminggu;
	}

	},1000);
})
   
.controller('formupdateactivityCtrl', function($scope,$stateParams,$http) {
		
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	var hari = $stateParams.hari;
	var bplan = $stateParams.beforeplan;
	var aplan = $stateParams.afterplan;
	var bactual = $stateParams.beforeactual;
	var aactual = $stateParams.afteractual;
	var salesactbefore = (window.localStorage.getItem('salesactbefore'+hari+bplan)); 
	var salesactafter = (window.localStorage.getItem('salesactafter'+hari+aplan));  

	if (salesactbefore == null) {

		$http(
				{
					method: 'POST',
					url: 'http://10.36.15.51:8000/openerp/before.plan.'+hari+'/ids/',
					data: {'usn':name,'pw':pass , 'fields':['partner_id','location','name',],'ids':bplan},
					headers: {
						'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
					  
					},
				
				}
			).then(
				function successCallback(response){
					console.log('success before');
					$scope.bplan = response.data['Result']
					// console.log($scope.bplan)

					var beforeplan = response.data['Result'];
					
					window.localStorage.setItem( 'salesactbefore'+hari+bplan, JSON.stringify(beforeplan));
				
	   
				},
				function errorCallback(response){
					console.log('erroor data kosong');
					// $window.localStorage.clear();
					// $state.go('formreviewactivity');
				}
			)
	}

	else {
		var beforeplan = JSON.parse(window.localStorage.getItem( 'salesactbefore'+hari+bplan ));
		$scope.bplan = beforeplan;
	}

	if (salesactafter == null) {
			
			$http(
					{
						method: 'POST',
						url: 'http://10.36.15.51:8000/openerp/after.plan.'+hari+'/ids/',
						data: {'usn':name,'pw':pass , 'fields':['partner_id','location','name',],'ids':aplan},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						  
						},
					
					}
				).then(
					function successCallback(response){
						console.log('success after');
						$scope.aplan = response.data['Result']
						// console.log($scope.aplan)

						var afterplan = response.data['Result'];
						
						window.localStorage.setItem( 'salesactafter'+hari+aplan, JSON.stringify(afterplan));
					
		   
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)  
	}  
	else {
		var afterplan = JSON.parse( window.localStorage.getItem( 'salesactafter'+hari+aplan ));
		$scope.aplan = afterplan; 
	}      

			

})
   
.controller('formdaymondayCtrl', function($scope) {

})
