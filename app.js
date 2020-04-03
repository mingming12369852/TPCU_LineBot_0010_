const linebot = require('linebot');
const express = require('express');
var fs = require("fs")
const version = 'v0.1.7';
var status = 0; //對話狀態
var time = 0; //用戶傳送影片的順序
var lol = ["1、閉上眼睛，我看到了我的前途……", "2、玩感情？我會讓你哭的很有節奏。", "3、有緣人終成正果，有情人終成網友！", "4、英雄不問出路，流氓不看歲數。", "5、水至清則無魚，人至賤則無敵。", "6、笨男人要結婚，笨女人要減肥。", "7、別跟我談感情，談感情傷錢。", "8、要適當吃一點，才有力氣減肥。", "9、好酷呀，可是人不可能沒有感情呀！", "10、哈哈，你的意思是我們現在就見面？", "11、流汗流血不流淚，泡茶泡吧不泡妞。", "12、每個人都是怪物，每句話都是真。", "13、永遠有多遠？你小子就給我滾多遠！", "14、嗯，至理名言，你受過感情的傷呀？", "15、玩什麼都別玩愛情，信什麼也別信男人。", "16、當褲子失去皮帶，才懂得什麽叫做依賴。", "17、微信就是牛逼，硬是把手機搞成對講機。", "18、學霸們差不多得了，別考的太脫離群眾。", "19、路見不平一聲吼，吼完繼續往前走。", "20、鮮花往往不屬於賞花的人，而屬於牛糞。", "21、一句“拿著”勝過兩句“我會給你的”。", "22、收銀員說：沒零錢了，找你兩個塑料袋吧！", "23、最易接近的是身體，最難接近的是心靈。", "24、好男人應在床上勇猛，好女人應在床上放蕩。", "25、幽默就是一個人想哭的時候還有笑的興致。", "26、舌頭比牙齒更長壽，軟件比硬件更加長久。", "27、個頭大就一定厲害嗎？恐龍不是照樣滅絕了！", "28、男人好色稱為色狼，男人不好色稱為色盲。", "29、幸福是個比較級，要有東西墊底才感覺得到。", "30、女人因為成熟而滄桑，男人因為滄桑而成熟。", "31、八仙過海，各找各媽。八仙過海，請係好安全帶。", "32、考試害了多少孩子，讓多少誠實的孩子學會了作弊。", "33、愛與恨都是寂寞的空氣，哭與笑表達同樣的意義。", "34、善意的謊言：就是給自己的欺騙找一個很好的藉口。", "35、我的人生有A面也有B面，你的人生有S面也有B面。", "36、當男人遇見女人，從此只有紀念日，沒有獨立日。", "37、女人希望男人表露心靈，男人希望女人裸露身體。", "38、天啊，和你生活在一起會累死了，肯定沒人會嫁給你。", "39、男人的痛苦從結婚開始，女人的痛苦從認識男人開始。", "40、不是吧，我怎麼聽說男人對不單純的女人也感興趣？", "41、床前放手機，疑是怕沒電，抬頭看信息，低頭寫情詩！", "42、蒸桑拿蒸饅頭不爭名利，彈吉它彈棉花不談感情。", "43、做與不做的最大區別是：後者擁有對前者的評論權。", "44、婚姻就像迷宮，蓋婚姻的人自己就已經先迷路了。", "45、我不是廣場上算卦的，嘮不出那麼多你愛聽的嗑。", "46、你必須承認，身邊總有一些朋友笑聲比笑話還好笑…", "47、花好不常開，青春不常在，趁你還年輕，抓緊談戀愛。", "48、泡酒吧的男人是找刺激的，而女人，多半是受過刺激。", "49、我心眼兒有些小，但是不缺；我脾氣很好但不是沒有！", "50、有時候，不是對方不在乎你，而是你把對方看的太重。", "51、解釋就係掩飾，掩飾等於無出色，無出色不如回家休息！", "52、我的優點是：我很帥；但是我的缺點是：我帥的不明顯。", "53、女人喜歡的男人越成熟越好，男人喜歡的女孩越單純越好。", "54、什麼是幸福？幸福就是貓吃魚，狗吃肉，奧特曼打小怪獸！", "55、當你想不通的時候，想一下自己是在中國，一切就豁然開朗了。", "56、大山不是堆的，火車不是推的，積極不是催的，牛皮是你吹的！", "57、嫁雞隨雞；嫁狗隨狗；嫁到猴子通山跑；嫁給我請你吃燒鵝！", "58、聽見某個名字，想起某些事情，這個城市安靜的讓人心顫。", "59、女人是水做的，男人是泥做的，李俊基李宇春都是水泥做的。", "60、父母忽悠孩子叫教育；孩子忽悠父母叫欺騙；互相忽悠叫代溝。", "61、刷牙是一件悲喜交加的事情，因為一手拿著杯具，一手拿著洗具。", "62、世上本沒有對與錯，是因為說對與錯的人多了，便有了對與錯。", "63、白素貞放了個屁，許仙恍然大悟道：“娘子，莫非你是響尾蛇。”", "64、在中國隊面前，穿黃色球衣的泰國隊恍惚間也有了巴西隊的風範。", "65、和人接觸的時間越長，我就越喜歡狗，狗永遠是狗，人有時候不是人！", "66、新婚之夜別爛醉，夫妻生活莫太累，計劃生育要學會，白頭道老才最對。", "67、患難屬於夫人，浪漫屬於情人。合家歡樂屬於夫人，孤單寂寞屬於情人。", "68、親愛的、可愛的，不如一張十塊的！親愛的、可愛的，不如老人頭排隊的！", "69、哥挎瓜筐過寬溝，筐漏哥慌瓜滾溝，哥隔寬溝瓜筐扣，瓜落筐漏哥怨溝。", "70、做男人無能會使女人寄希望於未來，做女人失敗會使男人寄思念於過去。", "71、我是瘋兒，你是傻，稀里糊塗成了家", "72、米篩篩米米中心，囑妹戀郎要真心，莫學米篩千隻眼，要學花燭一條心。", "73、母雞生蛋不生歡迎雞，生下雞蛋變成雞，雞蛋變雞費工夫，何不當初就生雞。", "74、上海女性有句順口溜：一等男人怕老婆，二等男人罵老婆，三等男人打老婆。", "75、舉起兩根手指，對同學們說：“同學們，學好數學關鍵就是三個字！多做練習。", "76、小姐命不苦，衣破不用補；光棍命好苦，衣破無人補；老公命更苦，衣破妻不補。", "77、天不怕，地不怕，就怕老師來我家。坐俺的墩兒，喝俺的茶，老師一走媽就打。", "78、這次考試本來想一鳴驚人，可是，當試捲髮下了時，我還是決定再次隱藏實力。", "79、有太多往事就別喝下太少酒精太珍惜生命就別隨便掏心捨不得看破就別張開眼睛。", "80、有人告訴我，這世上再也沒有比愛情更複雜的東西了，我一本數學書摔在他臉上。", "81、一直沒有明白一件事，學英語可以和外國人交流，可是學文言文TMD跟鬼交流啊！", "82、從上學到放假，從校服到睡衣，從課本到漫畫，從馬尾到披頭散發，這才是學生。", "83、朋友，像狗，忠誠而且可靠，絕不站在你背後；朋友，像豬，懶惰卻也憨厚，老是跟在**後。", "84、現代男人：喝酒，一瓶兩瓶不醉。跳舞三步四步都會。打麻將五天六天不睡。做起工作，丟咚磕睡！", "85、前途是光明的，道路是曲折的。工作是輕鬆的的，賺錢是困難的。相愛是容易的，相處是艱難的。", "86、數學讓我很是疲憊，物理更是連連不對。學習真的讓我憔悴，精神馬上就要崩潰。唯有上網我是不會掉隊！", "87、一個機緣認識你，兩次見面留意你，三番四次約會你，七上八落掛念你，九成應是喜歡你，十分肯定我愛你。", "88、你有點靈氣，我有點傻氣，你有點秀氣，我有點土氣你有點香氣，我有點酒氣，如果你生氣，我不會發皮氣。", "89、你很賢惠，閒在家裡什麼都不會，你很可愛，可憐沒人愛，你是美女，發霉的女生，你我有姦情，堅定不移的友情。", "90、分不在高，及格則行，學不在深，能抄則靈，斯是教室，唯吾靜心，學習上不去，音樂課上聽，渴了有雪碧，困了去迪廳。", "91、三生有幸結識你，八方來客不再理；婦輩皆羨你質麗，女艷摯愛你兼具；節令逢春休爽氣，快馬慢趕作知己，樂憂共享幾世紀。", "92、我很優秀的，一個優秀的男人，不需要華麗的外表，不需要有淵博的知識，不需要有沉重的錢袋，只要他的思想夠豐富，學會在茫茫網絡中隱藏自己的鋒芒，就足夠了…"]

