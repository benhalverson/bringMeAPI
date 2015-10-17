var mongoose = require('mongoose');

var OrderSchema = new mongoose.Schema({
	bringme: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	bringer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	// status means Order is taken or not
	// -1 means rejected/expired
	// 0 means waiting for response
	// 1 means accepted by bringer_id
	status: { type: Number, default: 0 },
	created_at: { type: Date, default: Date.now },
	vendor: {type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
	meet_location: String,
	tips: Number,
	products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
	order_id: type: mongoose.Schema.Types.ObjectId, ref: 'Order'
	/* PENDING 
	products: [{product_id: '123', qty: 1}, {product_id: '234', qty: 3}],
	tips: $5,
	*/
});

mongoose.model('Order', OrderSchema);