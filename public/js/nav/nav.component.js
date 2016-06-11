app.controller('NavCtrl', [
  '$scope',
  'auth',
  function($scope, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser();
    $scope.logOut = auth.logOut;
  }
]);

app.component('navBar', {
  templateUrl: 'js/nav/nav.html',
  controller: 'NavCtrl'
});
