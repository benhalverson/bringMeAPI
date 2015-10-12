var mongoose = require('mongoose');

var CitySchema = new mongoose.Schema({
	name: String
});

mongoose.model('City', CitySchema);