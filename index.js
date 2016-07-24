import witbot from 'witbot';
import Botkit from 'botkit';
import dotenv from 'dotenv';
import {Wit, log} from 'node-wit';
import apiai from 'apiai';
dotenv.config()
const witToken = process.env.WIT_TOKEN
const slackToken = process.env.SLACK_TOKEN
console.log(witToken, slackToken)

const controller = Botkit.slackbot({
	debug: false
})

// controller.spawn({
// 	token: slackToken
// }).startRTM((err, bot, payload) => {
// 	if(err){ console.log('Error occured while connecting', err)}
// 		else{
// 			console.log('Connected to slack');
// 		}
// })

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    return new Promise(function(resolve, reject) {
      console.log('sending...', JSON.stringify(response));
      return resolve();
    });
  },
  getForecast({context, entities}) {
    return new Promise(function(resolve, reject) {
      var location = firstEntityValue(entities, 'location')
      if (location) {
        context.forecast = 'sunny in ' + location; // we should call a weather API here
        delete context.missingLocation;
      } else {
        context.missingLocation = true;
        delete context.forecast;
      }
      return resolve(context);
    });
  },
};

const client = new Wit({accessToken: witToken, actions});
client.interactive();

controller.hears('hello', ['direct_mention', 'direct_message', 'mention'], (bot, message) => {
	bot.reply(message, 'This is the test phase of the application');
})
