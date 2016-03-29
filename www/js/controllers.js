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
				console.log('success tembak server');
				
				var sda_update = response.data['Result']
				console.log(sda_update.length,"dafaadaf")
				
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
				console.log('erroor tembak server');
				$window.localStorage.clear();
				$state.go('menulogin');
			}
		) 
	 
	 }    
})
   
.controller('formactivityCtrl', function($scope) {

})
   
.controller('previewplanactivityCtrl', function($scope,$stateParams,$http) {

	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;

	var id = $stateParams.id;
	var get_sales_data_activity = JSON.parse( window.localStorage.getItem( 'sales_data_activity' ));

	function getItemById(get_sales_data_activity, id) {

	var i, len;
	for (i = 0, len = get_sales_data_activity.length; i < len; i += 1) {
		if(id == get_sales_data_activity[i].id) {
			return get_sales_data_activity[i];
		}
	}
 
	return null;
	}

	get_sales_by_id = getItemById(get_sales_data_activity, id); // ngambil data dari local storage by id
	beforeplansenin_id = get_sales_by_id.beforeplansenin;
	beforeplanselasa_id = get_sales_by_id.beforeplanselasa;
	beforeplanrabu_id = get_sales_by_id.beforeplanrabu;
	beforeplankamis_id = get_sales_by_id.beforeplankamis;
	beforeplanjumat_id = get_sales_by_id.beforeplanjumat;

	
	if(!id){
		alert('Not Found');

	}
	else{
		
		$http(
			{
				method: 'POST',
				url: 'http://10.36.15.51:8000/openerp/before.plan.senin/ids/',
				data: {'usn':name,'pw':pass ,'ids':beforeplansenin_id,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},
			
			}
		).then(
			function successCallback(response){
				// console.log('success beforeplansenin');
				var bp_update_senin = response.data['Result'];

				var current = window.localStorage.getItem('sales_activity_before_plan_senin'); //string
				var currentObj = JSON.parse(current); //object

				if(current!=null){
					if(currentObj.length>=100){
						// jika current storage sudah 100

					}else{
						//append new object

						var get_sales_activity_before_plan_senin = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_senin'));
						console.log(get_sales_activity_before_plan_senin)
						for (i = 0, len = get_sales_activity_before_plan_senin.length; i < len; i++){
							// console.log(get_sales_activity_before_plan_senin[i],"lllllllllllllllllllll")
							ini_ada = false

							console.log("loop")
							if (get_sales_activity_before_plan_senin[i].id==beforeplansenin_id[0]){
								ini_ada = true
								console.log("masuk gak")
								}

							if (!ini_ada){
								
								var refreshOBj = currentObj.push();
								console.log("masuk set",refreshOBj)
								console.log(currentObj,"////////")
								window.localStorage.setItem('sales_activity_before_plan_senin',JSON.stringify(currentObj));
							}
							else{
								console.log("gak kebaca bos")
							}
						}

					}
				}
				else{
					console.log("aaaaaaaaaaaaaaaaa")
					window.localStorage.setItem('sales_activity_before_plan_senin',JSON.stringify([bp_update_senin[0]]));
				} 
				// var idnya =0
				var get_sales_activity_before_plan_senin = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_senin'));
				// console.log(get_sales_activity_before_plan_senin,"<<<<<<<<")
				for (var i = 0; i < get_sales_activity_before_plan_senin.length; i++) {
					// console.log(get_sales_activity_before_plan_senin[i].id,"?????")

					if (get_sales_activity_before_plan_senin[i].id==beforeplansenin_id[0]){
						var idnya = i
						
					}

				};
				// console.log(idnya)
				$scope.bp_senin = get_sales_activity_before_plan_senin[idnya]; 
				console.log($scope.bp_senin) 


			},
			function errorCallback(response){
				console.log('erroor data kosong');
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)
		
		// $http(
		// 	{
		// 		method: 'POST',
		// 		url: 'http://10.36.15.51:8000/openerp/before.plan.selasa/ids/',
		// 		data: {'usn':name,'pw':pass ,'ids':beforeplanselasa_id,'fields':[]},
		// 		headers: {
		// 			'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
		// 		},
			
		// 	}
		// ).then(
		// 	function successCallback(response){
		// 		console.log('success beforeplanselasa');
		// 		var bp_update_selasa = response.data['Result'];
		// 		var current = window.localStorage.getItem('sales_activity_before_plan_selasa'); //string


		// 		var currentObj = JSON.parse(current); //object
		// 		if(current){
		// 			if(currentObj.length>=100){
		// 				// jika current storage sudah 100

		// 			}else{
		// 				//append new object
		// 				// for (i = 0, len = bp_update_senin.length; i < len; i++){

		// 					var refreshOBj = currentObj.push(bp_update_selasa);
							
		// 					window.localStorage.setItem('sales_activity_before_plan_selasa',JSON.stringify(currentObj));
		// 				// }

		// 			}
		// 		}
		// 		else{

		// 			window.localStorage.setItem('sales_activity_before_plan_selasa',JSON.stringify([bp_update_selasa]));
		// 		} 

		// 		var get_sales_activity_before_plan_selasa = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_selasa'));

		// 		$scope.bp_selasa = get_sales_activity_before_plan_selasa;  


		// 	},
		// 	function errorCallback(response){
		// 		console.log('erroor data kosong');
		// 		// $window.localStorage.clear();
		// 		// $state.go('formreviewactivity');
		// 	}
		// )
		
		// $http(
		// 	{
		// 		method: 'POST',
		// 		url: 'http://10.36.15.51:8000/openerp/before.plan.rabu/ids/',
		// 		data: {'usn':name,'pw':pass ,'ids':beforeplanrabu_id,'fields':[]},
		// 		headers: {
		// 			'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
		// 		},
			
		// 	}
		// ).then(
		// 	function successCallback(response){
		// 		console.log('success beforeplanrabu');
		// 		var bp_update_rabu = response.data['Result'];
		// 		var current = window.localStorage.getItem('sales_activity_before_plan_rabu'); //string


		// 		var currentObj = JSON.parse(current); //object
		// 		if(current){
		// 			if(currentObj.length>=100){
		// 				// jika current storage sudah 100

		// 			}else{
		// 				//append new object
		// 				// for (i = 0, len = bp_update_senin.length; i < len; i++){

		// 					var refreshOBj = currentObj.push(bp_update_rabu);
							
		// 					window.localStorage.setItem('sales_activity_before_plan_rabu',JSON.stringify(currentObj));
		// 				// }

		// 			}
		// 		}
		// 		else{

		// 			window.localStorage.setItem('sales_activity_before_plan_rabu',JSON.stringify([bp_update_rabu]));
		// 		} 

		// 		var get_sales_activity_before_plan_rabu = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_rabu'));

		// 		$scope.bp_rabu = get_sales_activity_before_plan_rabu;  


		// 	},
		// 	function errorCallback(response){
		// 		console.log('erroor data kosong');
		// 		// $window.localStorage.clear();
		// 		// $state.go('formreviewactivity');
		// 	}
		// )
		
		// $http(
		// 	{
		// 		method: 'POST',
		// 		url: 'http://10.36.15.51:8000/openerp/before.plan.kamis/ids/',
		// 		data: {'usn':name,'pw':pass ,'ids':beforeplankamis_id,'fields':[]},
		// 		headers: {
		// 			'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
		// 		},
			
		// 	}
		// ).then(
		// 	function successCallback(response){
		// 		console.log('success beforeplankamis');
		// 		var bp_update_kamis = response.data['Result'];
		// 		var current = window.localStorage.getItem('sales_activity_before_plan_kamis'); //string


		// 		var currentObj = JSON.parse(current); //object
		// 		if(current){
		// 			if(currentObj.length>=100){
		// 				// jika current storage sudah 100

		// 			}else{
		// 				//append new object
		// 				// for (i = 0, len = bp_update_senin.length; i < len; i++){

		// 					var refreshOBj = currentObj.push(bp_update_kamis);
							
		// 					window.localStorage.setItem('sales_activity_before_plan_kamis',JSON.stringify(currentObj));
		// 				// }

		// 			}
		// 		}
		// 		else{

		// 			window.localStorage.setItem('sales_activity_before_plan_kamis',JSON.stringify([bp_update_kamis]));
		// 		} 

		// 		var get_sales_activity_before_plan_kamis = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_kamis'));

		// 		$scope.bp_kamis = get_sales_activity_before_plan_kamis;  


		// 	},
		// 	function errorCallback(response){
		// 		console.log('erroor data kosong');
		// 		// $window.localStorage.clear();
		// 		// $state.go('formreviewactivity');
		// 	}
		// )
		
		// $http(
		// 	{
		// 		method: 'POST',
		// 		url: 'http://10.36.15.51:8000/openerp/before.plan.jumat/ids/',
		// 		data: {'usn':name,'pw':pass ,'ids':beforeplanjumat_id,'fields':[]},
		// 		headers: {
		// 			'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
		// 		},
			
		// 	}
		// ).then(
		// 	function successCallback(response){
		// 		console.log('success beforeplanjumat');
		// 		var bp_update_jumat = response.data['Result'];
		// 		var current = window.localStorage.getItem('sales_activity_before_plan_jumat'); //string


		// 		var currentObj = JSON.parse(current); //object
		// 		if(current){
		// 			if(currentObj.length>=100){
		// 				// jika current storage sudah 100

		// 			}else{
		// 				//append new object
		// 				// for (i = 0, len = bp_update_senin.length; i < len; i++){

		// 					var refreshOBj = currentObj.push(bp_update_jumat);
							
		// 					window.localStorage.setItem('sales_activity_before_plan_jumat',JSON.stringify(currentObj));
		// 				// }

		// 			}
		// 		}
		// 		else{

		// 			window.localStorage.setItem('sales_activity_before_plan_jumat',JSON.stringify([bp_update_jumat]));
		// 		} 

		// 		var get_sales_activity_before_plan_jumat = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_jumat'));

		// 		$scope.bp_jumat = get_sales_activity_before_plan_jumat;  


		// 	},
		// 	function errorCallback(response){
		// 		console.log('erroor data kosong');
		// 		// $window.localStorage.clear();
		// 		// $state.go('formreviewactivity');
		// 	}
		// )

	
	}

	
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
