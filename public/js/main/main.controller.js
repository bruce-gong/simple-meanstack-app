app.controller('MainCtrl', [
  '$scope',
  'posts',
  'auth',
  function($scope, posts, auth){
    $scope.posts =  posts.posts;
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.addPost = function(){
      if(!$scope.title || $scope.title === '') { return; }
      posts.create({
        title: $scope.title,
        content: $scope.content,
      });
      $scope.title = '';
      $scope.content = '';
    };

    $scope.incrementUpvotes = function(post) {
      posts.upvote(post);
    };

    $scope.incrementDownvotes = function (post) {
      posts.downvote(post);
    };
  }
]);
