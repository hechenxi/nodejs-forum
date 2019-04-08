var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/forum', {useNewUrlParser: true})
console.log('已连接数据库-user')
var userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    created_time:{
        type: Date,
        default: Date.now
    },
    last_modified_time:{
        type: Date,
        default: Date.now
    },
    avatar:{
        type: String,
        default: '/public/img/avatar-default.png'
    },
    bio:{
        type: String,
        default: ''
    },
    gender:{
        type: Number,
        enum: [-1,0,1],
        default: -1
    },
    birthday:{
        type: Date
    },
    status:{
        type: Number,
        //0 没有限制
        //1 不可以评论
        //2 不可登陆
        enum: [0,1,2],
        default: 0
    }
})
//模型名叫User
module.exports = mongoose.model('User',userSchema)