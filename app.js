const express = require('express'),
      multer  = require('multer'),
      path    = require('path'),
      fs      = require('fs');

const upload = multer({ dest: 'uploads/' });

const app = express()

app.set('port', (process.env.PORT || 3000));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

app.post('/', upload.single('file'), function(req, res){
    let filePath = "./uploads/" + req.file.filename;
    fs.unlink(filePath);
    res.json({
      fileName: req.file.originalname,
      size:     req.file.size
    });
});

app.listen(app.get('port'), () => {
  console.log(`App is running on port ${app.get('port')}`);
});
