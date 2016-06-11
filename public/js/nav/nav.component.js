app.controller('NavCtrl', [
  '$scope',
  'auth',
  function($scope, auth){
    $scope.$on("auth:login", function () {
      $scope.currentUser = auth.currentUser();
    });
    $scope.currentUser = auth.currentUser();
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.logOut = auth.logOut;
  }
]);

app.component('navBar', {
  templateUrl: 'js/nav/nav.html',
  controller: 'NavCtrl'
});
