var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var ffmpeg = require('fluent-ffmpeg');

var videoFormats = ["mp4", "webm", "ogg"];

var mediaPath = path.join(__dirname, "..", "public", "media");
var thumbPath = path.join(mediaPath, "..", "thumbnails");

function makeThumbnail(filePath) {
  var ret = path.basename(filePath) + ".png";
  var proc = ffmpeg(filePath)
    .on('end', function(files) {
      console.log('screenshots were saved.');
    })
    .on('error', function(err) {
      console.log('an error happened: ' + err.message);
    })
    .takeScreenshots({ count: 1, timemarks: [ '2' ], filename: ret}, thumbPath);
  return ret;
}

function getVideoFiles() {
  var videoFiles = [];
  
  if (fs.statSync(mediaPath).isDirectory()) {
    var files = fs.readdirSync(mediaPath);
    for (var f in files) {
      for (var v in videoFormats) {
          if (path.extname(files[f]) === ("." + videoFormats[v])) {
              var thumb = makeThumbnail(path.join(mediaPath, files[f]));
              videoFiles.push({
                  format: videoFormats[v],
                  path: encodeURIComponent(path.basename(mediaPath)) + "/" + encodeURIComponent(files[f]),
                  thumbnailPath: encodeURIComponent(path.basename(thumbPath)) + "/" + encodeURIComponent(thumb),
                  fileName: path.basename(files[f], path.extname(files[f]))
              });
              console.log(videoFiles);
              break;
          }
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
