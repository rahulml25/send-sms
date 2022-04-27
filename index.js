const
express = require('express'),
ejs = require('ejs'),
//Nexmo = require('nexmo'),
fast2sms = require('fast-two-sms'),
socketIo = require('socket.io'),
dotenv = require('dotenv').config();

/*
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
}, {debug:true});
*/

const app = express();

app.set('view engine','html');
app.engine('html', ejs.renderFile);

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
  res.render('index');
});

app.post('/', async (req, res)=>{
  const {number, message} = req.body;
  const options = {
    authorization : process.env.API_KEY,
    message,
    numbers: [number],
  };
  const response = await fast2sms.sendMessage(options);
  res.json(response);
  /*nexmo.message.sendSms(
    '12034848525',
    number, message,
    {type:'unicode'},
    (err, responseData) => {
      if (err) {
      	res.status(400).json(err);
      } else {
        res.json(responseData);
      }
    }
  );*/
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
})
