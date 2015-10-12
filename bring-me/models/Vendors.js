var mongoose = require('mongoose');

var VendorSchema = new mongoose.Schema({
	name: String,
	city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' }
});


mongoose.model('Vendor', VendorSchema);