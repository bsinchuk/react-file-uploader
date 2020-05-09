const express = require('express');
const formidable = require('formidable');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Express is running on port ${port}`);
});

app.get('/test', (req, res) => {
  res.send({status: 'all is ok'});
});

app.post('/upload', (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.multiples = true;
  form.uploadDir = __dirname + '/public/uploads';
  form.on('file', (name, file) => {
    console.log('Uploaded file: ', name);
  });
  form.on('fileBegin', function (name, file){
    console.log('fileBegin starts: ', name);
    file.path = form.uploadDir + '/' + file.name
  })

  form.on('aborted', () => {
    console.error('Request aborted by the user')
  });
  form.on('error', (err) => {
    console.error('Error', err)
  });
  form.on('end', () => {
    res.header('Access-Control-Allow-Origin', '*');
    res.end('success');
  });
  form.parse(req);
});