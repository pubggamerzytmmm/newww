const Telegraf = require('telegraf');
const Extra = require('telegraf/extra');
const Markup = require('telegraf/markup');
const bot = new Telegraf("630429789:AAFKWwvXvU7Kt_GADkWL_5YGeArIN7s-JbI");
const Scene = require('telegraf/scenes/base')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const { enter,leave } = Stage
var eth='1f7d2e80-984a-500f-b433-4f249925e6a0'
var ltc='8868e55d-94e0-5342-8823-2e87e2d7c062'
var btc='d63b2e5d-4e54-5990-943f-ef5788433df1'
var cron = require('node-cron');
var mysql = require('mysql');
var WAValidator = require('wallet-address-validator');
var coinbase = require('coinbase');
var Coinbase = require('coinbase');
var Client = require('coinbase').Client;
var mysecret = '8eDpUW9PJ7E16xlns9msu5vUNxth9G0A'
var mykey = 'JaH2VY37PArRPeod'
var client = new Client({'apiKey': mykey, 'apiSecret': mysecret});
var con = mysql.createConnection({
    host: "bvsdkkby7-mysql.services.clever-cloud.com",
    user: "uqsetrzdlurw3dct",
    password: "54dPbaLMebOOUtsqRiQ",
    database:"bvsdkkby7"
});

//server

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
//coinpayments
var mysecrete = '335ed5Ac0eEb15b5cD15654E97b3Cf14bFf27f8e094020f173e6a1Ca2F4F4a94'
var mykeye = 'ad60ad890f72438ec726a05f581052d25ca0f4c8362e94eb3d40c198304241ce'
var Coinpayments = require('coinpayments');
const cliente = new Coinpayments({
    key: mykeye,
    secret: mysecrete
});

//catch error
bot.catch((err) => {
    console.log('Ooops', err)
})



//menu refferal start

bot.use(Telegraf.log());





