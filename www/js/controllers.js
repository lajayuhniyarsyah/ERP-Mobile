angular.module('app.controllers', ['ngMaterial'])

// angular.module('app.controllers', ['ngMaterial'])

// .config(function( $mdGestureProvider ) {
//   $mdGestureProvider.skipClickHijack();
// })
  
.controller('menuutamaCtrl', function($scope,$http,$state,config,$ionicSideMenuDelegate) {
	$scope.toggleLeft = function() {
      $ionicSideMenuDelegate.toggleLeft();
    }; 

	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	
	if (name!=null && pass!=null){
		$http(
				{
					method: 'POST',
					url: 'http://'+config['host']+':'+config['port']+'/openerp/res.users/search/',
					data: {'usn':name,
						   'pw':pass,
						   'domain':[['login','ilike',atob(name)]] ,
						   'fields':['display_name','email']},

					headers: {
						'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
					  
					},
				
				}
			).then(
				function successCallback(response){
					console.log('success isi storage kosong dari server');
					$scope.name = response.data['Result'][0].display_name
					var login_username = response.data['Result'][0].display_name
					var login_userid = response.data['Result'][0].id
					$scope.email = response.data['Result'][0].email
				
					window.localStorage.setItem('login_user',JSON.stringify([login_username,login_userid]));
	   
				},
				function errorCallback(response){
					console.log('Data login kosong');
					$state.go('menulogin');
				}
			)
	}
	else{
		$state.go('menulogin');
	}
})
   
.controller('menuloginCtrl', function($scope,config, LoginService, $ionicPopup, $state, $http, $httpParamSerializerJQLike,config) {
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
		
		});
	}
	$scope.login = function() {
		LoginService.loginUser(window.btoa($scope.data.username),window.btoa($scope.data.pass)).success(function(data) {
			$state.go('menuutama');

			window.localStorage.setItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd",window.btoa($scope.data.username))
			window.localStorage.setItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug",window.btoa($scope.data.pass))
		  
		}).error(function(data) {
			
		});
	}
	$scope.test_service = function() {
		$ionicPopup.alert({
			title:"Errorrr",
			template:"testttt dulu bos"
		});

	}
})   
.controller('submenusalesCtrl', function($scope,config) {
		$scope.toggleLeft = function() {
	      $ionicSideMenuDelegate.toggleLeft();
	    };
})
   
.controller('menuactivityCtrl', function($scope,config) {
		$scope.toggleLeft = function() {
	      $ionicSideMenuDelegate.toggleLeft();
	    };
})
   
.controller('salesactivityCtrl', function($scope,$http,$state,$ionicLoading,$window,config) {
   
	  $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });

	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	var sales_data_activity = (window.localStorage.getItem('sales_data_activity'));


	 if (sales_data_activity==null) {
			
		$http(
				{
					method: 'POST',
					url: 'http://'+config['host']+':'+config['port']+'/openerp/sales.activity/',
					data: {'usn':name,'pw':pass , 'fields':[]},

					headers: {
						'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",  
					},
				}
			).then(
				function successCallback(response){
					console.log('success isi storage kosong dari server');
					
					$scope.sda = response.data['Result']
					$ionicLoading.hide();
					var sda = response.data['Result'];

					window.localStorage.setItem( 'sales_data_activity', JSON.stringify(sda));	   
				},
				function errorCallback(response){
					$ionicLoading.hide();
					console.log('erroor data kosong');
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/sales.activity/getupdate/',
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
					
					if(currentObj.length>100){
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
				var get_sales_data_activity = JSON.parse(window.localStorage.getItem('sales_data_activity'));

				$scope.sda = get_sales_data_activity;
				$ionicLoading.hide();
			},
			function errorCallback(response){
				$ionicLoading.hide();
				console.log('gagal cek update dari server');
				$window.localStorage.clear();
				$state.go('menulogin');
			}
		) 
	 
	 }

	 $scope.updatedata = function () {
		get_sales_data_activity = JSON.parse( window.localStorage.getItem('sales_data_activity'));
		data_login = JSON.parse( window.localStorage.getItem('login_user'));
		tes = get_sales_data_activity.filter(function(jsonObject){
			return jsonObject.user_id[0] === data_login[1]
		}) 	
		for (i=0; i < 5; i++ ){
			if (new Date >= new Date (tes[i]['begin']) && new Date <= new Date (tes[i]['end']) ){
				var activity_id_update = tes[i]['id'];
				window.localStorage.setItem('activity_id_update',JSON.stringify([activity_id_update]));
				$state.go('formupdateactivity')
			}
		}
		// else {
		// 	alert('Tidak ada rencana aktivitas untuk hari ini')
		// 	// console.log(tes[0]['id'],"eksperimen kami")
		// }
	 } 
})
   
