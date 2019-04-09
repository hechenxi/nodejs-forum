var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/forum', {useNewUrlParser: true})
console.log('已连接数据库-comments')
var userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true
    },
    post_id:{
        type: String,
        required: true
    },
    comment_created_time:{
        type: String,
        default: Date.now
    },
	comment_content:{
		type: String,
		required:true
	}

})
//模型名叫User
module.exports = mongoose.model('Comment',userSchema)