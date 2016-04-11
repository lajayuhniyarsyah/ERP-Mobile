angular.module('app.controllers', ['infinite-scroll'])

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
				title: 'Login failed! ',
				template: 'Please check your credentials!'
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
					$ionicLoading.hide();
					console.log('erroor data kosong 1');
					$window.localStorage.clear();
					
					// $state.go('menulogin');
				}
			)          
	 }
	 else {

		 var get_sales_data_activity = JSON.parse( window.localStorage.getItem('sales_data_activity'));

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
				
				var sda_update = response.data['Result']
				
				var current = window.localStorage.getItem('sales_data_activity'); //string
				var currentObj = JSON.parse(current); //object
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						//append new object
						for (i = 0, len = sda_update.length; i < len; i++){

							var refreshOBj = currentObj.push(sda_update[i]);
							window.localStorage.setItem('sales_data_activity',JSON.stringify(currentObj));
						}
						
					}
				}
				else{

					window.localStorage.setItem('sales_date_activity',JSON.stringify([sda_update]));
				
				}
				
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

  
.controller('previewplanactivityCtrl', function($scope,$stateParams,$http,$timeout,$ionicLoading) {

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
	// var hari = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "ahad"];
	// console.log(hari.length)

	if(!id){
		alert('Not Found'); // selesai

	}

	else {
		
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
				var bp_update_senin = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_plan_senin'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_plan_senin = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_senin'));

							for (i = 0, len = get_sales_activity_before_plan_senin.length; i < len; i++) {
								if (id == get_sales_activity_before_plan_senin[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_plan_senin = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_senin'));

							var refreshOBj = currentObj.push(bp_update_senin);
							
							window.localStorage.setItem('sales_activity_before_plan_senin',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_plan_senin',JSON.stringify([bp_update_senin]));
				} 

				var get_sales_activity_before_plan_senin = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_senin'));

				for (var i = 0; i < get_sales_activity_before_plan_senin.length; i++) {
					console.log("Test=====================");
					console.log(get_sales_activity_before_plan_senin[i][0]);
					if (id == get_sales_activity_before_plan_senin[i][0].activity_id[0]){
						var key = i
						console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa');
						console.log(i);
						console.log(id);
						console.log(get_sales_activity_before_plan_senin[i][0].activity_id[0]);
					}

				};

				$scope.bp_senin = get_sales_activity_before_plan_senin[key][0];
				// console.log(get_sales_activity_before_plan_senin[0][0])  


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
				var ap_update_senin = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_plan_senin'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_plan_senin = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_senin'));

							for (i = 0, len = get_sales_activity_after_plan_senin.length; i < len; i++) {
								if (id == get_sales_activity_after_plan_senin[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_plan_senin = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_senin'));

							var refreshOBj = currentObj.push(ap_update_senin);
							
							window.localStorage.setItem('sales_activity_after_plan_senin',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_plan_senin',JSON.stringify([ap_update_senin]));
				} 

				var get_sales_activity_after_plan_senin = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_senin'));

				for (var i = 0; i < get_sales_activity_after_plan_senin.length; i++) {

					if (id == get_sales_activity_after_plan_senin[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ap_senin = get_sales_activity_after_plan_senin[key][0];
				// console.log(get_sales_activity_before_plan_senin[0][0])  


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
				var ba_update_senin = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_actual_senin'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_actual_senin = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_senin'));

							for (i = 0, len = get_sales_activity_before_actual_senin.length; i < len; i++) {
								if (id == get_sales_activity_before_actual_senin[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_actual_senin = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_senin'));

							var refreshOBj = currentObj.push(ba_update_senin);
							
							window.localStorage.setItem('sales_activity_before_actual_senin',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_actual_senin',JSON.stringify([ba_update_senin]));
				} 

				var get_sales_activity_before_actual_senin = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_senin'));

				for (var i = 0; i < get_sales_activity_before_actual_senin.length; i++) {

					if (id == get_sales_activity_before_actual_senin[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ba_senin = get_sales_activity_before_actual_senin[key][0];
				// console.log(get_sales_activity_before_plan_senin[0][0])  


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
				var aa_update_senin = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_actual_senin'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_actual_senin = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_senin'));

							for (i = 0, len = get_sales_activity_after_actual_senin.length; i < len; i++) {
								if (id == get_sales_activity_after_actual_senin[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_actual_senin = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_senin'));

							var refreshOBj = currentObj.push(aa_update_senin);
							
							window.localStorage.setItem('sales_activity_after_actual_senin',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_actual_senin',JSON.stringify([aa_update_senin]));
				} 

				var get_sales_activity_after_actual_senin = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_senin'));

				for (var i = 0; i < get_sales_activity_after_actual_senin.length; i++) {

					if (id == get_sales_activity_after_actual_senin[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.aa_senin = get_sales_activity_after_actual_senin[key][0];
				// console.log(get_sales_activity_before_plan_senin[0][0])  


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
				var bp_update_selasa = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_plan_selasa'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_plan_selasa = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_selasa'));

							for (i = 0, len = get_sales_activity_before_plan_selasa.length; i < len; i++) {
								if (id == get_sales_activity_before_plan_selasa[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_plan_selasa = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_selasa'));

							var refreshOBj = currentObj.push(bp_update_selasa);
							
							window.localStorage.setItem('sales_activity_before_plan_selasa',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_plan_selasa',JSON.stringify([bp_update_selasa]));
				} 

				var get_sales_activity_before_plan_selasa = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_selasa'));

				for (var i = 0; i < get_sales_activity_before_plan_selasa.length; i++) {

					if (id == get_sales_activity_before_plan_selasa[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.bp_selasa = get_sales_activity_before_plan_selasa[key][0];
				// console.log(get_sales_activity_before_plan_selasa[0][0])  


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
				var ap_update_selasa = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_plan_selasa'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_plan_selasa = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_selasa'));

							for (i = 0, len = get_sales_activity_after_plan_selasa.length; i < len; i++) {
								if (id == get_sales_activity_after_plan_selasa[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_plan_selasa = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_selasa'));

							var refreshOBj = currentObj.push(ap_update_selasa);
							
							window.localStorage.setItem('sales_activity_after_plan_selasa',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_plan_selasa',JSON.stringify([ap_update_selasa]));
				} 

				var get_sales_activity_after_plan_selasa = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_selasa'));

				for (var i = 0; i < get_sales_activity_after_plan_selasa.length; i++) {

					if (id == get_sales_activity_after_plan_selasa[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ap_selasa = get_sales_activity_after_plan_selasa[key][0];
				// console.log(get_sales_activity_before_plan_selasa[0][0])  


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
				var ba_update_selasa = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_actual_selasa'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_actual_selasa = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_selasa'));

							for (i = 0, len = get_sales_activity_before_actual_selasa.length; i < len; i++) {
								if (id == get_sales_activity_before_actual_selasa[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_actual_selasa = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_selasa'));

							var refreshOBj = currentObj.push(ba_update_selasa);
							
							window.localStorage.setItem('sales_activity_before_actual_selasa',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_actual_selasa',JSON.stringify([ba_update_selasa]));
				} 

				var get_sales_activity_before_actual_selasa = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_selasa'));

				for (var i = 0; i < get_sales_activity_before_actual_selasa.length; i++) {

					if (id == get_sales_activity_before_actual_selasa[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ba_selasa = get_sales_activity_before_actual_selasa[key][0];
				// console.log(get_sales_activity_before_plan_selasa[0][0])  


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
				var aa_update_selasa = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_actual_selasa'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_actual_selasa = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_selasa'));

							for (i = 0, len = get_sales_activity_after_actual_selasa.length; i < len; i++) {
								if (id == get_sales_activity_after_actual_selasa[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_actual_selasa = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_selasa'));

							var refreshOBj = currentObj.push(aa_update_selasa);
							
							window.localStorage.setItem('sales_activity_after_actual_selasa',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_actual_selasa',JSON.stringify([aa_update_selasa]));
				} 

				var get_sales_activity_after_actual_selasa = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_selasa'));

				for (var i = 0; i < get_sales_activity_after_actual_selasa.length; i++) {

					if (id == get_sales_activity_after_actual_selasa[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.aa_selasa = get_sales_activity_after_actual_selasa[key][0];
				// console.log(get_sales_activity_before_plan_selasa[0][0])  


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
				var bp_update_rabu = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_plan_rabu'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_plan_rabu = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_rabu'));

							for (i = 0, len = get_sales_activity_before_plan_rabu.length; i < len; i++) {
								if (id == get_sales_activity_before_plan_rabu[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_plan_rabu = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_rabu'));

							var refreshOBj = currentObj.push(bp_update_rabu);
							
							window.localStorage.setItem('sales_activity_before_plan_rabu',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_plan_rabu',JSON.stringify([bp_update_rabu]));
				} 

				var get_sales_activity_before_plan_rabu = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_rabu'));

				for (var i = 0; i < get_sales_activity_before_plan_rabu.length; i++) {

					if (id == get_sales_activity_before_plan_rabu[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.bp_rabu = get_sales_activity_before_plan_rabu[key][0];
				// console.log(get_sales_activity_before_plan_rabu[0][0])  


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
				var ap_update_rabu = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_plan_rabu'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_plan_rabu = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_rabu'));

							for (i = 0, len = get_sales_activity_after_plan_rabu.length; i < len; i++) {
								if (id == get_sales_activity_after_plan_rabu[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_plan_rabu = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_rabu'));

							var refreshOBj = currentObj.push(ap_update_rabu);
							
							window.localStorage.setItem('sales_activity_after_plan_rabu',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_plan_rabu',JSON.stringify([ap_update_rabu]));
				} 

				var get_sales_activity_after_plan_rabu = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_rabu'));

				for (var i = 0; i < get_sales_activity_after_plan_rabu.length; i++) {

					if (id == get_sales_activity_after_plan_rabu[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ap_rabu = get_sales_activity_after_plan_rabu[key][0];
				// console.log(get_sales_activity_before_plan_rabu[0][0])  


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
				var ba_update_rabu = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_actual_rabu'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_actual_rabu = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_rabu'));

							for (i = 0, len = get_sales_activity_before_actual_rabu.length; i < len; i++) {
								if (id == get_sales_activity_before_actual_rabu[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_actual_rabu = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_rabu'));

							var refreshOBj = currentObj.push(ba_update_rabu);
							
							window.localStorage.setItem('sales_activity_before_actual_rabu',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_actual_rabu',JSON.stringify([ba_update_rabu]));
				} 

				var get_sales_activity_before_actual_rabu = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_rabu'));

				for (var i = 0; i < get_sales_activity_before_actual_rabu.length; i++) {

					if (id == get_sales_activity_before_actual_rabu[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ba_rabu = get_sales_activity_before_actual_rabu[key][0];
				// console.log(get_sales_activity_before_plan_rabu[0][0])  


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
				var aa_update_rabu = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_actual_rabu'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_actual_rabu = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_rabu'));

							for (i = 0, len = get_sales_activity_after_actual_rabu.length; i < len; i++) {
								if (id == get_sales_activity_after_actual_rabu[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_actual_rabu = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_rabu'));

							var refreshOBj = currentObj.push(aa_update_rabu);
							
							window.localStorage.setItem('sales_activity_after_actual_rabu',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_actual_rabu',JSON.stringify([aa_update_rabu]));
				} 

				var get_sales_activity_after_actual_rabu = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_rabu'));

				for (var i = 0; i < get_sales_activity_after_actual_rabu.length; i++) {

					if (id == get_sales_activity_after_actual_rabu[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.aa_rabu = get_sales_activity_after_actual_rabu[key][0];
				// console.log(get_sales_activity_before_plan_rabu[0][0])  


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
				var bp_update_kamis = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_plan_kamis'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_plan_kamis = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_kamis'));

							for (i = 0, len = get_sales_activity_before_plan_kamis.length; i < len; i++) {
								if (id == get_sales_activity_before_plan_kamis[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_plan_kamis = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_kamis'));

							var refreshOBj = currentObj.push(bp_update_kamis);
							
							window.localStorage.setItem('sales_activity_before_plan_kamis',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_plan_kamis',JSON.stringify([bp_update_kamis]));
				} 

				var get_sales_activity_before_plan_kamis = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_kamis'));

				for (var i = 0; i < get_sales_activity_before_plan_kamis.length; i++) {

					if (id == get_sales_activity_before_plan_kamis[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.bp_kamis = get_sales_activity_before_plan_kamis[key][0];
				// console.log(get_sales_activity_before_plan_kamis[0][0])  


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
				var ap_update_kamis = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_plan_kamis'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_plan_kamis = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_kamis'));

							for (i = 0, len = get_sales_activity_after_plan_kamis.length; i < len; i++) {
								if (id == get_sales_activity_after_plan_kamis[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_plan_kamis = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_kamis'));

							var refreshOBj = currentObj.push(ap_update_kamis);
							
							window.localStorage.setItem('sales_activity_after_plan_kamis',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_plan_kamis',JSON.stringify([ap_update_kamis]));
				}

				var get_sales_activity_after_plan_kamis = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_kamis'));

				for (var i = 0; i < get_sales_activity_after_plan_kamis.length; i++) {

					if (id == get_sales_activity_after_plan_kamis[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ap_kamis = get_sales_activity_after_plan_kamis[key][0];
				// console.log(get_sales_activity_before_plan_kamis[0][0])  


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
				var ba_update_kamis = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_actual_kamis'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_actual_kamis = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_kamis'));

							for (i = 0, len = get_sales_activity_before_actual_kamis.length; i < len; i++) {
								if (id == get_sales_activity_before_actual_kamis[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_actual_kamis = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_kamis'));

							var refreshOBj = currentObj.push(ba_update_kamis);
							
							window.localStorage.setItem('sales_activity_before_actual_kamis',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_actual_kamis',JSON.stringify([ba_update_kamis]));
				} 

				var get_sales_activity_before_actual_kamis = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_kamis'));

				for (var i = 0; i < get_sales_activity_before_actual_kamis.length; i++) {

					if (id == get_sales_activity_before_actual_kamis[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ba_kamis = get_sales_activity_before_actual_kamis[key][0];
				// console.log(get_sales_activity_before_plan_kamis[0][0])  


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
				var aa_update_kamis = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_actual_kamis'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_actual_kamis = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_kamis'));

							for (i = 0, len = get_sales_activity_after_actual_kamis.length; i < len; i++) {
								if (id == get_sales_activity_after_actual_kamis[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_actual_kamis = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_kamis'));

							var refreshOBj = currentObj.push(aa_update_kamis);
							
							window.localStorage.setItem('sales_activity_after_actual_kamis',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_actual_kamis',JSON.stringify([aa_update_kamis]));
				} 

				var get_sales_activity_after_actual_kamis = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_kamis'));

				for (var i = 0; i < get_sales_activity_after_actual_kamis.length; i++) {

					if (id == get_sales_activity_after_actual_kamis[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.aa_kamis = get_sales_activity_after_actual_kamis[key][0];
				// console.log(get_sales_activity_before_plan_kamis[0][0])  


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
				var bp_update_jumat = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_plan_jumat'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_plan_jumat = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_jumat'));

							for (i = 0, len = get_sales_activity_before_plan_jumat.length; i < len; i++) {
								if (id == get_sales_activity_before_plan_jumat[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_plan_jumat = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_jumat'));

							var refreshOBj = currentObj.push(bp_update_jumat);
							
							window.localStorage.setItem('sales_activity_before_plan_jumat',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_plan_jumat',JSON.stringify([bp_update_jumat]));
				} 

				var get_sales_activity_before_plan_jumat = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_jumat'));

				for (var i = 0; i < get_sales_activity_before_plan_jumat.length; i++) {

					if (id == get_sales_activity_before_plan_jumat[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.bp_jumat = get_sales_activity_before_plan_jumat[key][0];
				// console.log(get_sales_activity_before_plan_jumat[0][0])  


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
				var ap_update_jumat = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_plan_jumat'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_plan_jumat = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_jumat'));

							for (i = 0, len = get_sales_activity_after_plan_jumat.length; i < len; i++) {
								if (id == get_sales_activity_after_plan_jumat[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_plan_jumat = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_jumat'));

							var refreshOBj = currentObj.push(ap_update_jumat);
							
							window.localStorage.setItem('sales_activity_after_plan_jumat',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_plan_jumat',JSON.stringify([ap_update_jumat]));
				} 

				var get_sales_activity_after_plan_jumat = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_jumat'));

				for (var i = 0; i < get_sales_activity_after_plan_jumat.length; i++) {

					if (id == get_sales_activity_after_plan_jumat[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ap_jumat = get_sales_activity_after_plan_jumat[key][0];
				// console.log(get_sales_activity_before_plan_jumat[0][0])  


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
				var ba_update_jumat = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_actual_jumat'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_actual_jumat = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_jumat'));

							for (i = 0, len = get_sales_activity_before_actual_jumat.length; i < len; i++) {
								if (id == get_sales_activity_before_actual_jumat[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_actual_jumat = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_jumat'));

							var refreshOBj = currentObj.push(ba_update_jumat);
							
							window.localStorage.setItem('sales_activity_before_actual_jumat',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_actual_jumat',JSON.stringify([ba_update_jumat]));
				} 

				var get_sales_activity_before_actual_jumat = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_jumat'));

				for (var i = 0; i < get_sales_activity_before_actual_jumat.length; i++) {

					if (id == get_sales_activity_before_actual_jumat[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ba_jumat = get_sales_activity_before_actual_jumat[key][0];
				// console.log(get_sales_activity_before_plan_jumat[0][0])  


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
				var aa_update_jumat = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_actual_jumat'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_actual_jumat = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_jumat'));

							for (i = 0, len = get_sales_activity_after_actual_jumat.length; i < len; i++) {
								if (id == get_sales_activity_after_actual_jumat[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_actual_jumat = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_jumat'));

							var refreshOBj = currentObj.push(aa_update_jumat);
							
							window.localStorage.setItem('sales_activity_after_actual_jumat',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_actual_jumat',JSON.stringify([aa_update_jumat]));
				} 

				var get_sales_activity_after_actual_jumat = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_jumat'));

				for (var i = 0; i < get_sales_activity_after_actual_jumat.length; i++) {

					if (id == get_sales_activity_after_actual_jumat[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.aa_jumat = get_sales_activity_after_actual_jumat[key][0];
				// console.log(get_sales_activity_before_plan_jumat[0][0])  


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
				var bp_update_sabtu = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_plan_sabtu'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_plan_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_sabtu'));

							for (i = 0, len = get_sales_activity_before_plan_sabtu.length; i < len; i++) {
								if (id == get_sales_activity_before_plan_sabtu[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_plan_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_sabtu'));

							var refreshOBj = currentObj.push(bp_update_sabtu);
							
							window.localStorage.setItem('sales_activity_before_plan_sabtu',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_plan_sabtu',JSON.stringify([bp_update_sabtu]));
				} 

				var get_sales_activity_before_plan_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_sabtu'));

				for (var i = 0; i < get_sales_activity_before_plan_sabtu.length; i++) {

					if (id == get_sales_activity_before_plan_sabtu[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.bp_sabtu = get_sales_activity_before_plan_sabtu[key][0];
				// console.log(get_sales_activity_before_plan_sabtu[0][0])  


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
				var ap_update_sabtu = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_plan_sabtu'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_plan_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_sabtu'));

							for (i = 0, len = get_sales_activity_after_plan_sabtu.length; i < len; i++) {
								if (id == get_sales_activity_after_plan_sabtu[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_plan_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_sabtu'));

							var refreshOBj = currentObj.push(ap_update_sabtu);
							
							window.localStorage.setItem('sales_activity_after_plan_sabtu',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_plan_sabtu',JSON.stringify([ap_update_sabtu]));
				} 

				var get_sales_activity_after_plan_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_sabtu'));

				for (var i = 0; i < get_sales_activity_after_plan_sabtu.length; i++) {

					if (id == get_sales_activity_after_plan_sabtu[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ap_sabtu = get_sales_activity_after_plan_sabtu[key][0];
				// console.log(get_sales_activity_before_plan_sabtu[0][0])  


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
				var ba_update_sabtu = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_actual_sabtu'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_actual_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_sabtu'));

							for (i = 0, len = get_sales_activity_before_actual_sabtu.length; i < len; i++) {
								if (id == get_sales_activity_before_actual_sabtu[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_actual_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_sabtu'));

							var refreshOBj = currentObj.push(ba_update_sabtu);
							
							window.localStorage.setItem('sales_activity_before_actual_sabtu',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_actual_sabtu',JSON.stringify([ba_update_sabtu]));
				} 

				var get_sales_activity_before_actual_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_sabtu'));

				for (var i = 0; i < get_sales_activity_before_actual_sabtu.length; i++) {

					if (id == get_sales_activity_before_actual_sabtu[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ba_sabtu = get_sales_activity_before_actual_sabtu[key][0];
				// console.log(get_sales_activity_before_plan_sabtu[0][0])  


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
				var aa_update_sabtu = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_actual_sabtu'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_actual_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_sabtu'));

							for (i = 0, len = get_sales_activity_after_actual_sabtu.length; i < len; i++) {
								if (id == get_sales_activity_after_actual_sabtu[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_actual_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_sabtu'));

							var refreshOBj = currentObj.push(aa_update_sabtu);
							
							window.localStorage.setItem('sales_activity_after_actual_sabtu',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_actual_sabtu',JSON.stringify([aa_update_sabtu]));
				} 

				var get_sales_activity_after_actual_sabtu = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_sabtu'));

				for (var i = 0; i < get_sales_activity_after_actual_sabtu.length; i++) {

					if (id == get_sales_activity_after_actual_sabtu[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.aa_sabtu = get_sales_activity_after_actual_sabtu[key][0];
				// console.log(get_sales_activity_before_plan_sabtu[0][0])  


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
				var bp_update_ahad = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_plan_ahad'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_plan_ahad = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_ahad'));

							for (i = 0, len = get_sales_activity_before_plan_ahad.length; i < len; i++) {
								if (id == get_sales_activity_before_plan_ahad[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_plan_ahad = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_ahad'));

							var refreshOBj = currentObj.push(bp_update_ahad);
							
							window.localStorage.setItem('sales_activity_before_plan_ahad',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_plan_ahad',JSON.stringify([bp_update_ahad]));
				} 

				var get_sales_activity_before_plan_ahad = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_ahad'));

				for (var i = 0; i < get_sales_activity_before_plan_ahad.length; i++) {

					if (id == get_sales_activity_before_plan_ahad[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.bp_ahad = get_sales_activity_before_plan_ahad[key][0];
				// console.log(get_sales_activity_before_plan_ahad[0][0])  


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
				var ap_update_ahad = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_plan_ahad'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_plan_ahad = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_ahad'));

							for (i = 0, len = get_sales_activity_after_plan_ahad.length; i < len; i++) {
								if (id == get_sales_activity_after_plan_ahad[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_plan_ahad = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_ahad'));

							var refreshOBj = currentObj.push(ap_update_ahad);
							
							window.localStorage.setItem('sales_activity_after_plan_ahad',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_plan_ahad',JSON.stringify([ap_update_ahad]));
				} 

				var get_sales_activity_after_plan_ahad = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_ahad'));

				for (var i = 0; i < get_sales_activity_after_plan_ahad.length; i++) {

					if (id == get_sales_activity_after_plan_ahad[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ap_ahad = get_sales_activity_after_plan_ahad[key][0];
				// console.log(get_sales_activity_before_plan_ahad[0][0])  


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
				var ba_update_ahad = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_before_actual_ahad'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_before_actual_ahad = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_ahad'));

							for (i = 0, len = get_sales_activity_before_actual_ahad.length; i < len; i++) {
								if (id == get_sales_activity_before_actual_ahad[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_before_actual_ahad = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_ahad'));

							var refreshOBj = currentObj.push(ba_update_ahad);
							
							window.localStorage.setItem('sales_activity_before_actual_ahad',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_before_actual_ahad',JSON.stringify([ba_update_ahad]));
				} 

				var get_sales_activity_before_actual_ahad = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_ahad'));

				for (var i = 0; i < get_sales_activity_before_actual_ahad.length; i++) {

					if (id == get_sales_activity_before_actual_ahad[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.ba_ahad = get_sales_activity_before_actual_ahad[key][0];
				// console.log(get_sales_activity_before_plan_ahad[0][0])  


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
				var aa_update_ahad = response.data['Result'];
				
				var current = window.localStorage.getItem('sales_activity_after_actual_ahad'); //string


				var currentObj = JSON.parse(current); //object
				
				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}
					else{
						ada = false
						//append new object
						var get_sales_activity_after_actual_ahad = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_ahad'));

							for (i = 0, len = get_sales_activity_after_actual_ahad.length; i < len; i++) {
								if (id == get_sales_activity_after_actual_ahad[i][0].activity_id[0]){
									ada=true
								}

							};
								if (ada){
									console.log('id sama')
								}
								else {
							var get_sales_activity_after_actual_ahad = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_ahad'));

							var refreshOBj = currentObj.push(aa_update_ahad);
							
							window.localStorage.setItem('sales_activity_after_actual_ahad',JSON.stringify(currentObj));

								}
			
					}
				}

				else{

					window.localStorage.setItem('sales_activity_after_actual_ahad',JSON.stringify([aa_update_ahad]));
				} 

				var get_sales_activity_after_actual_ahad = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_ahad'));

				for (var i = 0; i < get_sales_activity_after_actual_ahad.length; i++) {

					if (id == get_sales_activity_after_actual_ahad[i][0].activity_id[0]){
						var key = i
						
					}

				};

				$scope.aa_ahad = get_sales_activity_after_actual_ahad[key][0];
				// console.log(get_sales_activity_before_plan_ahad[0][0])  


			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)		
	}
	},2000);
})

// .controller('formreviewactivityCtrl', function($scope,$stateParams) {

//     var idx = $stateParams.idsact;
//     console.log(idx)
//     var get_sales_data_activity = JSON.parse( window.localStorage.getItem( 'sales_data_activity' ));
//     console.log(get_sales_data_activity)

//     function getItemById(ambilsales, id) {

//     var i, len;
//     for (i = 0, len = get_sales_data_activity.length; i < len; i += 1) {
//         if(id == get_sales_data_activity[i].id) {
//             return get_sales_data_activity[i];
//         }
//     }
 
//     return null;
//     }

//     result = getItemById(get_sales_data_activity, idx);
//     console.log(result)
//     $scope.sales = result;

// })

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


.controller('salesactivitytimelineCtrl', function($scope,$http,$state,$ionicLoading,$window) {
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	var timeline =JSON.parse(window.localStorage.getItem("sales_tm"));
	$scope.numberOfItemsToDisplay = 5;
	$scope.loadMore = function () {
		  $scope.numberOfItemsToDisplay += 5;  
		};
	$scope.loadMore();
	$scope.colortext= {
        "color" : "red",
        
    }
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
					console.log (['data'])
					$scope.sales_tm = response.data['data']

					var sales_tm = response.data['data'];
					
					window.localStorage.setItem( 'sales_tm', JSON.stringify(sales_tm));
					 $ionicLoading.hide();
	   
				},
				function errorCallback(response){
					$ionicLoading.hide();
					console.log('erroor data kosong 1');
					$window.localStorage.clear();
					
					// $state.go('menulogin');
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
					$ionicLoading.hide();
					console.log('erroor data kosong 2');
					$window.localStorage.clear();
					// $state.go('menulogin');
			
				}
			)
		
		var timeline =JSON.parse(window.localStorage.getItem("sales_tm"));
		$scope.sales_tm = timeline

		// $scope.addMoreItem = function(done) {
        
  //       // if ($scope.sales_tm > $scope.numberOfItemsToDisplay)
  //         $scope.numberOfItemsToDisplay = 50; // load 5 more items
  //       // done(); // need to call this when finish loading more data
  //     }
	}
	
})

.controller('salestimeline2Ctrl', function($scope,$http,$state,$ionicLoading,$window,$filter,$ionicPopup) {
	var timeline = JSON.parse(window.localStorage.getItem("timeline2")); //data to fetch in view
	var reloadSalesTm =function(data){
		console.log('called')
		$scope.sales_tm = data
	}
	var updateSalesTm=function(data){
		for (var i = 0; i < data.length; i++) {
			$scope.sales_tm.push(data[i])
		};
	}
	var today = new Date()
	var yesterday = new Date()
	yesterday.setDate(yesterday.getDate()-1);
	today = $filter('date')(today, "yyyy-MM-dd");
	yesterday = $filter('date')(yesterday, "yyyy-MM-dd");
	console.log(today,yesterday)
	$scope.date = new Date();

	
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	

	$scope.limit = 20;
	// console.log(timeline,"datanya")
	var limit_data = 0
	var offset_data = -20
	$scope.loadMore = function () {

		$scope.limit += 20; 
		console.log($scope.sales_tm,"ooooooooo")
		console.log($scope.limit,$scope.sales_tm.length) 

		if ($scope.limit >= $scope.sales_tm.length ){
			// alert("data habis")
			limit_data+=20
			offset_data+=20
				$http
				  	(
						{
							method: 'POST',
							url: 'http://10.36.15.51:8000/openerp/salestimeline/GetUpdate/',
							data: {
									'usn':name,
									'pw':pass,
									"params":{
										// "fields":'*',
										// "table":"sales_activity_plan",
										// 'AndOr':[],
										'condition':{"the_date__lt":'2015-11-05'},
										"limit":limit_data,
										'offset':offset_data,
										// "order":"order by year_p DESC, week_no DESC, dow DESC, user_id, daylight, not_planned_actual"
									}
							},
							headers: {
								'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
							  
							},
							
						
						}
						).then(
							function successCallback(response){
								console.log('success isi storage kosong dari server');
								console.log(response)
								window.localStorage.setItem('timeline2',JSON.stringify(response.data.data))
								updateSalesTm(response.data.data)

								$ionicLoading.hide();
							},
							function errorCallback(response){
								$ionicLoading.hide();
								console.log(response)

								console.log('erroor data kosong');
						
							}
						)
							

			}

	};
	// $scope.loadMore();
	$scope.colortext= {
        "color" : "red",
        
    }
	$ionicLoading.show(
		{
		    content: 'Loading',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 200,
		    showDelay: 0
  		}
  	);


  	$http
  	(
		{
			method: 'POST',
			url: 'http://10.36.15.51:8000/openerp/salestimeline/AllData/',
			data: {
					'usn':name,
					'pw':pass,
					"params":{
						// "fields":'*',
						// "table":"sales_activity_plan",
						// 'AndOr':[],
						'condition':{"the_date":['2015-11-05','2015-11-06']},
						// "limit":100,
						// 'offset':0,
						// "order":"order by year_p DESC, week_no DESC, dow DESC, user_id, daylight, not_planned_actual"
					}
			},
			headers: {
				'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
			  
			},
			
		
		}
	).then(
		function successCallback(response){
			console.log('success isi storage kosong dari server');
			console.log(response)
			window.localStorage.setItem('timeline2',JSON.stringify(response.data.data))
			reloadSalesTm(response.data.data)

			$ionicLoading.hide();
		},
		function errorCallback(response){
			$ionicLoading.hide();
			console.log(response)

			console.log('erroor data kosong');
	
		}
	)

	reloadSalesTm(timeline)
})

.controller('salestimelineCtrl', function($scope,$http,$state,$ionicLoading,$window,$filter,$ionicPopup) {
	$scope.date = new Date();
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	var timeline =JSON.parse(window.localStorage.getItem("sales_tm"));
	$scope.numberOfItemsToDisplay = 200;
	// console.log(timeline,"datanya")
	$scope.loadMore = function () {
		  $scope.numberOfItemsToDisplay += 20;  
		};
	$scope.loadMore();
	$scope.colortext= {
        "color" : "red",
        
    }
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
					$ionicLoading.hide();
					console.log('erroor data kosong 1');
					// $window.localStorage.clear();
					
					// $state.go('menulogin');
				}
			)

	}
	else{
		// console.log(timeline[0].daylight_num)

		console.log(timeline[0].daylight_num)
		myJson = timeline.filter(function(jsonObject) {
    				return jsonObject.the_date === "2015-12-11";
						});
		timeline = timeline.filter(function(jsonObject) {
    				return jsonObject.the_date !== "2015-12-11";
						});
		window.localStorage.setItem( 'sales_tm', JSON.stringify(timeline));
		window.localStorage.setItem('sales_tm_sementara', JSON.stringify(myJson));
		
		// console.log(myJson)
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
					$ionicLoading.hide();
					var timeline_sementara =JSON.parse(window.localStorage.getItem("sales_tm_sementara"));
					timeline_sementara.reverse()
					$ionicPopup.alert({
							title:"Errorrr",
							template:"Ada kesalahan di koneksi"
						});
					for (index =0 ; index < timeline_sementara.length; index++) {
						timeline.unshift(timeline_sementara[index])
				
						window.localStorage.setItem( 'sales_tm', JSON.stringify(timeline));
						
					
						
						}
					var Update_timeline =JSON.parse(window.localStorage.getItem("sales_tm"));
				
					$scope.sales_tm = Update_timeline
			
					console.log('erroor data kosong',timeline_sementara);

					// $window.localStorage.clear();
					// $state.go('menulogin');
			
				}
			)
		
		var timeline =JSON.parse(window.localStorage.getItem("sales_tm"));
		$scope.sales_tm = timeline

	
	}

})