.controller('formactivityCtrl', function($scope,$http,$state,$filter,config) {
	 

	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;

	var getLs = function(key){
		return JSON.parse(window.localStorage.getItem(key));
	}
	// var temp_current_data = JSON.parse(window.localStorage.getItem('temporary_data_create_plan'));
	var temp_current_data = getLs('temporary_data_create_plan');
	var data_login = getLs('login_user');

	var setLs =function(key,val){
		// console.log('call setLs key',key); // console.log('call setLs val',val);
		window.localStorage.setItem(key, JSON.stringify(val)); //set
		
		//refresh
		temp_current_data = getLs(key);
		// console.log('Temp Updated')
	}
	
	var create_pic = temp_current_data

	if(!temp_current_data){
		// preparation
		create_pic = {
			'pic' : data_login[0],
			'id_user' : data_login[1],
			'monday_before':[],
			'monday_after':[],
			'tuesday_before':[],
			'tuesday_after':[],
			'wednesday_before':[],
	 		'wednesday_after':[],
			'thursday_before':[],
			'thursday_after':[],
			'friday_before':[],
			'friday_after':[],
		};

		setLs('temporary_data_create_plan',[create_pic])
	}
	//nama user yang akan dikirim ke view
	$scope.user = data_login[0];

	// setting date
    $scope.dates = {};
    $scope.minDate = new Date();
    $scope.onlyWeekendsPredicate = function(date) {
       var day = date.getDay();
       return day === 1; }
	
	$scope.datechange = function() {

	temp_current_data = getLs('temporary_data_create_plan')

	   var begindate = new Date(
	      $scope.dates.myDate.getFullYear(),
	      $scope.dates.myDate.getMonth(),
	      $scope.dates.myDate.getDate());
	   var enddate = new Date(
	      $scope.dates.myDate.getFullYear(),
	      $scope.dates.myDate.getMonth(),
	      $scope.dates.myDate.getDate()+6);
		  $scope.beginDate = $filter('date')(begindate,"yyyy-MM-dd");
		  $scope.endDate = $filter('date')(enddate,"yyyy-MM-dd");

	$http(
			{
				method: 'POST',
				url: 'http://'+config['host']+':'+config['port']+'/openerp/sales.activity/search/',
				data: {
					'domain':[
								['user_id','=',temp_current_data[0].pic],
								['begin','=',$scope.beginDate],
								['end','=',$scope.endDate],
							],
					'usn':name,'pw':pass,'fields':['begin']},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",

				},
			}
		).then(
			function successCallback(response){
				
				if (!response.data['Result'][0]){
			
				 //tambah field
				 temp_current_data[0]['begin']=$scope.beginDate;
				 temp_current_data[0]['end']=$scope.endDate;

				 // window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
				 setLs('temporary_data_create_plan',temp_current_data)
				}
				else{
					alert('Aktivitas untuk tanggal ini telah dibuat, silahkan ganti dengan tanggal yang lain')
					
				}
			},
			function errorCallback(response){
				alert("Jaringan anda tidak tersedia")
			}
	)		 

	};

	$scope.previewData = function() {
		console.log('clicked')
		temp_current_data = getLs('temporary_data_create_plan')
		// validasi
		if (temp_current_data[0].begin==null){
			window.alert('Tanggal Belum Diisi')
		}
		else if (temp_current_data[0]['monday_before'].length == 0 || temp_current_data[0]['monday_after'].length == 0) {
			alert("Form Monday Belum Diisi")
		}
		else if (temp_current_data[0]['tuesday_before'].length == 0 || temp_current_data[0]['tuesday_after'].length == 0){
			window.alert('Form Tuesday Belum Diisi')
		}
		else if (temp_current_data[0]['wednesday_before'].length == 0 || temp_current_data[0]['wednesday_after'].length == 0){
			window.alert('Form Wednesday Belum Diisi')
		}
		else if (temp_current_data[0]['thursday_before'].length == 0 || temp_current_data[0]['thursday_after'].length == 0){
			window.alert('Form Thusrday Belum Diisi')
		}
		else if (temp_current_data[0]['friday_before'].length == 0 || temp_current_data[0]['friday_after'].length == 0){
			window.alert('Form Friday Belum Diisi')
		}
		else {
			
			window.alert('Data telah lengkap')
			$state.go('previewcreateplan')
		}			
	}
})

