var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
	short_name: String,
	complete_name: String,
	image_url: String,
	description: String,
	manufacture_sku: String,
	vendor_sku: String,
	vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
	unit_price: Number,
	// unit description
	unit: String,
	// optional
	notes: String
});

mongoose.model('Product', PostSchema);