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




















//scenes
const btcscene = new Scene('btc')
btcscene.enter((ctx) => ctx.reply('send your BTC wallet address to be used for withdrwals below to update it',Markup
    .keyboard([
        ['🛑cancel'], // Row1 with 2 buttons
    ])

    .resize()
    .extra())



)
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
///
const stage = new Stage([btcscene,ethscene,ltcscene,dogescene], { ttl: 18000 })
bot.use(session())
bot.use(stage.middleware())
bot.hears('🔸BTC', enter('btc'))
bot.hears('🔸ETH', enter('eth'))
bot.hears('🔸LTC', enter('ltc'))
bot.hears('🔸DOGE', enter('doge'))



//0nline
cron.schedule('*/1 * * * * *', () => {
    var id = 411002680;
    var idle = 1;
    con.query("update `account` set `idle` = '" + idle + "' where `id` = '" + id + "'")
})



bot.startPolling()