//start
bot.command('start',ctx => {
    var message = ctx.message;
    var id = ctx.from.id;
    var start = '/start';
    con.query("SELECT id FROM account WHERE id=" + id, function (err, result, fields) {
        console.log(result.length)
        if (message.text == start&&result.length===0) {
            var chatid = ctx.from.id;
            var firstname = ctx.from.first_name;
            var bal = 0;
            var tim = new Date();
            var address = 'none';
            var refa = 411002680;
            var user = {id: chatid, balance: bal, firstname: firstname, time: tim, withdrawadd: address, ref: refa};
            con.query("insert into `account` SET ?", user, function (error, results) {
                console.log(error)
                ctx.replyWithHTML('welcome🖐🏻 ' + ctx.from.first_name + ' to adsview bot.Earn 💰Crypto by:\n<b>👁Viewing ads</b>\n<b>🚶🏻Joining groups</b>\n<b>👁‍🗨Viewing bots</b> and other tasks available ', Markup
                    .keyboard([
                        ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                        ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                        ['💸Balance'],
                        ['📈Stastistics','⚙️Settings']
                    ])

                    .resize()
                    .extra())
            })

        } else if (message.text.split(start)[1] == id) {
            ctx.reply('🚫You cannot refer yourself', Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())
        } else if (message.text.split(start)[1] !== id) {

            var chatd = ctx.from.id
            con.query("SELECT id FROM account WHERE id=" + chatd, function (err, result, fields) {
                console.log(result.length)
                if (result.length === 0) {

                    var chatidi = ctx.from.id;
                    var firstnamee = ctx.from.first_name;
                    var bala = 0;
                    var time = new Date();
                    var addresse = 'none';
                    var refidi = message.text.split(start)[1]
                    var useri = {
                        id: chatidi,
                        balance: bala,
                        firstname: firstnamee,
                        time: time,
                        withdrawadd: addresse,
                        ref: refidi,
                    };
                    con.query("insert into `account` SET ?", useri)

                    var chatd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + chatd, function (err, result, fields) {

                        if (result[0].ref !== refidi) {
                            var ref = 1;
                            var refid = message.text.split(start)[1];
                            var sql = "UPDATE account SET friends=`friends`+'" + ref + "'WHERE id='" + refid + "'";



                            con.query(sql)

                            ctx.replyWithHTML('welcome🖐🏻 ' + ctx.from.first_name + ' to adsview bot.Earn 💰Crypto by:\n<b>👁Viewing ads</b>\n<b>🚶🏻Joining groups</b>\n<b>👁‍🗨Viewing bots</b> and other tasks available ', Markup
                                .keyboard([
                                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                    ['💸Balance'],
                                    ['📈Stastistics','⚙️Settings']
                                ])


                                .resize()
                                .extra())
                            con.query("SELECT id FROM account WHERE id=" + refid, function (err, result, fields) {
                                ctx.telegram.sendMessage(result[0].id, 'you have a new refferal 👏🏻')


                            })
                        }
                    })

                } else if (result.length > 0) {
                    var rd = ctx.from.id
                    con.query("SELECT ref FROM account WHERE id=" + rd, function (err, result, fields) {
                        if (result[0].ref == ctx.message.text.split(start)[1]) {
                            ctx.reply('🚫you have already used this link', Markup
                                .keyboard([
                                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                    ['💸Balance'],
                                    ['📈Stastistics','⚙️Settings']
                                ])

                                .resize()
                                .extra())
                        } else if (result[0].ref !== ctx.message.text.split(start)[1]) {
                            ctx.reply('???', Markup
                                .keyboard([
                                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                                    ['💸Balance'],
                                    ['📈Stastistics','⚙️Settings']
                                ])

                                .resize()
                                .extra())
                        }
                    })
                }
            })
        }
    })
})
//ads menu
bot.hears('🏞Ads',ctx => {
    ctx.replyWithHTML('<b>View ads and earn 💵Crypto</b>',Markup
        .keyboard([
            ['✅Channel', '🤖Bot'], // Row1 with 2 buttons
            ['👨‍👨‍👦Group'], // Row2 with 2 buttons
            ['🏚Menu']
        ])

        .resize()
        .extra())

})
//menu
bot.hears('🏚Menu',ctx => {
    ctx.replyWithHTML('Main menu',Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra())



})
//PROmotions
bot.hears('📢Promote',ctx => {
    ctx.replyWithHTML('<b>Choose the type of promotion that suits you below 👇🏻</b>\n\n<b>Channel: </b><i>min price 0.0000006200 BTC,0.0000243700 ETH,0.0000878300 LTC,1.0000000000 DOGE</i>\n\n<b>Group: </b><i>min price 0.0000006200 BTC,0.0000243700 ETH,0.0000878300 LTC,1.0000000000 DOGE</i>\n\n<b>Bot: </b><i>min price 0.0000006200 BTC,0.0000243700 ETH,0.0000878300 LTC,0.5 DOGE</i>',Markup
        .keyboard([
            ['✅Channel✅', '🏵Channel proms'], // Row1 with 2 buttons
            ['🤖Bot🤖','🏵Bot proms'], // Row2 with 2 buttons
            ['👨‍👨‍👦Group👨‍👨‍👦','🏵Group proms'],
            ['🏚Menu']
        ])

        .resize()
        .extra())



})
//balance and deposit
bot.hears('💸Balance',ctx => {
    var id = ctx.from.id
    con.query("SELECT balance,balanceeth,balancedoge,balanceltc FROM account WHERE id=" + id, function (err, result, fields) {
        ctx.replyWithHTML('<b>your balance</b>\n\n<b>BTC: </b><i>' + result[0].balance + '💰</i>\n<b>ETH: </b><i>' + result[0].balanceeth + '💰</i>\n<b>LTC: </b><i>' + result[0].balanceltc + '💰</i>\n<b>DOGE: </b><i>' + result[0].balancedoge + '💰</i>',Extra
            .HTML()
            .markup((m) => m.inlineKeyboard([
                m.callbackButton('💵Deposit', '💵Deposit'),
                m.callbackButton('🏦Withdraw', '🏦Withdraw')

            ], { columns: 1 })))

    })
})
//deposit
bot.action('💵Deposit',ctx=>{
    ctx.replyWithHTML('Which currency do you wish to deposit below👇🏻',Markup
        .keyboard([
            ['BTC', 'ETH'], // Row1 with 2 buttons
            ['LTC','DOGE'], // Row2 with 2 buttons
            ['🏚Menu']
        ])

        .resize()
        .extra())




})
///btc depo
bot.hears('BTC',ctx=>{
    var user=ctx.from.id
    var sql = "SELECT `depobtc` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].depobtc.length <= 0) {
            client.getAccount(btc, function (err, account) {
                account.createAddress(null, function (err, address) {
                    var adress = address.address
                    ctx.replyWithHTML('<b>Send any amount of btc to</b>\n\n<code>' + adress + '</code>\n\nThe BTC will be automatically credited to your account after deposit' )
                    var ide =ctx.from.id
                    var sqli = "update `account` set `depobtc` = '" + adress + "' where `id` = '" + ide + "'";
                    con.query(sqli, function (err, results) {
                        console.log(err)
                        ctx.replyWithHTML('<code>' + adress + '</code>')
                    })
                });
            });

        } else {
            var user = ctx.from.id
            var sqla = "SELECT `depobtc` from `account` where `id` = '" + user + "'";
            con.query(sqla, function (error, results, fields) {
                ctx.replyWithHTML('<b>Send any amount of btc to</b>\n\n<code>' + results[0].depobtc + '</code>\n\nThe BTC will be automatically credited to your account after deposit')
                    .then(() => {
                        ctx.replyWithHTML('<code>' + results[0].depobtc + '</code>')

                    })
            })
        }
    })


})

//depoeth
bot.hears('ETH',ctx=>{
    var user=ctx.from.id
    var sql = "SELECT `depoeth` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].depoeth.length <= 0) {
            client.getAccount(eth, function (err, account) {
                account.createAddress(null, function (err, address) {
                    var adress = address.address
                    ctx.replyWithHTML('<b>Send any amount of ETH to</b>\n\n<code>' + adress + '</code>\n\nThe ETH will be automatically credited to your account after deposit' )
                    var ide =ctx.from.id
                    var sqli = "update `account` set `depoeth` = '" + adress + "' where `id` = '" + ide + "'";
                    con.query(sqli, function (err, results) {
                        console.log(err)
                        ctx.replyWithHTML('<code>' + adress + '</code>')
                    })
                });
            });

        } else {
            var user = ctx.from.id
            var sqla = "SELECT `depoeth` from `account` where `id` = '" + user + "'";
            con.query(sqla, function (error, results, fields) {
                ctx.replyWithHTML('<b>Send any amount of ETH to</b>\n\n<code>' + results[0].depoeth + '</code>\n\nThe ETH will be automatically credited to your account after deposit')
                    .then(() => {
                        ctx.replyWithHTML('<code>' + results[0].depoeth + '</code>')

                    })
            })
        }
    })


})