var userID;
// 本機測試
// const bot = linebot({
//   channelId: '1653984063',
//   channelSecret: '2cf7831a10e737ed5a961f55b554aba8',
//   channelAccessToken: 'xPq70ID8sUOuyW4eoWYRt9Q0WpIk3VZ0ihdk28s9geYCdi6d/9dxDWPaufAvrW/GjdxSKN0Zf/f9A1YMYteFUlFrOaQ0ZFeBRpGHF1Vu7lxs5rjRdliKsOip8vdADQonaSIluZO3VChaN4RRvB5M4wdB04t89/1O/w1cDnyilFU='
// });

// // 正式上線
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

var mueu = {
  "type": "bubble",
  "hero": {
    "type": "image",
    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
    "size": "full",
    "aspectRatio": "20:13",
    "aspectMode": "cover",
    "action": {
      "type": "uri",
      "uri": "http://linecorp.com/"
    }
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [{
        "type": "text",
        "text": "Brown Cafe",
        "weight": "bold",
        "size": "xl"
      },
      {
        "type": "box",
        "layout": "baseline",
        "margin": "md",
        "contents": [{
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
          },
          {
            "type": "text",
            "text": "4.0",
            "size": "sm",
            "color": "#999999",
            "margin": "md",
            "flex": 0
          }
        ]
      },
      {
        "type": "box",
        "layout": "vertical",
        "margin": "lg",
        "spacing": "sm",
        "contents": [{
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [{
                "type": "text",
                "text": "Place",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [{
                "type": "text",
                "text": "Time",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": "10:00 - 23:00",
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ]
          }
        ]
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [{
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "uri",
          "label": "CALL",
          "uri": "https://linecorp.com"
        }
      },
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "uri",
          "label": "WEBSITE",
          "uri": "https://linecorp.com"
        }
      },
      {
        "type": "spacer",
        "size": "sm"
      }
    ],
    "flex": 0
  }
};
const app = express();

const linebotParser = bot.parser();

app.get('/', function(req, res) {
  res.send("Helo");
});

app.post('/linewebhook/', linebotParser);

//啟動LineBot 機器人 對話狀態
RunLineBot();

function RunLineBot() {
  bot.on('message', function(event) {
    console.log(event);

    var userSay = event.message.text;
    //判斷 用戶傳送的訊息的格式
    switch (status) {
      case -1:
        if (userSay == '說話') {
          event.reply(['&!#(*$(!#*&@^()))', "終於可以說話了. "]);
          status = 0;
        }

        break;

      case 0:

        switch (event.message.type) {
          case 'text':

            switch (event.message.text) {
              case '如何使用？':
                event.reply('請輸入繳交資料並以格式輸入');

                break;
              case '繳交資料':
                event.reply(['請輸入學號....', '17碼 \n 例:"12345678 12345678"', '取消上繳資料輸入：取消']);
                status = 1;
                break;

              case '閉嘴':
                event.reply(['好啦！幹兇屁']);
                status = -1;
                console.log(status);
                break;

              default:

                var number = Math.floor(Math.random() * 92) + 1;
                event.reply(lol[number]);
            }


            break;


        }

        break;

      case 1:

        if (userSay.length == 17) {
          // console.log('==END==');
          status = 0;
          event.reply(['輸入正確....', '請開始上傳影片']);
          userID = userSay;
          status = 'upvideo';
          time = 0;
        } else if (userSay == "取消") {
          event.reply(['正在關閉連線...']);
          console.log('==END==');
          status = 0;
          console.log(status);
        } else if (userSay.length != 17) {
          event.reply(['輸入格式錯誤....']);

        }


        break;

      case 'upvideo':

        if (event.message.type == 'text') {
          event.reply(['請上傳影片', '或輸入"完成"來離開操作']);

          if (event.message.text == '完成') {
            event.reply(['正在關閉連線...']);
            status = 0;
          }

        } else if (event.message.type == 'video') {

          time++;
          userID = userID.replace(/\s/g, "_");
          event.reply(['已經接收到影片', '名稱：' + userID + '_' + time]);
          //影片轉換成base64
          // event.message.content().then(function(content) {
          //   console.log(content.toString('base64'));
          // });
        }
        break;
    }





  });
}

app.listen(process.env.PORT || 80, function() {
  console.log('LineBot is running Time.');
});
