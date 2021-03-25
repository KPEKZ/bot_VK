const VkBot = require('node-vk-bot-api');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const url = 'https://www.anekdot.ru/random/anekdot/';
const botconfig = require("./botconfigs.json");
const { json } = require('body-parser');
const prefix = (botconfig.prefix);
const commands = [`${prefix}start`,`${prefix}time`,`${prefix}joke`];
let keyWord = "";

const bot = new VkBot({
    token: '297b80f9220331c20dec98a57b982ab67067fd6ebe6a60617bef43341fc500198302b1c249bce04ad55d3',
    group_id: process.env.group_id
});




bot.command('!start', (ctx) => {
  ctx.reply('я уже тут');
});

bot.command('!wake up', (ctx) => {
  ctx.reply('Здарова, Отец!');
});


bot.command('!time', (ctx) => {
    let now = new Date();
    ctx.reply(`Today is ${now.getDate()}.${now.getMonth()}.${now.getFullYear()} -- ${now.getHours()} : ${now.getMinutes()}`);
  });

  bot.command('!lox', (ctx) => {
    ctx.reply(`are u stupid?`);
  });

bot.command('!joke', (ctx) => {
    (async() => {
        // Запустим браузер
        const browser = await puppeteer.launch({
          args: ['--no-sandbox'] }
        );
        // Откроем новую страницу
        const page = await browser.newPage();
        const pageURL = url;
        
        try {
          // Попробуем перейти по URL
          await page.goto(pageURL);
          console.log(`Открываю страницу: ${pageURL}`);
          const joke = await page.evaluate(() => {
              return document.querySelector('div.text').innerText;
          });

          console.log(joke);
          ctx.reply(joke);

        } catch (error) {
          console.log(`Не удалось открыть
            страницу: ${pageURL} из-за ошибки: ${error}`);
        }
        // Всё сделано, закроем браузер
        await browser.close();
        
      })();

   
});



bot.command('!help', (ctx) => {
    // ctx.reply(`Вот, что я могу:`);
    // console.log('commands: ', commands);
    // commands.forEach(el => {
    //     ctx.reply(`-${el}\n`);
    // })
    
  });

  

//   bot.on((answer)=>{
//       let message = answer.message;
//        keyWord = message.text.slice(5);
//        var apikey = "X62CWH5HRXMV";

//        var lmt = 8;
//        var search_term = "excited";

//        var search_url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" +
//                apikey + "&limit=" + lmt;
   
//         let promise  = await fetch(search_url);

//         p

// })
  

bot.command('!gif', (ctx) =>{
  (async () =>{
    let apikey = "X62CWH5HRXMV";

    let lmt = 8;
    let search_term = "excited";

     let search_url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" +
              apikey + "&limit=" + lmt;
   
              let response = await fetch(search_url);
              let clearRes = await response.json();
              console.log('response: ', clearRes.results[0]["media"][0]["nanogif"]["url"]);
              ctx.reply(clearRes.results[0]["media"][0]["tinygif"]["url"]);
            
     })();


     
});
 
  
 
bot.startPolling((ctx) => { // Это запускает нашего бота
    console.log('[BOT] Здарова, Отец!'); // Сделал себе для понятности запустился или нет

    

});

