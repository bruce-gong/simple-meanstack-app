app.factory('auth', ['$http', '$window', '$rootScope',  function ($http, $window, $rootScope) {
  var auth = {},
      currentUser = {};

  auth.saveToken = function (token) {
    $window.localStorage['flapper-news-token'] = token;
  };

  auth.getToken = function () {
    return $window.localStorage['flapper-news-token'];
  };

  auth.isLoggedIn = function () {
    var token = auth.getToken();

    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUser = function () {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      console.info(payload);
      currentUser = payload;
      return payload;
    }
  };

  auth.register = function (user) {
    return $http.post('/register', user).success(function (data) {
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function (user) {
    return $http.post('/login', user).success(function (data) {
      auth.saveToken(data.token);
      $rootScope.$broadcast("auth:login");
    });
  };

  auth.logOut = function () {
    $window.localStorage.removeItem('flapper-news-token');
  };

  auth.updateUserProfile = function (user) {
    return $http.put('/profile/' + user._id, user, {
      headers: {Authorization: 'Bearer ' + auth.getToken()}
    }).success(function (data) {
      auth.saveToken(data.token);
    });
  }

  return auth;
}]);
