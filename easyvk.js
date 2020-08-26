const easyvk = require("easyvk")
 
//Authenticating user
easyvk({
    token: "297b80f9220331c20dec98a57b982ab67067fd6ebe6a60617bef43341fc500198302b1c249bce04ad55d3",
    reauth: true,
    mode: 'highload',
    utils: {
        bots: true,
        longpoll: true,
        uploader: true
  },
  lang: ["ru", "en"]
  }).then(async (vk) => {


   
    
console.log("bot is started!");
console.log("group_id: ",vk.session.group_id);
console.log("group_name: ",vk.session.group_name);
let conversations = await vk.call('messages.getConversations')
  conversations = conversations.items.filter(a =>
	a.conversation && a.conversation.peer.type === "chat"
  )
console.log("converstions: ",conversations);

 

// if (conversations.length) {
// 	let response = await vk.call('messages.send', {
// 	  peer_id: conversations[0].conversation.peer.id,
// 	  message: "Всем привет!"
// 	})

// 	console.log(response)
//   }

  vk.bots.longpoll.connect({
    forGetLongPollServer: {
      grop_id: conversations[0].conversation.peer.id
    },
    forLongPollServer: {}
  }).then((connection) => {
    
     

    connection.on("message_new", async (msg) => {
    
   
   
   
   let TextMessage = await vk.call('messages.getById', {
     message_ids: msg
   });
   

    if(msg.text ===`!repMes`){
      for (let i = 0; i < 10; i++) {
         await vk.call("messages.send", {
        peer_id: conversations[0].conversation.peer.id,
        message: `${i}`,
        random_id: easyvk.randomId()
      }).catch(console.error);
        
      }
    }

    if(msg.text === "!timer"){

      await vk.call("messages.send", {
        peer_id: conversations[0].conversation.peer.id,
        message: ` вытаймер готов!`,
        random_id: easyvk.randomId()
      }).catch(console.error);

      let end_date = new Date("June 2, 2020 13:23:00").getTime();

      let timerId = setInterval(async function(){
    

        let now = new Date().getTime();
        console.log('now: ', now);
        let distance = end_date - now;
        let days = Math.floor(distance % (1000*60*60*24));
        let hours = Math.floor((distance % (1000 *60 *60 *24))/ (1000* 60 *60));
        let minutes = Math.floor((distance %(1000 *60 *60)) / (1000* 60));
        let seconds = Math.floor ((distance % (1000*60))/1000);

        if (distance <= 0){
          clearInterval(timerId);
          await vk.call("messages.send", {
            peer_id: conversations[0].conversation.peer.id,
            message: ` #####################
                           время вышло!
                      #####################`,
            random_id: easyvk.randomId()
          }).catch(console.error);
        }else{

          console.log(days + "d" + hours + "h" + minutes + "m" + seconds + "s");
          // let res = new Date(ms_left);
          // let str_timer = `${res.getUTCFullYear() - 1970}.${res.getUTCMonth()}.${res.getUTCDate() - 1} ${res.getUTCHours()}:${res.getUTCMinutes()}:${res.getUTCSeconds()}}`;
          // console.log(str_timer);
        }

      }, 1000)
      
      
        
      
    }

   if (msg.text === "!time"){
     let now = new Date();
     
     await vk.call("messages.send", {
        peer_id: conversations[0].conversation.peer.id,
        message: `Today is ${now.getDate()}.${now.getMonth()}.${now.getFullYear()} -- ${now.getHours()} : ${now.getMinutes()}`,
        random_id: easyvk.randomId()
      }).catch(console.error);
   }
   if (msg.text === "!rep"){
     setTimeout(async() => {
       await vk.call("messages.send", {
        peer_id: conversations[0].conversation.peer.id,
        message: `я показал это через 5 секунд! `,
        random_id: easyvk.randomId()
      }).catch(console.error);
     }, 5000);
   }
  if (msg.text === "!buy"){
     await vk.call("messages.send", {
        peer_id: conversations[0].conversation.peer.id,
        message: `пока! `,
        random_id: easyvk.randomId()
      }).catch(console.error);
  }

  
   
      //On message event
      // await vk.call("messages.send", {
      //   peer_id: conversations[0].conversation.peer.id,
      //   message: "Reply it!",
      //   random_id: easyvk.randomId()
      // }).catch(console.error);

      // await vk.call("messages.send", {
      //   peer_id: conversations[0].conversation.peer.id,
      //   message: "25 tebe!",
      //   random_id: easyvk.randomId()
      // }).catch(console.error);

      // await vk.call("messages.send", {
      //   peer_id: conversations[0].conversation.peer.id,
      //   message: "i love these slaves!",
      //   random_id: easyvk.randomId()
      // }).catch(console.error);

      // await vk.call("messages.send", {
      //   peer_id: conversations[0].conversation.peer.id,
      //   message: " все гасите свет, ярик вырубай!",
      //   random_id: easyvk.randomId()
      // }).catch(console.error);
 
    });
 
  });
  }).catch((error)=>{
    console.log(error);
    done();
  });