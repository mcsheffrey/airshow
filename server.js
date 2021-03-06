var express = require('express'),
    path = require('path'),
    http = require('http'),
    asset = require('./routes/assets');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.json()),
    app.use(express.urlencoded()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/assets', asset.findAll);
app.get('/assets/:id', asset.findById);
app.post('/assets', asset.addAsset);
app.put('/assets/:id', asset.updateAsset);
app.delete('/assets/:id', asset.deleteAsset);
app.get('/assets/original/:id', asset.getOriginal);
app.get('/assets/preview/:id', asset.getPreview);


http.createServer(app).listen(process.env.PORT || app.get('port'), function () {
    // the PORT variable will be assigned by Heroku
    console.log("Express server listening on port " + app.get('port'));
});