//depo ltc
bot.hears('LTC',ctx=>{
    var user=ctx.from.id
    var sql = "SELECT `depoltc` from `account` where `id` = '" + user + "'";
    con.query(sql, function(error, results, fields) {
        if (results[0].depoltc.length <= 0) {
            client.getAccount(ltc, function (err, account) {
                account.createAddress(null, function (err, address) {
                    var adress = address.address
                    ctx.replyWithHTML('<b>Send any amount of LTC to</b>\n\n<code>' + adress + '</code>\n\nThe LTC will be automatically credited to your account after deposit' )
                    var ide =ctx.from.id
                    var sqli = "update `account` set `depoltc` = '" + adress + "' where `id` = '" + ide + "'";
                    con.query(sqli, function (err, results) {
                        console.log(err)
                        ctx.replyWithHTML('<code>' + adress + '</code>')
                    })
                });
            });

        } else {
            var user = ctx.from.id
            var sqla = "SELECT `depoltc` from `account` where `id` = '" + user + "'";
            con.query(sqla, function (error, results, fields) {
                ctx.replyWithHTML('<b>Send any amount of LTC to</b>\n\n<code>' + results[0].depoltc + '</code>\n\nThe LTC will be automatically credited to your account after deposit')
                    .then(() => {
                        ctx.replyWithHTML('<code>' + results[0].depoltc + '</code>')

                    })
            })
        }
    })


})

//depo doge
bot.hears('DOGE',ctx => {
    var ide = ctx.from.id
    con.query("SELECT depodoge FROM account WHERE id=" + ide, function (err, result, fields) {
        if (result[0].depodoge.length<=0) {
            cliente.getCallbackAddress("doge", function (err, response) {
                console.log(err)
                var chid = ctx.from.id
                var adress = response.address
                var sql = "UPDATE account SET depodoge='" + adress + "'WHERE id='" + chid + "'"
                con.query(sql)
                ctx.replyWithHTML('send any amount of doge to \n\n<code>'+adress+'</code> \n\nthe doge will automatically be credited to your account after deposit')

            })
        } else {
            var chatid = ctx.from.id
            con.query("SELECT depodoge FROM account WHERE id=" + chatid, function (err, result, fields) {
                ctx.replyWithHTML('send any amount of doge to \n\n<code>'+result[0].depodoge+'</code>\n\n the doge will be automatically credited to your account after deposit')


            })
        }
    })
})

//refferals
bot.hears('👨‍👧‍👦Refferals',ctx => {
    var ide=ctx.from.id
    con.query("SELECT friends,friendsbtc,friendsltc,friendseth,friendsdoge FROM account WHERE id=" + ide, function (err, result, fields) {
    ctx.replyWithHTML('<b>Refer friends</b>\n\ninvite friends and earn 6% of first level referals deposit,3% of second refferals deposit and 1% for third refferal deposit\n\n<b>your refferal link:</b>https://t.me/Cryptomazing_bot?start='+ctx.from.id+'\n\n <b>👥Refferals:</b> '+result[0].friends+'\n<b>💵Earned BTC:</b>'+result[0].friendsbtc+'\n<b>💵Earned ETH:</b>'+result[0].friendseth+'\n<b>💵Earned LTC:</b>'+result[0].friendsltc+'\n<b>💵Earned DOGE:</b>'+result[0].friendsdoge)


    })


})
///settings
bot.hears('⚙️Settings',ctx => {
    var ide = ctx.from.id
    con.query("SELECT btcad,ethad,ltcad,dogead FROM account WHERE id=" + ide, function (err, result, fields) {
        ctx.replyWithHTML('<b>here you can change your withdraw addresses for each coin</b>\n\n<b>Your current withdraw addresses👇🏻</b>\n<b>BTC:</b>'+result[0].btcad+'\n<b>ETH:</b>'+result[0].ethad+'\n<b>LTC:</b>'+result[0].ltcad+'\n<b>DOGE:</b>'+result[0].dogead, Markup
            .keyboard([
                ['🔸BTC', '🔸ETH'], // Row1 with 2 buttons
                ['🔸LTC', '🔸DOGE'], // Row2 with 2 buttons
                ['🏚Menu']
            ])

            .resize()
            .extra())


    })
})

//promotions


















//scenes
const btcscene = new Scene('btc')
btcscene.enter((ctx) => ctx.reply('send your BTC wallet address to be used for withdrwals below to update it',Markup
    .keyboard([
        ['🛑cancel'], // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)
btcscene.hears('🛑cancel',ctx => {ctx.scene.leave()})
btcscene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
        ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
        ['💸Balance'],
        ['📈Stastistics','⚙️Settings']
    ])

    .resize()
    .extra())
)
btcscene.on('message', (ctx) => {
    var valid = WAValidator.validate(ctx.message.text, 'BTC');
    if (valid) {
        var ide = ctx.from.id
        var sqli = "update `account` set `btcad` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli)
        ctx.replyWithHTML('<b>withdraw address updated</b>', Markup
            .keyboard([
                ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['💸Balance'],
                ['📈Stastistics','⚙️Settings']
            ])

            .resize()
            .extra())
        ctx.scene.leave()

    } else {
        ctx.reply('invalid BTC address', Markup
            .keyboard([
                ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['💸Balance'],
                ['📈Stastistics','⚙️Settings']
            ])

            .resize()
            .extra())

        ctx.scene.leave()
    }
})

