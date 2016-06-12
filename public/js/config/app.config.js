app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'js/main/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: 'js/posts/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts) {
            return posts.get($stateParams.id);
          }]
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: 'js/auth/login.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
          if(auth.isLoggedIn()){
            $state.go('home');
          }
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: 'js/auth/register.html',
        controller: 'AuthCtrl',
        onEnter: ['$state', 'auth', '$timeout', function($state, auth, $timeout){
          if(auth.isLoggedIn()){
            // ui-router bug: https://github.com/angular-ui/ui-router/issues/326
            $timeout(function () {
              $state.go('home');
            }, 0)
          }
        }]
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'js/profile/profile.html',
        controller: 'ProfileCtrl',
        onEnter: ['$state', 'auth', function($state, auth){
          if(!auth.isLoggedIn()){
            $state.go('home');
          }
        }]
      });

      $urlRouterProvider.otherwise('home');
  }
]);
