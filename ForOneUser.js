const easyvk = require('easyvk');
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const https = require('https');
const request = require('request');
let messageArr = [];
const cheerio = require('cheerio');
const { next } = require('node-vk-bot-api/lib/methods');

easyvk({
  token: '1498fc41e347e749f58880f67b5770045eda25199556ed547848fff92776bb5fee576b07f63ef5e414fa6'
}).then(vk => {
    count = 0;
    request('https://www.anekdot.ru/tags/%D0%B2%D0%BE%D0%B2%D0%BE%D1%87%D0%BA%D0%B0', async function (error, response, body) {
        try {
            const $ = await cheerio.load(body);
            console.log('###################################################');
            while(count < 20)
            {
                
                const rate = $('.text').eq(count).text();
                messageArr.push(rate);
               //console.log(rate);
                count++;
            }
            console.log('###################################################');
        } catch (error) {
            next(error);
        }

        //console.log(messageArr);
      })();

  async function getMessage (msgArray = []) {
	const MESSAGE_ID__INDEX = 1;

	return vk.call('messages.getById', {
	  message_ids: msgArray[MESSAGE_ID__INDEX]
	})
  }

  // Подключаемся к серверу для "прослушивания" пользователя
  vk.longpoll.connect().then((connection) => {

	// Слушаем сообщения пользователя
	connection.on('message', async (msg) => {

       

	  // сообщение для User LongPoll хранится в массиве
	  let fullMessage = await getMessage(msg);
     

	  fullMessage = fullMessage.items[0]

	  if (!fullMessage.out) { // если это не наше сообщение

		  vk.call('messages.send', {
			user_id: fullMessage.user_id,
			message: messageArr[Math.floor(Math.random()*messageArr.length)],
		  random_id: easyvk.randomId()
		  });

	  }

	})

  })

})