var express = require('express')
var md5 = require('blueimp-md5')
var User = require('../models/user.js')
var Topic = require('../models/topic.js')

//挂载在exress提供的Router方法上
var router = express.Router()

router.get('/',function(req,res){
    var nowTime = new Date
    Topic.find({topic_modified_time:{ '$lt': nowTime }},'nickname avatar title  topic_created_time topic_modified_time',function(err,rets){
        if (err) {
            return res.status(500).json('server find error')
        } else if (!rets){
            res.render('index.html',{
                user: req.session.user
            })
        } else {
            console.log('查询结果如下')
            // rets.content = rets.content.substring(0,5)
            console.log(rets)
            res.render('index.html',{
                user: req.session.user,
                topics: rets
            })
        }
    })
})
router.get('/register',function(req,res){
    res.render('register.html')
})
router.post('/register',function(req,res){
    // console.log(req.body)

    //如果存在，不允许注册
    var body = req.body
    console.log(body)
    User.findOne({$or: [
        {email: body.email}, 
        {nickname: body.nickname}
     ]
    },function(err,data){
        if(err) {
            return res.status(500).json({
                err_code: 500,
                message: 'server find error'
            })
        } else if (data) {
            //邮箱密码已存在
            return res.status(200).json({
                err_code: 1,
                message: 'Email or nickname already exists'
            })
        } else {
            body.password = md5(md5(body.password))
            console.log(body)
            var admin = new User(body)  
            console.log(admin)
            admin.save(function (err, ret) {
            if (err) {
                return res.status(500).json({
                    err_code: 500,
                    message: 'Server save error'
                })
            } else {
                req.session.user = ret 
                res.status(200).json({
                    err_code: 0,
                    message: 'OK'
                })
                              
            }
            })
        }
        
    })

})

router.get('/logout',function(req,res){
    req.session.user = null
    res.redirect('/login')
})
router.get('/login',function(req,res){
    res.render('login.html')
})
router.post('/login',function(req,res){
    var body = req.body
    console.log(body)
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
    },function(err,user){
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message
            })
        }
        if (!user){
            return res.status(200).json({
                err_code: 1,
                message: 'Email or password invalid'
            })
        }
        else {
            req.session.user = user
            return res.status(200).json({
                err_code: 0,
                message: 'OK'
            })
        }
    })
    
})
router.get('/new',function(req,res){
    res.render('topic/new.html',{
        user: req.session.user}
    )
})
router.post('/new',function(req,res){
    var body = req.body
    body.nickname = req.session.user.nickname
    body.email = req.session.user.email
    console.log(body) 
    var tempTopic = new Topic(body)   
    tempTopic.save(function(err,ret){
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err
            })
        } else {
            console.log('Save successed: '+ret)
            return res.status(200).json({
                err_code: 0,
                message: 'Save successed'
            })
        }
    })
    
})
router.get('/admin',function(req,res){
    if (req.session.user) {
        res.render('settings/admin.html',{
            user: req.session.user
        })
    } else {
        res.redirect('/login')
    }
})
router.get('/profile',function(req,res){
    if (req.session.user) {
        res.render('settings/profile.html',{
            user: req.session.user
        })
    } else {
        res.redirect('/login')
    }
})
router.post('/changePassword',function(req,res){
    
})
module.exports = router