.controller('previewplanactivityCtrl', function($scope,$stateParams,$state,$http,$timeout,$ionicLoading,config) {

    $scope.pic = $stateParams.pic;
    $scope.begin = $stateParams.begin;
    $scope.end = $stateParams.end; 
	
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	var id = $stateParams.id;
	
	var current_local = JSON.parse(window.localStorage.getItem('current_activity_id'));
	// console.log(current_local)

	if(current_local==null){

	 $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });

	$http(
			{
				method: 'POST',
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.senin/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
				console.log('sukses isi storage kosong before plan senin dari server')
				$scope.bp_senin = response.data['Result'];
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.senin/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.senin/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.senin/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.selasa/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.selasa/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.selasa/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.selasa/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.rabu/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.rabu/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.rabu/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.rabu/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.kamis/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.kamis/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.kamis/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.kamis/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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

				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.jumat/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.jumat/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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

				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.jumat/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.jumat/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.sabtu/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.sabtu/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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

				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.sabtu/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.sabtu/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.ahad/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.ahad/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.ahad/search/',
				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
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
				url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.ahad/search/',

				data: {
					'domain':[
								['activity_id','=',parseInt(id)],
							],
					'usn':name,'pw':pass ,'fields':[]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){

				console.log('sukses isi storage kosong after actual ahad dari server')
				$scope.aa_ahad = response.data['Result'];
				var aa_update_ahad = response.data['Result'];
				$ionicLoading.hide();

				window.localStorage.setItem( 'sales_activity_after_actual_ahad', JSON.stringify(aa_update_ahad));
			},
			function errorCallback(response){
				console.log('erroor data kosong');
				$ionicLoading.hide();
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)

		window.localStorage.setItem('current_activity_id',JSON.stringify([id]));
		// $ionicLoading.hide();
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

	 $ionicLoading.show({
	    content: 'Loading',
	    animation: 'fade-in',
	    showBackdrop: true,
	    maxWidth: 200,
	    showDelay: 0
	  });

			current_id.push(id);
			window.localStorage.setItem('current_activity_id',JSON.stringify(current_id));
			
			$http(
					{
						method: 'POST',
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.senin/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.senin/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.senin/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.senin/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.selasa/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.selasa/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.selasa/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.selasa/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.rabu/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.rabu/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.rabu/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.rabu/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.kamis/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.kamis/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.kamis/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.kamis/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.jumat/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.jumat/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.jumat/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.jumat/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.sabtu/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.sabtu/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.sabtu/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.sabtu/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.plan.ahad/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.plan.ahad/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.ahad/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.ahad/search/',
						data: {
							'domain':[
										['activity_id','=',parseInt(id)],
									],
							'usn':name,'pw':pass ,'fields':[]},
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
						$ionicLoading.hide();
						window.localStorage.setItem('sales_activity_after_actual_ahad',JSON.stringify(currentObj));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						$ionicLoading.hide();
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)
				// $ionicLoading.hide();
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

			var get_sales_activity_before_plan_ahad = JSON.parse(window.localStorage.getItem('sales_activity_before_plan_ahad'));

			for (var i = 0; i < get_sales_activity_before_plan_ahad.length; i++) {

				if (idx == get_sales_activity_before_plan_ahad[i].activity_id[0]){
					bpahad.push(get_sales_activity_before_plan_ahad[i])
				}
			};
			 
			$scope.bp_ahad = bpahad;	

			var get_sales_activity_after_plan_ahad = JSON.parse(window.localStorage.getItem('sales_activity_after_plan_ahad'));

			for (var i = 0; i < get_sales_activity_after_plan_ahad.length; i++) {

				if (idx == get_sales_activity_after_plan_ahad[i].activity_id[0]){
					apahad.push(get_sales_activity_after_plan_ahad[i])
				}
			};
			 
			$scope.ap_ahad = apahad;

			var get_sales_activity_before_actual_ahad = JSON.parse(window.localStorage.getItem('sales_activity_before_actual_ahad'));

			for (var i = 0; i < get_sales_activity_before_actual_ahad.length; i++) {

				if (idx == get_sales_activity_before_actual_ahad[i].activity_id[0]){
					baahad.push(get_sales_activity_before_actual_ahad[i])
				}
			};
			 
			$scope.ba_ahad = baahad;	

			var get_sales_activity_after_actual_ahad = JSON.parse(window.localStorage.getItem('sales_activity_after_actual_ahad'));

			for (var i = 0; i < get_sales_activity_after_actual_ahad.length; i++) {

				if (idx == get_sales_activity_after_actual_ahad[i].activity_id[0]){
					aaahad.push(get_sales_activity_after_actual_ahad[i])
				}
			};
			 
			$scope.aa_ahad = aaahad;
	}
})

.controller('formupdateactivityCtrl', function($scope,$stateParams,$state,$http,config) {
		
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd"));
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug"));

	id_activity_update = JSON.parse( window.localStorage.getItem('activity_id_update')); // ambil activity id yanga akan diupdate
	data_login = JSON.parse( window.localStorage.getItem('login_user'));
	
	$scope.username_update = data_login[0];
	
	//fungsi untuk mencari hari
	var day = ['ahad','senin','selasa','rabu','kamis','jumat','sabtu'];
	var date_current = new Date();
	$scope.date_cur = date_current;
	var get_day = day[date_current.getDay()];

		//ambil data dari before_actual yang akan di update
			$http(
				{
					method: 'POST',
					url: 'http://'+config['host']+':'+config['port']+'/openerp/before.actual.'+get_day+'/search/',
					data: {'usn':name,'pw':pass , 
						   'fields':[],
						   'domain':[
										['activity_id','=',id_activity_update],
									],
						},

					headers: {
						'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
					  
					},
				}
			).then(
				function successCallback(response){

					$scope.beforeupdateid = response.data['Result'];	
					// window.localStorage.setItem( 'beforeupdateid', JSON.stringify(beforeupdateid));	   
				},
				function errorCallback(response){

					console.log('erroor data kosong');
					// $window.localStorage.clear();
					// $state.go('formreviewactivity');
				}
			)
		
		//ambil data dari after_actual yang akan di update			
			$http(
					{
						method: 'POST',

						url: 'http://'+config['host']+':'+config['port']+'/openerp/after.actual.'+get_day+'/search/',
						data: {
							'usn':name,'pw':pass , 
							'fields':[],
   							'domain':[
								['activity_id','=',id_activity_update],
							],
						},
						headers: {
							'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
						},
					
					}
				).then(
					function successCallback(response){

						$scope.afterupdateid = response.data['Result'];
						// window.localStorage.setItem( 'afterupdateid', JSON.stringify(afterupdateid));
					},
					function errorCallback(response){
						console.log('erroor data kosong');
						// $window.localStorage.clear();
						// $state.go('formreviewactivity');
					}
				)

	//fungsi tambah form
	$scope.fBUpdate = [];
	$scope.fAUpdate = [];

	$scope.tambahformBeforeUp = function() {
		var newItemNo = $scope.fBUpdate.length+1;
	    $scope.fBUpdate.push({'id':'bpu'+newItemNo});
	};  
	$scope.tambahformAfterUp = function() {
		var newItemNo = $scope.fAUpdate.length+1;
	    $scope.fAUpdate.push({'id':'apu'+newItemNo});
	};
	
	//fungsi untuk nyari data
	$scope.getMatches = function(searchText){
		var res_matched = [];
		
		// cari via ajax
		res_matched = $http
	  	(
			{
				method: 'POST',
				url: 'http://'+config['host']+':'+config['port']+'/openerp/res.partner/search/',
				data: {
				'domain':[
							['is_company','=','false'],
							['customer','=','true'],
							['display_name','ilike',searchText]
						],
				'usn':name,'pw':pass ,'fields':['display_name']},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				  
				},
			}
		).then(function(response){
			// if success
			return response.data.Result
		},
		function(response){
			return []
		})
		
		return res_matched
	}

	//fungsi remove form
	$scope.removeBeforeUp = function() {
    var lastItem = $scope.fBUpdate.length-1;
    $scope.fBUpdate.splice(lastItem);
  	};

	$scope.removeAfterUp = function() {
    var lastItem = $scope.fAUpdate.length-1;
    $scope.fAUpdate.splice(lastItem);
  	};

	$scope.update = function() {
		var data1 = 'beforeactual'+get_day;
		var data2 = 'afteractual'+get_day;
		id_actualbefore = $scope.beforeupdateid;
		id_actualafter = $scope.afterupdateid;
		
		var data_before = $scope.current_beforeplan;
		var data_after = $scope.current_afterplan;
		var data_beforeAdd = $scope.fBUpdate;
		// console.log(data_beforeAdd[0]['customer'].id)
		var data_afterAdd = $scope.fAUpdate;

		var isi_update={}
		isi_update[data1]=[];
		isi_update[data2]=[];

		for (dbu = 0; dbu < data_before.length; dbu++) {
						isi_update[data1].push([1,id_actualbefore[dbu]['id'],{'name':data_before[dbu].results,
						'batal': data_before[dbu].checked }])
		}
		for (dau = 0; dau < data_after.length; dau++) {
						isi_update[data2].push([1,id_actualafter[dau]['id'],{'name':data_after[dau].results,
						'batal': data_after[dau].checked }])
		}
		for (var dba = 0; dba < data_beforeAdd.length; dba++) {

						isi_update[data1].push([0,0,{'partner_id':data_beforeAdd[dba]['customer'].id,
						'location':data_beforeAdd[dba]['location'],
						'name':data_beforeAdd[dba]['objective']}])
		};
		for (var daa = 0; daa < data_afterAdd.length; daa++) {

						isi_update[data2].push([0,0,{'partner_id':data_afterAdd[daa]['customer'].id,
						'location':data_afterAdd[daa]['location'],
						'name':data_afterAdd[daa]['objective']}])
		};


$http(
			{
				method: 'POST',
				url: 'http://'+config['host']+':'+config['port']+'/openerp/update/sales.activity/',
				data: {
					'usn':name,'pw':pass ,'ids':id_activity_update[0],'vals':isi_update
				},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
			alert("sukses")
			window.localStorage.removeItem('activity_id_update');
			$state.go('menuactivity')
			},
			function errorCallback(response){
				alert("Koneksi saat ini tidak tersedia, data anda akan kami simpan")
				var update_data_temp = {'activity_id' : id_activity_update[0], 'data_val' : isi_update};
				window.localStorage.setItem('update_data_temp', JSON.stringify([update_data_temp]));
				// $window.localStorage.clear();
				$state.go('menuactivity');
			}
		)			
	}


	

})
   