//ethad
const ethscene = new Scene('eth')
ethscene.enter((ctx) => ctx.reply('send your ETH wallet address to be used for withdrwals below to update it',Markup
    .keyboard([
        ['🛑cancel'], // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)
ethscene.hears('🛑cancel',ctx => {ctx.scene.leave()})

ethscene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
        ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
        ['💸Balance'],
        ['📈Stastistics','⚙️Settings']
    ])

    .resize()
    .extra())
)
ethscene.on('message', (ctx) => {
    var valid = WAValidator.validate(ctx.message.text, 'ETH');
    if (valid) {
        var ide = ctx.from.id
        var sqli = "update `account` set `ethad` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli)
        ctx.replyWithHTML('<b>withdraw address updated</b>', Markup
            .keyboard([
                ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['💸Balance'],
                ['📈Stastistics','⚙️Settings']
            ])

            .resize()
            .extra())
        ctx.scene.leave()

    } else {
        ctx.reply('invalid ETH address', Markup
            .keyboard([
                ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['💸Balance'],
                ['📈Stastistics','⚙️Settings']
            ])

            .resize()
            .extra())

        ctx.scene.leave()
    }
})
//ltc
const ltcscene = new Scene('ltc')
ltcscene.enter((ctx) => ctx.reply('send your LTC wallet address to be used for withdrwals below to update it',Markup
    .keyboard([
        ['🛑cancel'], // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)
ltcscene.hears('🛑cancel',ctx => {ctx.scene.leave()})

ltcscene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
        ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
        ['💸Balance'],
        ['📈Stastistics','⚙️Settings']
    ])

    .resize()
    .extra())
)
ltcscene.on('message', (ctx) => {
    var valid = WAValidator.validate(ctx.message.text, 'LTC');
    if (valid) {
        var ide = ctx.from.id
        var sqli = "update `account` set `ltcad` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli)
        ctx.replyWithHTML('<b>withdraw address updated</b>', Markup
            .keyboard([
                ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['💸Balance'],
                ['📈Stastistics','⚙️Settings']
            ])

            .resize()
            .extra())
        ctx.scene.leave()

    } else {
        ctx.reply('invalid LTC address', Markup
            .keyboard([
                ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['💸Balance'],
                ['📈Stastistics','⚙️Settings']
            ])

            .resize()
            .extra())

        ctx.scene.leave()
    }
})
//doge
const dogescene = new Scene('doge')
dogescene.enter((ctx) => ctx.reply('send your DOGE wallet address to be used for withdrwals below to update it',Markup
    .keyboard([
        ['🛑cancel'], // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)
dogescene.hears('🛑cancel',ctx => {ctx.scene.leave()})

dogescene.leave((ctx) =>  ctx.reply('Main menu', Markup
    .keyboard([
        ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
        ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
        ['💸Balance'],
        ['📈Stastistics','⚙️Settings']
    ])

    .resize()
    .extra())
)
dogescene.on('message', (ctx) => {
    var valid = WAValidator.validate(ctx.message.text, 'DOGE');
    if (valid) {
        var ide = ctx.from.id
        var sqli = "update `account` set `dogead` = '" + ctx.message.text + "' where `id` = '" + ide + "'";
        con.query(sqli)
        ctx.replyWithHTML('<b>withdraw address updated</b>', Markup
            .keyboard([
                ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['💸Balance'],
                ['📈Stastistics','⚙️Settings']
            ])

            .resize()
            .extra())
        ctx.scene.leave()

    } else {
        ctx.reply('invalid LTC address', Markup
            .keyboard([
                ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['💸Balance'],
                ['📈Stastistics','⚙️Settings']
            ])

            .resize()
            .extra())

        ctx.scene.leave()
    }
})

//promotion scene
const promoscene = new Scene('promo')
promoscene.enter((ctx) => ctx.replyWithHTML('<b>To start promoting your channel you need:</b>\n\n1️⃣add this bot(@Cryptomazing_bot) to your channels administrator\n\n2️⃣Forward any post from your channel to the bot\n\n3️⃣Follow further instructions from the bot',Markup
    .keyboard([
        ['🛑cancel'], // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)
promoscene.hears('🛑cancel',ctx => {
    con.query("DELETE FROM `ads` WHERE `ads`.`process` = 1")
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra())
        .then(()=> {
            ctx.scene.leave()
        })
})

promoscene.on('message',ctx => {
   if (ctx.message.forward_from_chat===undefined){
       ctx.reply('you need to forward the message from the channel')
   } else if (ctx.message.forward_from_chat!==undefined) {

       var useri = {
           id:ctx.from.id,
           users:0,
           link:'https://t.me/'+ctx.message.forward_from_chat.username,
           status:'inactive',
           process:1
       };
       con.query("insert into `ads` SET ?", useri)


       ctx.telegram.getChatAdministrators(ctx.message.forward_from_chat.id)
           .then(function (data) {
               if (JSON.stringify(data).indexOf('Cryptomazing_bot') !== -1) {
                   ctx.reply('🎖Good now everything is alright').then(()=>{
                     ctx.scene.enter('promo2')
                   })

               }
                   }).catch((err) => {
           ctx.reply('This bot is not an admin in that channel')
       })

               }
})
//promo2
const promo2scene = new Scene('promo2')
promo2scene.enter((ctx) =>
    con.query("SELECT balance,balanceeth,balancedoge,balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        ctx.replyWithHTML('<b>Which crypto do you wish to use</b>\n\n' + '<b>your balance</b>\n\n<b>BTC: </b><i>' + result[0].balance + '💰</i>\n<b>ETH: </b><i>' + result[0].balanceeth + '💰</i>\n<b>LTC: </b><i>' + result[0].balanceltc + '💰</i>\n<b>DOGE: </b><i>' + result[0].balancedoge + '💰</i>', Markup
                .keyboard([
                    ['◾️BTC'],
                        ['◾️ETH'],
                    ['◾️LTC'],
                    ['◾️DOGE'],
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra())

    })

)
promo2scene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra())
        .then(()=> {
            ctx.scene.leave()
        })
})

promo2scene.hears('◾️BTC',ctx => {
    con.query("SELECT balance FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
if (result[0].balance<0.0000006200){
    ctx.reply('😩 your balance is not enough to continue with this advert')
}else {
    var bal=result[0].balance
    var ad=Math.round(bal/0.0000006200)
    var currency='BTC'
    var ide=ctx.from.id
    var process=2;
    var sqli = "update `ads` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "' and `status`='inactive'";

    con.query(sqli)
    ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
        .keyboard([
            ['🛑cancel'] // Row1 with 2 buttons
        ])

        .resize()
        .extra()).then(()=>{
      ctx.scene.enter('user')
    })

}
    })


})
//eth
promo2scene.hears('◾️ETH',ctx => {
    con.query("SELECT balanceeth FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balanceeth<0.0000243700){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balanceeth
            var ad=Math.round(bal/0.0000243700)
            var currency='ETH'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `ads` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'and `status`='inactive'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('usereth')
            })

        }
    })


})
//ltc
promo2scene.hears('◾️LTC',ctx => {
    con.query("SELECT balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balanceltc<0.0000878300){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balanceltc
            var ad=Math.round(bal/0.0000878300)
            var currency='LTC'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `ads` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'and `status`='inactive'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('userltc')
            })

        }
    })


})
//doge
promo2scene.hears('◾️DOGE',ctx => {
    con.query("SELECT balancedoge FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balancedoge<1){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balancedoge
            var ad=Math.round(bal/1)
            var currency='DOGE'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `ads` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'and `status`='inactive'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('userdoge')
            })

        }
    })


})






