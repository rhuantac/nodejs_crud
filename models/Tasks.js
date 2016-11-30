var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  text: String
});

mongoose.model('Task', TaskSchema);
