app.controller('NavCtrl', [
  '$scope',
  'auth',
  function($scope, auth){
    $scope.$on("auth:login", setCurrentUser);
    $scope.$on("auth:register", setCurrentUser);

    setCurrentUser();
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.logOut = auth.logOut;

    function setCurrentUser() {
      $scope.currentUser = auth.currentUser();
    }
  }
]);

app.component('navBar', {
  templateUrl: 'js/nav/nav.html',
  controller: 'NavCtrl'
});
