app.controller('ProfileCtrl', [
  '$scope',
  'auth',
  function ($scope, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser();
    $scope.isEditing = false;

    $scope.editProfile = function () {
      $scope.isEditing = true;
    }

    $scope.cancelEdit = function () {
      $scope.isEditing = false;
    }

    $scope.submitProfile = function () {
      auth.updateUserProfile($scope.currentUser);
      $scope.isEditing = false;
    }
  }
]);
