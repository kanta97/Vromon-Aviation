var path = require('path')
var multer = require('multer')
var crypto = require('crypto');

var storage = multer.diskStorage({

  destination: './uploads/visaDocument',
  filename: function (req, file, cb) {

    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

var fileupload_visa = multer({ storage: storage }).array('files',2);


module.exports = fileupload_visa;
