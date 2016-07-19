import witbot from 'witbot';
import Botkit from 'botkit';
import dotenv from 'dotenv';
dotenv.config()
const witToken = process.env.WIT_TOKEN
const slackToken = process.env.SLACK_TOKEN
console.log(witToken, slackToken)