// //const VkBot = require('node-vk-bot-api')
// const {Botact} = require('botact');
// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const bot = new Botact({
//     token: '297b80f9220331c20dec98a57b982ab67067fd6ebe6a60617bef43341fc500198302b1c249bce04ad55d3',
//     confirmation: 'b46e2c1e'
// })


// // bot.command('/start', (ctx) => {
// //   ctx.reply('Hello!')
// // })
//  bot.on(function(ctx){
//      console.log(ctx.body);
//      ctx.reply('hello');
//  });

//  bot.command('start', function(ctx){
//      ctx.reply('started!');
//  });

//  bot.command('time', function(ctx){
//      const date = new Date();
//      const h = date.getHours();
//      const m = date.getMinutes();
//      const s = date.getSeconds();
//      const time = 'now is'+ h + ":" + m + ':' +s;
//      ctx.reply(time);

//  })
// app.use(bodyParser.json());
// //bot.startPolling()

// app.post('/', bot.listen);
// app.listen(80, ()=>{
//     console.log("started!");
// });


//const express = require('express')
//const bodyParser = require('body-parser')
//const VkBot = require('node-vk-bot-api')
const VkBot = require('node-vk-bot-api');
 
const bot = new VkBot('297b80f9220331c20dec98a57b982ab67067fd6ebe6a60617bef43341fc500198302b1c249bce04ad55d3');
 
bot.command('/start', (ctx) => {
    console.log('ctx: ', ctx);
  ctx.reply('Hello!')
})
 
bot.startPolling(() => {
    console.log('Bot started.')
  })
 
//const app = express()
// const bot = new VkBot({
//   token: '297b80f9220331c20dec98a57b982ab67067fd6ebe6a60617bef43341fc500198302b1c249bce04ad55d3',
//   confirmation: 'b46e2c1e'
// })
 
// bot.on((ctx) => {
//   ctx.reply('Hello!')
// })


 
//app.use(bodyParser.json())
 
//app.post('/', bot.webhookCallback)
 
//app.listen(80)