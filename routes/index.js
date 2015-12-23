var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

var videoFormats = ["mp4", "webm", "ogg"];

var _media = "media";
var mediaPath = path.join(__dirname, "..", "public", _media);

function getVideoFiles() {
  var videoFiles = [];
  
  if (fs.statSync(mediaPath).isDirectory()) {
    var files = fs.readdirSync(mediaPath);
    for (var f in files) {
      for (var v in videoFormats) {
          if (path.extname(files[f]) === ("." + videoFormats[v])) {
              videoFiles.push({
                  fileName: path.basename(files[f], path.extname(files[f])),
                  watchPath: encodeURIComponent(files[f])
              });
              break;
          }
      }    
    }
  }
  return videoFiles;
}

function lookupVideo(id) {
  var ret = {};
  var filepath = path.join(mediaPath, decodeURIComponent(id));
  if (id && fs.statSync(filepath).isFile()) {
    ret.format = path.extname(filepath).replace(".", "");
    ret.path = "../" + _media + "/" + encodeURIComponent(id);
    ret.title = path.basename(filepath, path.extname(filepath));
  }
  return ret;
}

/* GET home page. */

router.get('/', function(req, res) {
  var videoFiles = getVideoFiles();

  res.render('index', { title: 'Raspberry Media Express', videos: videoFiles });
});

/* GET /watch page, parsing the v querystring parameter. */
router.get('/watch', function (req, res, next) {
  // Fall through to the error route?
  if (req.query) {
    res.render('watch', lookupVideo(req.query.v));
  }
  else {
    next();
  }
});

module.exports = router;
