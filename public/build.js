angular.module('userProfiles', ['ui.router'])

.config(function( $stateProvider, $urlRouterProvider ) {

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: './views/home.html',
		controller: 'mainCtrl'
	})
	.state('profile', {
		url: '/profile',
		'templateUrl': './views/profile.html',
		controller: 'profileCtrl'
	});

	$urlRouterProvider.otherwise('/');

});
angular.module('userProfiles')
.service('friendService', function( $http ) {


    this.login = function( user ) {
      return $http.post('/api/login',user)

    };

    this.getFriends = function() {
    	return $http.get('/api/friends')
    };
    this.getProfiles = function(){
      return $http.get('/api/profiles')
    }
    this.addFriend = function(profile){
      // console.log(profName)
      return $http.put('/api/friends',profile)
    }
    this.removeFriend = function(profile){
      return $http.delete('/api/friends/' + profile.name)
    }

});

angular.module('userProfiles')
.controller('mainCtrl', function( $scope, friendService, $location ) {

	$scope.login = function( user ) {
	
		friendService.login(user).then(function( response ) {
			if (response.data.userFound) {
				$location.path('/profile');
			} else {
				alert('user not found');
			}
		});
	}

});

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
