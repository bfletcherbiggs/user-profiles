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
