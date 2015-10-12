var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
	bringme: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	bringer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	// status means request is taken or not
	// -1 means rejected/expired
	// 0 means waiting for response
	// 1 means accepted by bringer_id
	status: { type: Number, default: 0 },
	deadline: Date,
	created_at: { type: Date, default: Date.now },
	vendor: {type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
	meet_location: String 
});

mongoose.model('Request', RequestSchema);