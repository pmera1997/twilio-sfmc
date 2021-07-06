'use strict';
// Module Dependencies
// -------------------
var express     = require('express');
var bodyParser  = require('body-parser');
var errorhandler = require('errorhandler');
var http        = require('http');
var path        = require('path');
var request     = require('request');
var routes      = require('./routes');
var activity    = require('./routes/activity');

const MessagingResponse = require('twilio').twiml.MessagingResponse;


var app = express();

//Configuration for inbound message

app.post('/message', (req, res) => {
  const twiml = new MessagingResponse();
  console.log(req.body);
  console.log("Sended from="+req.body.From);
  console.log("Body:"+req.body.Body);
  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

/*app.post('/message',function(req,res){
  console.log(req.body);
  console.log("Sended from="+req.body.From);
  console.log("Body:"+req.body.Body);

  res.send(`
          <Response>
             <Message> Hello this message is sended to ${req.body.From}
             </Message> 
          </Response>   
          `);
});
*/

//End of Configuration for inbound message

// Configure Express
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json({type: 'application/json'})); 
app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

// Express in Development Mode
if ('development' == app.get('env')) {
  app.use(errorhandler());
}

// HubExchange Routes
app.get('/', routes.index );
app.post('/login', routes.login );
app.post('/logout', routes.logout );


// Custom Hello World Activity Routes
app.post('/journeybuilder/save/', activity.save );
app.post('/journeybuilder/validate/', activity.validate );
app.post('/journeybuilder/publish/', activity.publish );
app.post('/journeybuilder/execute/', activity.execute );
//app.post('/journeybuilder/message/', activity.message );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
