var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var mediaPath = process.env["RPI_MEDIA"] || path.join(__dirname, "..", "public", "media");
var videoFormats = ["mp4", "webm", "ogg"];

function getVideoFiles() {
  var files = fs.readdirSync(mediaPath);
  var videoFiles = [];
  for (var f in files) {
    for (var v in videoFormats) {
        if (files[f].indexOf(videoFormats[v]) === (files[f].length - 3)) {
            videoFiles.push({
                format: videoFormats[v],
                path: encodeURIComponent(path.basename(mediaPath)) + "/" + encodeURIComponent(files[f])
            });
            break;
        }
    }    
  }
  return videoFiles;
}

/* GET home page. */

router.get('/', function(req, res) {
  var videoFiles = getVideoFiles();

  res.render('index', { title: 'Raspberry Media Express', videoFiles: videoFiles });
});

module.exports = router;