promo2scene.hears('🛑cancel',ctx => {
    con.query("DELETE FROM `ads` WHERE `ads`.`process` = 2")
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
      ctx.scene.leave()
    })

})


//users scene
const userscene = new Scene('user')
userscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})

userscene.on('message',ctx => {
    con.query("SELECT balance FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balance
        var ad=Math.round(bal/0.0000006200)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
      ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*0.0000006200
            var process=3;
            var sql = "update `ads` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                  ctx.scene.leave()
                })

            })


        }
    })

})

userscene.leave((ctx) =>{
    con.query("SELECT link,currency,status FROM ads WHERE id=" + ctx.from.id, function (err, result, fields) {
        ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Channel promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
            .keyboard([
                ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                ['💸Balance'],
                ['📈Stastistics','⚙️Settings']
            ])

            .resize()
            .extra())


    })
    }
)

//usereth
const userethscene = new Scene('usereth')
userethscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})
userethscene.on('message',ctx => {
    con.query("SELECT balanceeth FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balanceeth
        var ad=Math.round(bal/0.0000243700)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*0.0000243700
            var process=3;
            var sql = "update `ads` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

userethscene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM ads WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Channel promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)
//ltc
const userltcscene = new Scene('userltc')
userltcscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})
userltcscene.on('message',ctx => {
    con.query("SELECT balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balanceltc
        var ad=Math.round(bal/0.0000878300)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*0.0000878300
            var process=3;
            var sql = "update `ads` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

userltcscene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM ads WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Channel promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)
////doge
const userdogescene = new Scene('userdoge')
userdogescene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})
userdogescene.on('message',ctx => {
    con.query("SELECT balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balancedoge
        var ad=Math.round(bal/1)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*1
            var process=3;
            var sql = "update `ads` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

userdogescene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM ads WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Channel promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)
/////.//////////////////

///////bot//////////////

////////////////////
const promobotscene = new Scene('promobot')
promobotscene.enter((ctx) => ctx.replyWithHTML('<b>To start promoting your channel you need:</b>2️⃣Forward any post from your channel to the bot\n\n3️⃣Follow further instructions from the bot',Markup
    .keyboard([
        ['🛑cancel'], // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)

promobotscene.hears('🛑cancel',ctx => {
    con.query("DELETE FROM `bots` WHERE `bots`.`process` = 1")
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra())
        .then(()=> {
            ctx.scene.leave()
        })
})

promobotscene.on('message',ctx => {
    if (ctx.message.forward_from.is_bot===false){
        ctx.reply('you need to forward the message from the bot')
    } else if (ctx.message.forward_from.is_bot===true) {

        var useri = {
            id:ctx.from.id,
            users:0,
            link:'https://t.me/'+ctx.message.forward_from.username,
            status:'inactive',
            process:1
        };
        con.query("insert into `bots` SET ?", useri)
ctx.replyWithHTML('👏🏻Everything is done').then(()=>{
    ctx.scene.enter('promo2bot')


        })

    }else {
        ctx.replyWithHTML('please forward the message from the bot')
    }
})
//promo2
const promo2botscene = new Scene('promo2bot')
promo2botscene.enter((ctx) =>
    con.query("SELECT balance,balanceeth,balancedoge,balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        ctx.replyWithHTML('<b>Which crypto do you wish to use</b>\n\n' + '<b>your balance</b>\n\n<b>BTC: </b><i>' + result[0].balance + '💰</i>\n<b>ETH: </b><i>' + result[0].balanceeth + '💰</i>\n<b>LTC: </b><i>' + result[0].balanceltc + '💰</i>\n<b>DOGE: </b><i>' + result[0].balancedoge + '💰</i>', Markup
            .keyboard([
                ['✳️BTC'],
                ['✳️ETH'],
                ['✳️LTC'],
                ['✳️DOGE'],
                ['🛑cancel'] // Row1 with 2 buttons
            ])

            .resize()
            .extra())

    })

)
promo2botscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra())
        .then(()=> {
            ctx.scene.leave()
        })
})

