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
      auth.updateUserProfile($scope.currentUser).success(function () {
        $scope.isEditing = false;
      }).error(function (error) {
        $scope.error = error;
      });
    }

  }
]);
