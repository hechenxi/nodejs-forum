var mongoose = require('mongoose')
var Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/forum', {useNewUrlParser: true})
console.log('已连接数据库-topic')
var userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
        default: '/public/img/avatar-default.png'
    },
    topic_created_time:{
        type: Date,
        default: Date.now
    },
    topic_modified_time:{
        type: Date,
        default: Date.now
	},
	class:{
		type: String,
		required: true
	},
	title:{
		type: String,
		required:true
	},
	content:{
		type: String,
		required:true
	}

})
//模型名叫User
module.exports = mongoose.model('Topic',userSchema)