.controller('formdaymondayCtrl', function($scope,$stateParams,$http,$state,config) {
	
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	$scope.day = $stateParams.day;
	var hari = $stateParams.day;
	
	// get from localstorage
	var temp_current_data = JSON.parse(window.localStorage.getItem('temporary_data_create_plan'));

	//tampilin data yang sudah ada dan fungsi hapus data
	if (hari=='monday' && (temp_current_data[0]['monday_before'].length != 0 || temp_current_data[0]['monday_after'].length != 0)) {
		$scope.before_prev = temp_current_data[0]['monday_before']
		$scope.after_prev = temp_current_data[0]['monday_after']
    	
    	$scope.removeBefore = function(index) {
    	$scope.before_prev.splice(index, 1);
		};
    	$scope.removeAfter = function(index) {
    	$scope.after_prev.splice(index, 1);
		};

	}  
	else if (hari=='tuesday' && (temp_current_data[0]['tuesday_before'].length != 0 || temp_current_data[0]['tuesday_after'].length != 0)) {
		$scope.before_prev = temp_current_data[0]['tuesday_before']
		$scope.after_prev = temp_current_data[0]['tuesday_after']
	
    	$scope.removeBefore = function(index) {
    	$scope.before_prev.splice(index, 1);
		};
    	$scope.removeAfter = function(index) {
    	$scope.after_prev.splice(index, 1);
		};

	}  
	else if (hari=='wednesday' && (temp_current_data[0]['wednesday_before'].length != 0 || temp_current_data[0]['wednesday_after'].length != 0)) {
		$scope.before_prev = temp_current_data[0]['wednesday_before']
		$scope.after_prev = temp_current_data[0]['wednesday_after']
	
    	$scope.removeBefore = function(index) {
    	$scope.before_prev.splice(index, 1);
		};
    	$scope.removeAfter = function(index) {
    	$scope.after_prev.splice(index, 1);
		};

	} 
	else if (hari=='thursday' && (temp_current_data[0]['thursday_before'].length != 0 || temp_current_data[0]['thursday_after'].length != 0)) {
		$scope.before_prev = temp_current_data[0]['thursday_before']
		$scope.after_prev = temp_current_data[0]['thursday_after']

    	$scope.removeBefore = function(index) {
    	$scope.before_prev.splice(index, 1);
		};
    	$scope.removeAfter = function(index) {
    	$scope.after_prev.splice(index, 1);
		};	

	} 
	else if (hari=='friday' && (temp_current_data[0]['friday_before'].length != 0 || temp_current_data[0]['friday_after'].length != 0)) {
		$scope.before_prev = temp_current_data[0]['friday_before']
		$scope.after_prev = temp_current_data[0]['friday_after']
	
    	$scope.removeBefore = function(index) {
    	$scope.before_prev.splice(index, 1);
		};
    	$scope.removeAfter = function(index) {
    	$scope.after_prev.splice(index, 1);
		};
	} 
	//simpan data ke local storage
	$scope.savedata = function() {  

		if (hari == 'monday') {

			var monday_before = $scope.formBefore;
			var monday_after = $scope.formAfter;

			for (var mb = 0; mb < monday_before.length; mb++) {

				temp_current_data[0]['monday_before'].push(monday_before[mb])

			};
			for (var ma = 0; ma < monday_after.length; ma++) {

				temp_current_data[0]['monday_after'].push(monday_after[ma]) 

			};			
			// rewrite localStorage
			window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
			window.alert('data telah disimpan')
			$state.go('formactivity')

		}
		else if (hari == 'tuesday') {

			var tuesday_before = $scope.formBefore;
			var tuesday_after = $scope.formAfter;
			
			for (var tb = 0; tb < tuesday_before.length; tb++) {

				temp_current_data[0]['tuesday_before'].push(tuesday_before[tb])

			};
			for (var ta = 0; ta < tuesday_after.length; ta++) {

				temp_current_data[0]['tuesday_after'].push(tuesday_after[ta]) 

			};			
			// rewrite localStorage
			window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
			window.alert('data telah disimpan')
			$state.go('formactivity')
		}
		else if (hari == 'wednesday') {

			var wednesday_before = $scope.formBefore;
			var wednesday_after = $scope.formAfter;
			
			for (var wb = 0; wb < wednesday_before.length; wb++) {

				temp_current_data[0]['wednesday_before'].push(wednesday_before[wb])

			};
			for (var wa = 0; wa < wednesday_after.length; wa++) {

				temp_current_data[0]['wednesday_after'].push(wednesday_after[wa]) 

			};			
			// rewrite localStorage
			window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
			window.alert('data telah disimpan')
			$state.go('formactivity')
		}
		else if (hari == 'thursday') {

			var thursday_before = $scope.formBefore;
			var thursday_after = $scope.formAfter;
			
			for (var thb = 0; thb < thursday_before.length; thb++) {

				temp_current_data[0]['thursday_before'].push(thursday_before[thb])

			};
			for (var tha = 0; tha < thursday_after.length; tha++) {

				temp_current_data[0]['thursday_after'].push(thursday_after[tha]) 

			};			
			// rewrite localStorage
			window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
			window.alert('data telah disimpan')
			$state.go('formactivity')
		}
		else if (hari == 'friday') {

			var friday_before = $scope.formBefore;
			var friday_after = $scope.formAfter;
			
			for (var fb = 0; fb < friday_before.length; fb++) {

				temp_current_data[0]['friday_before'].push(friday_before[fb])

			};
			for (var fa = 0; fa < friday_after.length; fa++) {

				temp_current_data[0]['friday_after'].push(friday_after[fa]) 

			};			
			// rewrite localStorage
			window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
			window.alert('data telah disimpan')
			$state.go('formactivity')
		}

	}

	//fungsi tambah form
	$scope.formBefore = [];
	$scope.formAfter = [];

	$scope.tambahformBefore = function() {
		var newItemNo = $scope.formBefore.length+1;
	    $scope.formBefore.push({'id':'before_plan'+newItemNo});
	};  
	$scope.tambahformAfter = function() {
		var newItemNo = $scope.formAfter.length+1;
	    $scope.formAfter.push({'id':'after_plan'+newItemNo});
	};
	// fungsi untuk nyari data
	$scope.getMatches = function(searchText){
		var res_matched = [];
		
		// cari via ajax
		res_matched = $http
	  	(
			{
				method: 'POST',
				url: 'http://'+config['host']+':'+config['port']+'/openerp/res.partner/search/',
				data: {
				'domain':[
							['is_company','=','false'],
							['customer','=','true'],
							['display_name','ilike',searchText]
						],
				'usn':name,'pw':pass ,'fields':['display_name']},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				  
				},
			}
		).then(function(response){
			// if success
			return response.data.Result
		},
		function(response){
			return []
		})
		
		return res_matched
	}
})
<<<<<<< HEAD
   
