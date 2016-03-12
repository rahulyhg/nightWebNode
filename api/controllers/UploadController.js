/**
 * UploadController
 *
 * @description :: Server-side logic for managing uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function(req, res) {
    function callback2(err) {
      Config.GlobalCallback(err, fileNames, res);
    }
    var fileNames = [];
    req.file("file").upload({
      maxBytes: 10000000  // 10 MB Storage 1 MB = 10^6
    }, function(err, uploadedFile) {
      async.each(uploadedFile, function(n, callback) {
        Config.uploadFile(n.fd, function(err, value) {
          if (err) {
            callback(err);
          } else {
            fileNames.push(value.name);
            callback(null);
          }
        });
      }, callback2);

    });


  },
  readFile: function(req, res) {
    Config.readUploaded(req.query.file, res);
  }
};