promo2botscene.hears('✳️BTC',ctx => {
    con.query("SELECT balance FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balance<0.0000006200){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balance
            var ad=Math.round(bal/0.0000006200)
            var currency='BTC'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `bots` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'and `status`='inactive'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('userbot')
            })

        }
    })


})
//eth
promo2botscene.hears('✳️ETH',ctx => {
    con.query("SELECT balanceeth FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balanceeth<0.0000243700){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balanceeth
            var ad=Math.round(bal/0.0000243700)
            var currency='ETH'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `bots` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'and `status`='inactive'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('userethbot')
            })

        }
    })


})
//ltc
promo2botscene.hears('✳️LTC',ctx => {
    con.query("SELECT balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balanceltc<0.0000878300){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balanceltc
            var ad=Math.round(bal/0.0000878300)
            var currency='LTC'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `bots` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'and `status`='inactive'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('userltcbot')
            })

        }
    })


})
//doge
promo2botscene.hears('✳️DOGE',ctx => {
    con.query("SELECT balancedoge FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balancedoge<1){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balancedoge
            var ad=Math.round(bal/1)
            var currency='DOGE'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `bots` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'and `status`='inactive'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('userdogebot')
            })

        }
    })


})






promo2botscene.hears('🛑cancel',ctx => {
    con.query("DELETE FROM `bots` WHERE `bots`.`process` = 2")
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})


//users scene
const userbotscene = new Scene('userbot')
userbotscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})

userbotscene.on('message',ctx => {
    con.query("SELECT balance FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balance
        var ad=Math.round(bal/0.0000006200)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*0.0000006200
            var process=3;
            var sql = "update `bots` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

userbotscene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM bots WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Bot promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)

//usereth
const userethbotscene = new Scene('userethbot')
userethbotscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})
userethbotscene.on('message',ctx => {
    con.query("SELECT balanceeth FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balanceeth
        var ad=Math.round(bal/0.0000243700)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*0.0000243700
            var process=3;
            var sql = "update `bots` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

userethbotscene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM bots WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Bot promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)
//ltc
const userltcbotscene = new Scene('userltcbot')
userltcbotscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})
userltcbotscene.on('message',ctx => {
    con.query("SELECT balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balanceltc
        var ad=Math.round(bal/0.0000878300)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*0.0000878300
            var process=3;
            var sql = "update `bots` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

userltcbotscene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM bots WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Bot promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)
////doge
const userdogebotscene = new Scene('userdogebot')
userdogebotscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})
userdogebotscene.on('message',ctx => {
    con.query("SELECT balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balancedoge
        var ad=Math.round(bal/1)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*1
            var process=3;
            var sql = "update `bots` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

userdogebotscene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM bots WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Bot promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)





//////////////////groups
const groupscene = new Scene('group')
groupscene.enter((ctx) => ctx.replyWithHTML('<b>To start promoting your Group you need:</b>1️⃣Add this bot to the group administrator \n2️⃣send this command<code>/startCryptomazing_bot</code> in group\n\n3️⃣Follow further instructions from the bot',Markup
    .keyboard([
        ['🛑cancel'], // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)
groupscene.hears('🛑cancel',ctx => {
    con.query("DELETE FROM `groups` WHERE `groups`.`process` = 1")
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra())
        .then(()=> {
            ctx.scene.leave()
        })
})

groupscene.on('message',ctx => {
    if (ctx.message.chat.id===ctx.from.id){
        ctx.reply('please follow the instructions above')
    } else if (ctx.updateType==='mention') {

        var useri = {
            id:ctx.from.id,
            users:0,
            link:'https://t.me/'+ctx.message.chat.username,
            status:'inactive',
            process:1
        };
        con.query("insert into `groups` SET ?", useri)
        ctx.replyWithHTML('👏🏻Everything is done').then(()=>{
            ctx.scene.enter('promo2group')


        })

    }else {
        ctx.replyWithHTML('it seems your group is private,you group needs to be public to promote it')
    }
})
///////
groupscene.on('new_chat_members',ctx=>{
    var useri = {
        id:ctx.from.id,
        users:0,
        link:'https://t.me/'+ctx.message.chat.username,
        status:'inactive',
        process:1
    };
    con.query("insert into `groups` SET ?", useri)
    ctx.replyWithHTML('👏🏻Everything is done').then(()=> {
        ctx.scene.enter('promo2group')
    })
})




//promo2
const promo2groupscene = new Scene('promo2group')
promo2groupscene.enter((ctx) =>
    con.query("SELECT balance,balanceeth,balancedoge,balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        ctx.replyWithHTML('<b>Which crypto do you wish to use</b>\n\n' + '<b>your balance</b>\n\n<b>BTC: </b><i>' + result[0].balance + '💰</i>\n<b>ETH: </b><i>' + result[0].balanceeth + '💰</i>\n<b>LTC: </b><i>' + result[0].balanceltc + '💰</i>\n<b>DOGE: </b><i>' + result[0].balancedoge + '💰</i>', Markup
            .keyboard([
                ['◽️BTC'],
                ['◽️ETH'],
                ['◽️LTC'],
                ['◽️DOGE'],
                ['🛑cancel'] // Row1 with 2 buttons
            ])

            .resize()
            .extra())

    })

)
promo2groupscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra())
        .then(()=> {
            ctx.scene.leave()
        })
})