.controller('formdaymondayCtrl', function($scope,$stateParams,$http,$state,config) {
	
	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	$scope.day = $stateParams.day;
	var hari = $stateParams.day;
	
	// get from localstorage
	var temp_current_data = JSON.parse(window.localStorage.getItem('temporary_data_create_plan'));

	//tampilin data yang sudah ada dan fungsi hapus data
	if (hari=='monday' && (temp_current_data[0]['monday_before'].length != 0 || temp_current_data[0]['monday_after'].length != 0)) {
		$scope.before_prev = temp_current_data[0]['monday_before']
		$scope.after_prev = temp_current_data[0]['monday_after']
    	
    	$scope.removeBefore = function(index) {
    	$scope.before_prev.splice(index, 1);
		};
    	$scope.removeAfter = function(index) {
    	$scope.after_prev.splice(index, 1);
		};

	}  
	else if (hari=='tuesday' && (temp_current_data[0]['tuesday_before'].length != 0 || temp_current_data[0]['tuesday_after'].length != 0)) {
		$scope.before_prev = temp_current_data[0]['tuesday_before']
		$scope.after_prev = temp_current_data[0]['tuesday_after']
	
    	$scope.removeBefore = function(index) {
    	$scope.before_prev.splice(index, 1);
		};
    	$scope.removeAfter = function(index) {
    	$scope.after_prev.splice(index, 1);
		};

	}  
	else if (hari=='wednesday' && (temp_current_data[0]['wednesday_before'].length != 0 || temp_current_data[0]['wednesday_after'].length != 0)) {
		$scope.before_prev = temp_current_data[0]['wednesday_before']
		$scope.after_prev = temp_current_data[0]['wednesday_after']
	
    	$scope.removeBefore = function(index) {
    	$scope.before_prev.splice(index, 1);
		};
    	$scope.removeAfter = function(index) {
    	$scope.after_prev.splice(index, 1);
		};

	} 
	else if (hari=='thursday' && (temp_current_data[0]['thursday_before'].length != 0 || temp_current_data[0]['thursday_after'].length != 0)) {
		$scope.before_prev = temp_current_data[0]['thursday_before']
		$scope.after_prev = temp_current_data[0]['thursday_after']

    	$scope.removeBefore = function(index) {
    	$scope.before_prev.splice(index, 1);
		};
    	$scope.removeAfter = function(index) {
    	$scope.after_prev.splice(index, 1);
		};	

	} 
	else if (hari=='friday' && (temp_current_data[0]['friday_before'].length != 0 || temp_current_data[0]['friday_after'].length != 0)) {
		$scope.before_prev = temp_current_data[0]['friday_before']
		$scope.after_prev = temp_current_data[0]['friday_after']
	
    	$scope.removeBefore = function(index) {
    	$scope.before_prev.splice(index, 1);
		};
    	$scope.removeAfter = function(index) {
    	$scope.after_prev.splice(index, 1);
		};
	} 
	//simpan data ke local storage
	$scope.savedata = function() {  

		if (hari == 'monday') {

			var monday_before = $scope.formBefore;
			var monday_after = $scope.formAfter;

			for (var mb = 0; mb < monday_before.length; mb++) {

				temp_current_data[0]['monday_before'].push(monday_before[mb])

			};
			for (var ma = 0; ma < monday_after.length; ma++) {

				temp_current_data[0]['monday_after'].push(monday_after[ma]) 

			};			
			// rewrite localStorage
			window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
			window.alert('data telah disimpan')
			$state.go('formactivity')

		}
		else if (hari == 'tuesday') {

			var tuesday_before = $scope.formBefore;
			var tuesday_after = $scope.formAfter;
			
			for (var tb = 0; tb < tuesday_before.length; tb++) {

				temp_current_data[0]['tuesday_before'].push(tuesday_before[tb])

			};
			for (var ta = 0; ta < tuesday_after.length; ta++) {

				temp_current_data[0]['tuesday_after'].push(tuesday_after[ta]) 

			};			
			// rewrite localStorage
			window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
			window.alert('data telah disimpan')
			$state.go('formactivity')
		}
		else if (hari == 'wednesday') {

			var wednesday_before = $scope.formBefore;
			var wednesday_after = $scope.formAfter;
			
			for (var wb = 0; wb < wednesday_before.length; wb++) {

				temp_current_data[0]['wednesday_before'].push(wednesday_before[wb])

			};
			for (var wa = 0; wa < wednesday_after.length; wa++) {

				temp_current_data[0]['wednesday_after'].push(wednesday_after[wa]) 

			};			
			// rewrite localStorage
			window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
			window.alert('data telah disimpan')
			$state.go('formactivity')
		}
		else if (hari == 'thursday') {

			var thursday_before = $scope.formBefore;
			var thursday_after = $scope.formAfter;
			
			for (var thb = 0; thb < thursday_before.length; thb++) {

				temp_current_data[0]['thursday_before'].push(thursday_before[thb])

			};
			for (var tha = 0; tha < thursday_after.length; tha++) {

				temp_current_data[0]['thursday_after'].push(thursday_after[tha]) 

			};			
			// rewrite localStorage
			window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
			window.alert('data telah disimpan')
			$state.go('formactivity')
		}
		else if (hari == 'friday') {

			var friday_before = $scope.formBefore;
			var friday_after = $scope.formAfter;
			
			for (var fb = 0; fb < friday_before.length; fb++) {

				temp_current_data[0]['friday_before'].push(friday_before[fb])

			};
			for (var fa = 0; fa < friday_after.length; fa++) {

				temp_current_data[0]['friday_after'].push(friday_after[fa]) 

			};			
			// rewrite localStorage
			window.localStorage.setItem( 'temporary_data_create_plan', JSON.stringify(temp_current_data));
			window.alert('data telah disimpan')
			$state.go('formactivity')
		}

	}

	//fungsi tambah form
	$scope.formBefore = [];
	$scope.formAfter = [];

	$scope.tambahformBefore = function() {
		var newItemNo = $scope.formBefore.length+1;
	    $scope.formBefore.push({'id':'before_plan'+newItemNo});
	};  
	$scope.tambahformAfter = function() {
		var newItemNo = $scope.formAfter.length+1;
	    $scope.formAfter.push({'id':'after_plan'+newItemNo});
	};
	// fungsi untuk nyari data
	$scope.getMatches = function(searchText){
		var res_matched = [];
		
		// cari via ajax
		res_matched = $http
	  	(
			{
				method: 'POST',
				url: 'http://'+config['host']+':'+config['port']+'/openerp/res.partner/search/',
				data: {
				'domain':[
							['is_company','=','false'],
							['customer','=','true'],
							['display_name','ilike',searchText]
						],
				'usn':name,'pw':pass ,'fields':['display_name']},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				  
				},
			}
		).then(function(response){
			// if success
			return response.data.Result
		},
		function(response){
			return []
		})
		
		return res_matched
	}
})

