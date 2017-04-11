var fs = require('fs'),
    glob = require("glob"),
    service = {}

/**
Function to encode file data to base64 encoded string
@param {file} file the file object
*/
service.base64_encode = function (file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

/**
Function to clear the `/tmp/uploads` cache
@param {string} upload_dir the path where temporary uploads live in the app.
*/
service.clear_tmp_cache = function (upload_dir) {
  glob(upload_dir + '/*',function(err,files){
       if (err) throw err;
       files.forEach(function(item,index,array){
            console.log(item + " found");
       });
       // console.log("FILES! "+JSON.stringify(files, null, 2))
       // Delete files
       files.forEach(function(item,index,array){
            fs.unlink(item, function(err){
                 if (err) throw err;
                 console.log(item + " deleted");
            });
       });
  });
}

module.exports = service