promo2groupscene.hears('◽️BTC',ctx => {
    con.query("SELECT balance FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balance<0.0000006200){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balance
            var ad=Math.round(bal/0.0000006200)
            var currency='BTC'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `groups` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('usergroup')
            })

        }
    })


})
//eth
promo2botscene.hears('◽️ETH',ctx => {
    con.query("SELECT balanceeth FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balanceeth<0.0000243700){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balanceeth
            var ad=Math.round(bal/0.0000243700)
            var currency='ETH'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `groups` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('userethgroup')
            })

        }
    })


})
//ltc
promo2botscene.hears('◽️LTC',ctx => {
    con.query("SELECT balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balanceltc<0.0000878300){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balanceltc
            var ad=Math.round(bal/0.0000878300)
            var currency='LTC'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `groups` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('userltcgroup')
            })

        }
    })


})
//doge
promo2botscene.hears('◽️DOGE',ctx => {
    con.query("SELECT balancedoge FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        if (result[0].balancedoge<1){
            ctx.reply('😩 your balance is not enough to continue with this advert')
        }else {
            var bal=result[0].balancedoge
            var ad=Math.round(bal/1)
            var currency='DOGE'
            var ide=ctx.from.id
            var process=2;
            var sqli = "update `groups` set `currency` ='" + currency + "', `process`='" + process + "' where `id` = '" + ide + "'";

            con.query(sqli)
            ctx.replyWithHTML('your balance allows you to have <b>'+ad+'</b> users\n\nHow many users do you wish to have👇🏻',Markup
                .keyboard([
                    ['🛑cancel'] // Row1 with 2 buttons
                ])

                .resize()
                .extra()).then(()=>{
                ctx.scene.enter('userdogegroup')
            })

        }
    })


})






promo2botscene.hears('🛑cancel',ctx => {
    con.query("DELETE FROM `groups` WHERE `groups`.`process` = 2")
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})


//users scene
const usergroupscene = new Scene('usergroup')
usergroupscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})

