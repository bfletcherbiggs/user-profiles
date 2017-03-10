angular.module('userProfiles')
.controller('profileCtrl', function( $scope,friendService ) {

  $scope.getFriends = function(){
    friendService.getFriends().then(function(response){
      $scope.currentUser = response.data.currentUser
      $scope.friends = response.data.friends
      $scope.friendList=[]
      for (friend of $scope.friends){
        $scope.friendList.push(friend.name)
      }
    })
  }
  $scope.getProfiles = function(){
    friendService.getProfiles().then(function(response){
      $scope.profiles = response.data
    })
  }

  $scope.addFriend = function(profile){
    friendService.addFriend(profile).then(function(response){
      $scope.getFriends()
      $scope.getProfiles()
    })
  }
  $scope.removeFriend = function(profile){
    friendService.removeFriend(profile).then(function(response){
      $scope.getFriends()
      $scope.getProfiles()
    })
  }

  $scope.getFriends()
  $scope.getProfiles()
	// FIX ME - assign values to $scope.currentUser and $scope.friends
});
