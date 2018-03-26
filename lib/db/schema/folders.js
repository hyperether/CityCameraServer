var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var folders = new Schema({
    folder: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    ext: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
});

var Folders = mongoose.model('Folders', folders);
module.exports = Folders;