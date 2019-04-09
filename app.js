var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')


var router = require('./routers/router')



//1. 创建服务器
var app = express()

//2. 配置服务器
app.engine('html',require('express-art-template'))
//配置POST请求
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//配制session，通过req.session来访问，添加session数据
//req.session.foo = 'bar
//req.session.foo
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//动态开放public资源
app.use('/public/',express.static(path.join(__dirname,'/public')))
app.use('/node_modules/',express.static(path.join(__dirname,'/node_modules')))

//把路由router挂载在app中
app.use(router)

//3. 启动服务器
app.listen(3000,function(err){
    if (err){
        return console.log(err)
    } else {
        console.log('server is running')
    }
})