

var profiles = [
  {
    name: 'Preston McNeil',
    pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/ashleyford/128.jpg',
    status: 'Everything is bigger in Texas'
  },
  {
    name: 'Ryan Rasmussen',
    pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/jadlimcaco/128.jpg',
    status: 'RR Rules'
  },
  {
    name: 'Terri Ruff',
    pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg',
    status: 'Wow, I typed out hunter2 and all you saw was ******?!?!??'
  },
  {
    name: 'Lindsey Mayer',
    pic: 'https://s3.amazonaws.com/uifaces/faces/twitter/nzcode/128.jpg',
    status: 'OMG MITTENS DID THE CUTEST THING TODAY'
  }
];

module.exports = {
  getProfiles: function(req,res,next){
    res.status(200).json(profiles)
  },
  getFriends: function(req,res,next){
    console.log(req.session.currentUser)

    // var friendProfiles = []
    var friends = req.session.currentUser.friends;
    // for (var friend of friends) {
    //   for (var profile of profiles) {
    //     if (friend === profile.name) {
    //       friendProfiles.push(profile)
    //     }
    //   }
    // }
    req.session.friends = []
    for(let i=0; i< friends.length; i++){
      req.session.friends = req.session.friends.concat(profiles.filter(profile => profile.name === friends[i]))
    }
   res.status(200).json(req.session)

  }
};
