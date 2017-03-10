const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const port = 3000
const config = require('./config.js')
const profileCtrl = require('./controllers/profileCtrl.js')
const userCtrl = require('./controllers/userCtrl.js')
const app = express();
const corsOptions = {
  origin:`http://my-localserver:${port}`
}

app.use(express.static(__dirname + '/public'))
// Middleware
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(session({ secret: config.sessionSecret }));

app.get('/api/friends',profileCtrl.getFriends)
app.post('/api/login', userCtrl.login)
app.get('/api/profiles', profileCtrl.getProfiles)
app.put('/api/friends', userCtrl.updateFriend)
app.delete('/api/friends/:name',userCtrl.deleteFriend)


app.listen(port, function(){
  console.log(`Listening on ${port}`)
})
