var express = require("express");
var router = express.Router();
const path = require('path'); 
const playerModel = require("./player"); // Import the playerModel



var app = express();
var port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use('/nodejs-player-app/Styles', express.static(path.join(__dirname,'..', 'Styles')));

app.get('/', function (req, res) {
  res.render('index');
});

router.get("/create", async function (req, res) {
  try {
    const newPlayer = await playerModel.create({
      image:"https://i.ytimg.com/vi/Nn_u3IqSFw4/maxresdefault.jpg",
      firstname: 'Mahatma', 
      lastname: 'Gandhi',
      age: 300,
      team: 'India', 
      totalMatches: 1000
    });
    res.send(newPlayer); 
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/players", async function (req, res) {
  try {
    const players = await playerModel.find();
    res.render('Allplayers', { players: players });
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Route to display a specific player's details
router.get('/player/:id', async (req, res) => {
  const playerId = req.params.id;
  try {
    const player = await playerModel.findById(playerId);
    if (!player) {
      console.log(`Player with ID ${playerId} not found`);
      return res.status(404).send('Player not found');
    }

    // Find the next player based on some criteria (for example, finding the player with an ID greater than the current player's ID)
    const nextPlayer = await playerModel.findOne({ _id: { $gt: playerId } }).sort({ _id: 1 });

    res.render('playerDetails', { player: player, nextPlayer: nextPlayer });
  } catch (error) {
    console.error('Error fetching player:', error);
    res.status(500).send('Error fetching player');
  }
});

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});