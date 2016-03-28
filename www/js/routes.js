angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menuutama', {
    url: '/menu',
    templateUrl: 'templates/menuutama.html',
    controller: 'menuutamaCtrl'
  })



  .state('menulogin', {
    url: '/login',
    templateUrl: 'templates/menulogin.html',
    controller: 'menuloginCtrl'
  })

  .state('submenusales', {
    url: '/submenu-sales',
    templateUrl: 'templates/submenusales.html',
    controller: 'submenusalesCtrl'
  })


  .state('menuactivity', {
    url: '/menu-activity',
    templateUrl: 'templates/menuactivity.html',
    controller: 'menuactivityCtrl'
  })

  .state('salesactivity', {
    url: '/sales-activity',
    templateUrl: 'templates/salesactivity.html',
    controller: 'salesactivityCtrl'
  })

  .state('formactivity', {
    url: '/form-activity',
    templateUrl: 'templates/formactivity.html',
    controller: 'formactivityCtrl'
  })

  .state('previewplanactivity', {
    url: '/preview-plan-activity',
    templateUrl: 'templates/previewplanactivity.html',
    controller: 'previewplanactivityCtrl'

  })

  .state('formreviewactivity', {
    url: '/form-review-activity/:idsact',
    templateUrl: 'templates/formreviewactivity.html',
    controller: 'formreviewactivityCtrl'
  })

  .state('formupdateactivity', {
    url: '/form-update-activity',
    templateUrl: 'templates/formupdateactivity.html',
    controller: 'formupdateactivityCtrl'
  })

  .state('formdaymonday', {
    url: '/form-day-monday',
    templateUrl: 'templates/formdaymonday.html',
    controller: 'formdaymondayCtrl'
  })

$urlRouterProvider.otherwise('/login')

  

});