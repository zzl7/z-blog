const mongoose = require('../common/util').mongoose;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	userName : String,
	password : String,
	id : String,
    email : String 
});
const user = mongoose.model("user", UserSchema);

module.exports = {
    user
}