usergroupscene.on('message',ctx => {
    con.query("SELECT balance FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balance
        var ad=Math.round(bal/0.0000006200)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*0.0000006200
            var process=3;
            var sql = "update `groups` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

usergroupscene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM bots WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Bot promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)

//usereth
const userethgroupscene = new Scene('userethgroup')
userethgroupscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})
userethgroupscene.on('message',ctx => {
    con.query("SELECT balanceeth FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balanceeth
        var ad=Math.round(bal/0.0000243700)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*0.0000243700
            var process=3;
            var sql = "update `groups` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

userethgroupscene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM bots WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Bot promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)
//ltc
const userltcgroupscene = new Scene('userltcgroup')
userltcbotscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})
userltcgroupscene.on('message',ctx => {
    con.query("SELECT balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balanceltc
        var ad=Math.round(bal/0.0000878300)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*0.0000878300
            var process=3;
            var sql = "update `groups` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

userltcgroupscene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM bots WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Bot promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)
////doge
const userdogegroupscene = new Scene('userdogegroup')
userdogegroupscene.hears('🛑cancel',ctx => {
    ctx.reply('Main menu', Markup
        .keyboard([
            ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
            ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
            ['💸Balance'],
            ['📈Stastistics','⚙️Settings']
        ])

        .resize()
        .extra()).then(()=>{
        ctx.scene.leave()
    })

})
userdogegroupscene.on('message',ctx => {
    con.query("SELECT balanceltc FROM account WHERE id=" + ctx.from.id, function (err, result, fields) {
        var bal=result[0].balancedoge
        var ad=Math.round(bal/1)
        if (isNaN(ctx.message.text)){
            ctx.replyWithHTML('<b>🤷🏻‍♂️That is not a valid number</b>')
        }else if (ctx.message.text>ad){
            ctx.replyWithHTML('<b>😐Number of users has to be less or equal to</b><i>'+ad+'</i>')
        }else {
            var status='active'
            var id=ctx.from.id
            var users=ctx.message.text
            var bala=ctx.message.text*1
            var process=3;
            var sql = "update `groups` set `status` ='" + status + "', `users`='" + users + "', `process`='"+process+ "' where `id` = '" + id + "'";
            con.query("update `account` set `balance` = `balance`-'" + bala + "' where `id` = '" + id + "'")
            con.query(sql,function (err,res) {
                ctx.replyWithHTML('<b>👏🏻 Advert created</b>').then(()=>{
                    ctx.scene.leave()
                })

            })


        }
    })

})

userdogegroupscene.leave((ctx) =>{
        con.query("SELECT link,currency,status FROM bots WHERE id=" + ctx.from.id, function (err, result, fields) {
            ctx.replyWithHTML('<b>📣📣📣📣📣Your promotions</b>\n\n <b>Type:</b>Bot promotion\n<b>Status:</b>' + result[0].status + '\n<b>Currency:</b>' + result[0].currency + '\n<b>Channel Link:</b>' + result[0].link,Markup
                .keyboard([
                    ['🏞Ads', '📢Promote'], // Row1 with 2 buttons
                    ['👤Account', '👨‍👧‍👦Refferals'], // Row2 with 2 buttons
                    ['💸Balance'],
                    ['📈Stastistics','⚙️Settings']
                ])

                .resize()
                .extra())


        })
    }
)



//////my ads
bot.hears('🏵Channel proms',ctx => {
    ctx.replyWithHTML('<b>your current ads</b>').then(()=> {
        con.query("SELECT link,currency,status FROM ads WHERE id='" + ctx.from.id + "'and `status`='active'", function (err, result, fields) {
            if (result.length<=0){
                ctx.reply('☹️seems that you currently dont have any ads')
            }else {

                result.forEach(function (res) {
                    ctx.replyWithHTML('<b>Promotion:</b>📣📣📣📣📣channel\n<b>Currency:</b>' + res.currency + '💵\n<b>status:</b>' + res.status + '✅\n<b>link:</b>' + res.link+'❇️')
                })
            }
        })

    })
})
//bot
bot.hears('🏵Bot proms',ctx => {
    ctx.replyWithHTML('<b>your current ads</b>').then(()=> {
        con.query("SELECT link,currency,status FROM bots WHERE id='" + ctx.from.id + "'and `status`='active'", function (err, result, fields) {
            if (result.length<=0){
                ctx.reply('☹️seems that you currently dont have any ads')
            }else {

                result.forEach(function (res) {
                    ctx.replyWithHTML('<b>Promotion:</b>📣📣📣📣📣Bot\n<b>Currency:</b>' + res.currency + '💵\n<b>status:</b>' + res.status + '✅\n<b>link:</b>' + res.link+'❇️')
                })
            }
        })

    })
})
//group
bot.hears('🏵Group proms',ctx => {
    ctx.replyWithHTML('<b>your current ads</b>').then(()=> {
        con.query("SELECT link,currency,status FROM groups WHERE id='" + ctx.from.id + "'and `status`='active'", function (err, result, fields) {
            if (result.length<=0){
                ctx.reply('☹️seems that you currently dont have any ads')
            }else {

                result.forEach(function (res) {
                    ctx.replyWithHTML('<b>Promotion:</b>📣📣📣📣📣Bot\n<b>Currency:</b>' + res.currency + '💵\n<b>status:</b>' + res.status + '✅\n<b>link:</b>' + res.link+'❇️')
                })
            }
        })

    })
})
//ads
bot.hears('✅Channel',ctx => {
    var status='active'
    con.query("SELECT link,currency,status FROM ads WHERE status='" + status + "'and `status`='active'", function (err, result, fields) {
        if (result.length <= 0) {
            ctx.reply('☹️seems that there are no available ads right now')
        } else {

            result.forEach(function (res) {
                ctx.replyWithHTML('<b>join now and earn</b>\n\n<b>Promotion:</b>📣📣📣📣📣Channel\n<b>Currency:</b>' + res.currency + '💵\n<b>status:</b>' + res.status + '✅\n<b>link:</b>' + res.link + '❇️',Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('joined', 'joined'),
                        m.urlButton('earn', res.link)

                    ], {columns: 3}))
                )
            })


        }
    })
})
///
bot.hears('🤖Bot',ctx => {
    var status='active'
    con.query("SELECT link,currency,status FROM bots WHERE status='" + status + "'and `status`='active'", function (err, result, fields) {
        if (result.length <= 0) {
            ctx.reply('☹️seems that there are no available ads right now')
        } else {

            result.forEach(function (res) {
                ctx.replyWithHTML('<b>join now and earn</b>\n\n<b>Promotion:</b>📣📣📣📣📣Bots\n<b>Currency:</b>' + res.currency + '💵\n<b>status:</b>' + res.status + '✅\n<b>link:</b>' + res.link + '❇️',Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('joined', 'joined'),
                        m.urlButton('earn', res.link)

                    ], {columns: 3}))
                )
            })


        }
    })
})
///////
bot.hears('👨‍👨‍👦Group',ctx => {
    var status='active'
    con.query("SELECT link,currency,status FROM groups WHERE status='" + status + "'and `status`='active'", function (err, result, fields) {
        if (result.length <= 0) {
            ctx.reply('☹️seems that there are no available ads right now')
        } else {

            result.forEach(function (res) {
                ctx.replyWithHTML('<b>join now and earn</b>\n\n<b>Promotion:</b>📣📣📣📣📣Group\n<b>Currency:</b>' + res.currency + '💵\n<b>status:</b>' + res.status + '✅\n<b>link:</b>' + res.link + '❇️',Extra
                    .HTML()
                    .markup((m) => m.inlineKeyboard([
                        m.callbackButton('joined', 'joined'),
                        m.urlButton('earn', res.link)

                    ], {columns: 3}))
                )
            })


        }
    })
})
























///
const stage = new Stage([btcscene,ethscene,ltcscene,dogescene,promoscene,promo2scene,userscene,userdogescene,userethscene,userltcscene,promobotscene,promo2botscene,userbotscene,userdogebotscene,userethbotscene,userltcbotscene,groupscene,userdogegroupscene,usergroupscene,userltcgroupscene,userethgroupscene], { ttl: 180000 })
bot.use(session())
bot.use(stage.middleware())
bot.hears('🔸BTC', enter('btc'))
bot.hears('🔸ETH', enter('eth'))
bot.hears('🔸LTC', enter('ltc'))
bot.hears('🔸DOGE', enter('doge'))
bot.hears('✅Channel✅', enter('promo'))
bot.hears('👨‍👨‍👦Group👨‍👨‍👦',enter('group'))
bot.hears('🤖Bot🤖',enter('group'))





//0nline
cron.schedule('*/1 * * * * *', () => {
    var id = 411002680;
    var idle = 1;
    con.query("update `account` set `idle` = '" + idle + "' where `id` = '" + id + "'")
})



bot.startPolling()