.controller('previewcreateplanCtrl', function($scope,$http,$state,config) {

	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	temp_current_data = JSON.parse(window.localStorage.getItem('temporary_data_create_plan'));

	$scope.pic = temp_current_data[0].pic;
	$scope.begin = temp_current_data[0].begin;
	$scope.end = temp_current_data[0].end;
	$scope.bpp_senin = temp_current_data[0].monday_before;
	$scope.app_senin = temp_current_data[0].monday_after;
	$scope.bpp_selasa = temp_current_data[0].tuesday_before;
	$scope.app_selasa = temp_current_data[0].tuesday_after;
	$scope.bpp_rabu = temp_current_data[0].wednesday_before;
	$scope.app_rabu = temp_current_data[0].wednesday_after;
	$scope.bpp_kamis = temp_current_data[0].thursday_before;
	$scope.app_kamis = temp_current_data[0].thursday_after;
	$scope.bpp_jumat = temp_current_data[0].friday_before;
	$scope.app_jumat = temp_current_data[0].friday_after;
	
	$scope.sendData = function() {
		console.log('clicked')
		temp_current_data = JSON.parse(window.localStorage.getItem('temporary_data_create_plan'));

		var send_data = [{
							'user_id' : temp_current_data[0].pic,
							'begin': temp_current_data[0].begin,
							'end' : temp_current_data[0].end,
							'beforeplansenin':[],
							'afterplansenin':[],
							'beforeplanselasa':[],
							'afterplanselasa':[],
							'beforeplanrabu':[],
							'afterplanrabu':[],
							'beforeplankamis':[],
							'afterplankamis':[],
							'beforeplanjumat':[],
							'afterplanjumat':[],
						}];

		for (var tmb = 0; tmb < (temp_current_data[0].monday_before).length; tmb++) {

					send_data[0]['beforeplansenin'].push([0,0,{'partner_id':(temp_current_data[0].monday_before)[tmb].customer.id,
						'location':(temp_current_data[0].monday_before)[tmb].location,
						'name':(temp_current_data[0].monday_before)[tmb].objective}])
		};
		for (var tma = 0; tma < (temp_current_data[0].monday_after).length; tma++) {

					send_data[0]['afterplansenin'].push([0,0,{'partner_id':(temp_current_data[0].monday_after)[tma].customer.id,
						'location':(temp_current_data[0].monday_after)[tma].location,
						'name':(temp_current_data[0].monday_after)[tma].objective}])
		};
		for (var ttb = 0; ttb < (temp_current_data[0].tuesday_before).length; ttb++) {

					send_data[0]['beforeplanselasa'].push([0,0,{'partner_id':(temp_current_data[0].tuesday_before)[ttb].customer.id,
						'location':(temp_current_data[0].tuesday_before)[ttb].location,
						'name':(temp_current_data[0].tuesday_before)[ttb].objective}])
		};
		for (var tta = 0; tta < (temp_current_data[0].tuesday_after).length; tta++) {

					send_data[0]['afterplanselasa'].push([0,0,{'partner_id':(temp_current_data[0].tuesday_after)[tta].customer.id,
						'location':(temp_current_data[0].tuesday_after)[tta].location,
						'name':(temp_current_data[0].tuesday_after)[tta].objective}])
		};
		for (var twb = 0; twb < (temp_current_data[0].wednesday_before).length; twb++) {

					send_data[0]['beforeplanrabu'].push([0,0,{'partner_id':(temp_current_data[0].wednesday_before)[twb].customer.id,
						'location':(temp_current_data[0].wednesday_before)[twb].location,
						'name':(temp_current_data[0].wednesday_before)[twb].objective}])
		};
		for (var twa = 0; twa < (temp_current_data[0].wednesday_after).length; twa++) {

					send_data[0]['afterplanrabu'].push([0,0,{'partner_id':(temp_current_data[0].wednesday_after)[twa].customer.id,
						'location':(temp_current_data[0].wednesday_after)[twa].location,
						'name':(temp_current_data[0].wednesday_after)[twa].objective}])
		};
		for (var tthb = 0; tthb < (temp_current_data[0].thursday_before).length; tthb++) {

					send_data[0]['beforeplankamis'].push([0,0,{'partner_id':(temp_current_data[0].thursday_before)[tthb].customer.id,
						'location':(temp_current_data[0].thursday_before)[tthb].location,
						'name':(temp_current_data[0].thursday_before)[tthb].objective}])
		};
		for (var ttha = 0; ttha < (temp_current_data[0].thursday_after).length; ttha++) {

					send_data[0]['afterplankamis'].push([0,0,{'partner_id':(temp_current_data[0].thursday_after)[ttha].customer.id,
						'location':(temp_current_data[0].thursday_after)[ttha].location,
						'name':(temp_current_data[0].thursday_after)[ttha].objective}])
		};
		for (var tfb = 0; tfb < (temp_current_data[0].friday_before).length; tfb++) {

					send_data[0]['beforeplanjumat'].push([0,0,{'partner_id':(temp_current_data[0].friday_before)[tfb].customer.id,
						'location':(temp_current_data[0].friday_before)[tfb].location,
						'name':(temp_current_data[0].friday_before)[tfb].objective}])
		};
		for (var tfa = 0; tfa < (temp_current_data[0].friday_after).length; tfa++) {

					send_data[0]['afterplanjumat'].push([0,0,{'partner_id':(temp_current_data[0].friday_after)[tfa].customer.id,
						'location':(temp_current_data[0].friday_after)[tfa].location,
						'name':(temp_current_data[0].friday_after)[tfa].objective}])
		};

		console.log(send_data,'ini datanya')

		$http(
			{
				method: 'POST',
				url: 'http://'+config['host']+':'+config['port']+'/openerp/createsalesplan/',
				data: {
					'usn':name,'pw':pass ,'vals':send_data[0]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
			alert("sukses")
			$state.go('menuactivity')
			},
			function errorCallback(response){
				alert("gagal")
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)			
	}



})

.controller('salestimelineCtrl', function($scope,$http,$state,$ionicLoading,$window,$filter,$ionicPopup,$ionicModal,config) {
	$ionicLoading.show(
		{	 
		    content: 'Loading',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 200,
		    showDelay: 0

  		}
  	);


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
	$ionicModal.fromTemplateUrl('templates/modal.html', {
		scope: $scope,
		hardwareBackButtonClose: false
	  }).then(function(modal) {
	  	console.log(modal)
	    $scope.modal = modal;
	  });
	 $scope.openModal = function(tm) {   
	 	// console.log(tm.the_date,"iniiii")
          $scope.user = tm;

          $scope.modal.show();
        };
    $scope.doRefresh = function(){
    
    	$http
	  	(
			{
				method: 'POST',
				url: 'http://'+config['host']+':'+config['port']+'/openerp/salestimeline/AllData/',
				data: {
						'usn':name,
						'pw':pass,
						"params":{
							// "fields":'*',
							// "table":"sales_activity_plan",
							// 'AndOr':[],
							'condition':{"the_date":[today,yesterday]},
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

				// $ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
				if(response.data.data.length==0){
					alertPopup = $ionicPopup.alert({
					title: 'Warning',
					template: 'Hari ini dan kemarin belum ada data!!! Tekan tombol "Load" Untuk melihat data paling baru!!'
				});
				}
			},
			function errorCallback(response){
				// $ionicLoading.hide();
				console.log(response)

				console.log('erroor data kosong');
		
			}

	)

    }
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
							url: 'http://'+config['host']+':'+config['port']+'/openerp/salestimeline/GetUpdate/',
							data: {
									'usn':name,
									'pw':pass,
									"params":{
										// "fields":'*',
										// "table":"sales_activity_plan",
										// 'AndOr':[],
										'condition':{"the_date__lt":yesterday},
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
								alertPopup = $ionicPopup.alert({
								title: 'Warning',
								template: 'Tidak ada koneksi internet!!'
							});
								
							}
						)
							

			}

	};
	// $scope.loadMore();
	$scope.colortext= {
        "color" : "red",
        
    }
	


  	$http
  	(
		{
			method: 'POST',
			url: 'http://'+config['host']+':'+config['port']+'/openerp/salestimeline/AllData/',
			data: {
					'usn':name,
					'pw':pass,
					"params":{
						// "fields":'*',
						// "table":"sales_activity_plan",
						// 'AndOr':[],
						'condition':{"the_date":[today,yesterday]},
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
			if(response.data.data.length==0){
				alertPopup = $ionicPopup.alert({
				title: 'Warning',
				template: 'Hari ini dan kemarin belum ada data!!! Tekan tombol "Load" Untuk melihat data paling baru!!'
			});
			}
		},
		function errorCallback(response){
			$ionicLoading.hide();
			console.log(response)

			console.log('erroor data kosong');
	
		}
	)

=======

.controller('previewcreateplanCtrl', function($scope,$http,$state,config) {

	var name =(window.localStorage.getItem("dhaussjauhxdjuzlgzuglscfasshdausdjfkjzasd")) ;
	var pass =(window.localStorage.getItem("uhadlfdlfgghfrejajkfdfhzjudfakjhbfkjagfjufug")) ;
	temp_current_data = JSON.parse(window.localStorage.getItem('temporary_data_create_plan'));

	$scope.pic = temp_current_data[0].pic;
	$scope.begin = temp_current_data[0].begin;
	$scope.end = temp_current_data[0].end;
	$scope.bpp_senin = temp_current_data[0].monday_before;
	$scope.app_senin = temp_current_data[0].monday_after;
	$scope.bpp_selasa = temp_current_data[0].tuesday_before;
	$scope.app_selasa = temp_current_data[0].tuesday_after;
	$scope.bpp_rabu = temp_current_data[0].wednesday_before;
	$scope.app_rabu = temp_current_data[0].wednesday_after;
	$scope.bpp_kamis = temp_current_data[0].thursday_before;
	$scope.app_kamis = temp_current_data[0].thursday_after;
	$scope.bpp_jumat = temp_current_data[0].friday_before;
	$scope.app_jumat = temp_current_data[0].friday_after;
	
	$scope.sendData = function() {
		console.log('clicked')
		temp_current_data = JSON.parse(window.localStorage.getItem('temporary_data_create_plan'));

		var send_data = [{
							'user_id' : temp_current_data[0].id_user,
							'begin': temp_current_data[0].begin,
							'end' : temp_current_data[0].end,
							'beforeplansenin':[],
							'afterplansenin':[],
							'beforeplanselasa':[],
							'afterplanselasa':[],
							'beforeplanrabu':[],
							'afterplanrabu':[],
							'beforeplankamis':[],
							'afterplankamis':[],
							'beforeplanjumat':[],
							'afterplanjumat':[],
						}];

		for (var tmb = 0; tmb < (temp_current_data[0].monday_before).length; tmb++) {

					send_data[0]['beforeplansenin'].push([0,0,{'partner_id':(temp_current_data[0].monday_before)[tmb].customer.id,
						'location':(temp_current_data[0].monday_before)[tmb].location,
						'name':(temp_current_data[0].monday_before)[tmb].objective}])
		};
		for (var tma = 0; tma < (temp_current_data[0].monday_after).length; tma++) {

					send_data[0]['afterplansenin'].push([0,0,{'partner_id':(temp_current_data[0].monday_after)[tma].customer.id,
						'location':(temp_current_data[0].monday_after)[tma].location,
						'name':(temp_current_data[0].monday_after)[tma].objective}])
		};
		for (var ttb = 0; ttb < (temp_current_data[0].tuesday_before).length; ttb++) {

					send_data[0]['beforeplanselasa'].push([0,0,{'partner_id':(temp_current_data[0].tuesday_before)[ttb].customer.id,
						'location':(temp_current_data[0].tuesday_before)[ttb].location,
						'name':(temp_current_data[0].tuesday_before)[ttb].objective}])
		};
		for (var tta = 0; tta < (temp_current_data[0].tuesday_after).length; tta++) {

					send_data[0]['afterplanselasa'].push([0,0,{'partner_id':(temp_current_data[0].tuesday_after)[tta].customer.id,
						'location':(temp_current_data[0].tuesday_after)[tta].location,
						'name':(temp_current_data[0].tuesday_after)[tta].objective}])
		};
		for (var twb = 0; twb < (temp_current_data[0].wednesday_before).length; twb++) {

					send_data[0]['beforeplanrabu'].push([0,0,{'partner_id':(temp_current_data[0].wednesday_before)[twb].customer.id,
						'location':(temp_current_data[0].wednesday_before)[twb].location,
						'name':(temp_current_data[0].wednesday_before)[twb].objective}])
		};
		for (var twa = 0; twa < (temp_current_data[0].wednesday_after).length; twa++) {

					send_data[0]['afterplanrabu'].push([0,0,{'partner_id':(temp_current_data[0].wednesday_after)[twa].customer.id,
						'location':(temp_current_data[0].wednesday_after)[twa].location,
						'name':(temp_current_data[0].wednesday_after)[twa].objective}])
		};
		for (var tthb = 0; tthb < (temp_current_data[0].thursday_before).length; tthb++) {

					send_data[0]['beforeplankamis'].push([0,0,{'partner_id':(temp_current_data[0].thursday_before)[tthb].customer.id,
						'location':(temp_current_data[0].thursday_before)[tthb].location,
						'name':(temp_current_data[0].thursday_before)[tthb].objective}])
		};
		for (var ttha = 0; ttha < (temp_current_data[0].thursday_after).length; ttha++) {

					send_data[0]['afterplankamis'].push([0,0,{'partner_id':(temp_current_data[0].thursday_after)[ttha].customer.id,
						'location':(temp_current_data[0].thursday_after)[ttha].location,
						'name':(temp_current_data[0].thursday_after)[ttha].objective}])
		};
		for (var tfb = 0; tfb < (temp_current_data[0].friday_before).length; tfb++) {

					send_data[0]['beforeplanjumat'].push([0,0,{'partner_id':(temp_current_data[0].friday_before)[tfb].customer.id,
						'location':(temp_current_data[0].friday_before)[tfb].location,
						'name':(temp_current_data[0].friday_before)[tfb].objective}])
		};
		for (var tfa = 0; tfa < (temp_current_data[0].friday_after).length; tfa++) {

					send_data[0]['afterplanjumat'].push([0,0,{'partner_id':(temp_current_data[0].friday_after)[tfa].customer.id,
						'location':(temp_current_data[0].friday_after)[tfa].location,
						'name':(temp_current_data[0].friday_after)[tfa].objective}])
		};

		console.log(send_data,'ini datanya')

		$http(
			{
				method: 'POST',
				url: 'http://'+config['host']+':'+config['port']+'/openerp/createsalesplan/',
				data: {
					'usn':name,'pw':pass ,'vals':send_data[0]},
				headers: {
					'Authorization': 'Basic ' + "cmV6YTpzdXByYWJha3Rp",
				},		
			}
		).then(
			function successCallback(response){
			alert("sukses")
			window.localStorage.removeItem('temporary_data_create_plan');
			$state.go('menuactivity')
			},
			function errorCallback(response){
				alert("gagal")
				// $window.localStorage.clear();
				// $state.go('formreviewactivity');
			}
		)			
	}



})

.controller('salestimelineCtrl', function($scope,$http,$state,$ionicLoading,$window,$filter,$ionicPopup,$ionicModal,config) {
	$ionicLoading.show(
		{	 
		    content: 'Loading',
		    animation: 'fade-in',
		    showBackdrop: true,
		    maxWidth: 200,
		    showDelay: 0

  		}
  	);


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
	$ionicModal.fromTemplateUrl('templates/modal.html', {
		scope: $scope,
		hardwareBackButtonClose: false
	  }).then(function(modal) {
	  	console.log(modal)
	    $scope.modal = modal;
	  });
	 $scope.openModal = function(tm) {   
	 	// console.log(tm.the_date,"iniiii")
          $scope.user = tm;

          $scope.modal.show();
        };
    $scope.doRefresh = function(){
    
    	$http
	  	(
			{
				method: 'POST',
				url: 'http://'+config['host']+':'+config['port']+'/openerp/salestimeline/AllData/',
				data: {
						'usn':name,
						'pw':pass,
						"params":{
							// "fields":'*',
							// "table":"sales_activity_plan",
							// 'AndOr':[],
							'condition':{"the_date":[today,yesterday]},
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

				// $ionicLoading.hide();
				$scope.$broadcast('scroll.refreshComplete');
				if(response.data.data.length==0){
					alertPopup = $ionicPopup.alert({
					title: 'Warning',
					template: 'Hari ini dan kemarin belum ada data!!! Tekan tombol "Load" Untuk melihat data paling baru!!'
				});
				}
			},
			function errorCallback(response){
				// $ionicLoading.hide();
				console.log(response)

				console.log('erroor data kosong');
		
			}

	)

    }
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
							url: 'http://'+config['host']+':'+config['port']+'/openerp/salestimeline/GetUpdate/',
							data: {
									'usn':name,
									'pw':pass,
									"params":{
										// "fields":'*',
										// "table":"sales_activity_plan",
										// 'AndOr':[],
										'condition':{"the_date__lt":yesterday},
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
								alertPopup = $ionicPopup.alert({
								title: 'Warning',
								template: 'Tidak ada koneksi internet!!'
							});
								
							}
						)
			}

	};
	// $scope.loadMore();
	$scope.colortext= {
        "color" : "red",
    }
  	$http
  	(
		{
			method: 'POST',
			url: 'http://'+config['host']+':'+config['port']+'/openerp/salestimeline/AllData/',
			data: {
					'usn':name,
					'pw':pass,
					"params":{
						// "fields":'*',
						// "table":"sales_activity_plan",
						// 'AndOr':[],
						'condition':{"the_date":[today,yesterday]},
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
			if(response.data.data.length==0){
				alertPopup = $ionicPopup.alert({
				title: 'Warning',
				template: 'Hari ini dan kemarin belum ada data!!! Tekan tombol "Load" Untuk melihat data paling baru!!'
			});
			}
		},
		function errorCallback(response){
			$ionicLoading.hide();
			console.log(response)

			console.log('erroor data kosong');
	
		}
	)
	reloadSalesTm(timeline)
})