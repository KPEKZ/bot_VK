const easyvk = require('easyvk');
const fetch = require('node-fetch');
const { sendMessage } = require('node-vk-bot-api/lib/methods');
const puppeteer = require('puppeteer');
const Gif = /\!gif [A-z]*/;
const tok1 = '79fb9b835fa7ee068aa0755a2146ccb450a1e8604a3356322bc0af70b20ea965730d5e8820867c00bd1e9';

easyvk({
  token: tok1,
  reauth: true,
  mode: 'highload',
  utils: {
    bots: true,
    longpoll: true,
    uploader: true
  },
  lang: ["ru", "en"]
}).then(async vk => {
  
  let peerId = 370112155 // ID получателя

  //let conversations = await vk.call('messages.getConversations');
  //console.log('conversations: ', conversations.items);

  /** Подключаемся к LongPoll */
  let connection = await vk.bots.longpoll.connect();
  
 /** Выставляем прослушивание сообщений */
  connection.on("message_new", async (msg) => {
    if (msg.text.match(Gif)) {

        let SubStr = msg.text.match(Gif);
        let search_term = SubStr[0].substring(5, SubStr[0].length);
        (async () => {
          let apikey = "X62CWH5HRXMV";
          let lmt = 8;
        
          let search_url = "https://g.tenor.com/v1/search?q=" + search_term + "&key=" +
            apikey + "&limit=" + lmt;

          let response = await fetch(search_url);
          let clearRes = await response.json();
          let responseGif = clearRes.results[0]["media"][0]["nanogif"]["url"];


          await vk.post("messages.send", {
            peer_id: peerId,
            message:  responseGif,
          
            random_id: easyvk.randomId()
          }).catch(console.error);

          await vk.post("allowMessagesFromGroup", {
            peerId : peerId
          }).catch(console.error);

        })();

      }
  })


 // console.log(response) // Выводим ID отправленного сообщения
}).catch(err => {console.log(err);});