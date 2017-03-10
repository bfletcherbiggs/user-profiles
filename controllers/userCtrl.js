const users = [
{
  name: 'Preston McNeil',
  password: 'password1',
  friends: ['Lindsey Mayer', 'Terri Ruff']
},
{
  name: 'Ryan Rasmussen',
  password: '$akgfl#',
  friends: ['Lindsey Mayer']
},
{
  name: 'Terri Ruff',
  password: 'hunter2',
  friends: ['Lindsey Mayer', 'Preston McNeil']
},
{
  name: 'Lindsey Mayer',
  password: '777mittens777',
  friends: ['Preston McNeil', 'Ryan Rasmussen', 'Terri Ruff']
}
]


module.exports={
  login: function (req,res,next){
    const currentUser = users.find(ele => ele.name === req.body.name && ele.password === req.body.password)

    if(!currentUser){
      res.status(401).json({userFound:false})
    }
    else{
    req.session.currentUser = currentUser
    res.status(200).json({userFound: true})
    }
  },
  updateFriend:function(req,res,next){
      req.session.currentUser.friends.push(req.body.name)
      res.status(200).json(req.session.currentUser.friends)
  },
  deleteFriend:function(req,res,next){
    var friendIndex = req.session.currentUser.friends.indexOf(req.params.name)
    req.session.currentUser.friends.splice(friendIndex,1)
    res.status(200).json(req.session.currentUser.friends)
  }
}

// module.exports = users;
