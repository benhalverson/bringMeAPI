var mongoose = require('mongoose');

var RequestSchema = new mongoose.Schema({
	bringme: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	bringer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	// status means request is taken or not
	// -1 means rejected/expired
	// 0 means waiting for response
	// 1 means accepted by bringer_id
	request_status: { type: Number, default: 0 },

	// 0 means pending
	// 1 means order complete
	order_status: { type: Number, default: 0 },
	created_at: { type: Date, default: Date.now },
	vendor: {type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
	meet_location: String,
	products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
	order_confirmation_id: type: mongoose.Schema.Types.ObjectId, ref: 'Order',
	receipt_img: [{ data: Buffer, contentType: String }],
	tips: Number,
	total: Number
});

mongoose.model('Request', RequestSchema);