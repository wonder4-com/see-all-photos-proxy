  
const express = require("express");
const app = express();
const port = 3400;
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.send('this is your proxy index');
}) 

app.all('/seeAllPhotos', (req, res) => {
  // Photos server
  proxy.web(req, res, { target: 'http://localhost:3004' });
});

app.all('/api/restaurant*',(req, res) => {
    // reviews server
    proxy.web(req, res, { target: 'http://localhost:3003' });
  });

app.all('/get*',(req, res) => {
    // dishes server
    proxy.web(req, res, { target: 'http://localhost:3000' });
  });
 
app.all('/currentRestaurant',(req, res) => {
    // info server
    proxy.web(req, res, { target: 'http://localhost:8000' });
  });

app.all('/restaurant',(req, res) => {
    // info server
    proxy.web(req, res, { target: 'http://localhost:8000' });
  });

app.get('/leftarrow.png', (req, res) => {
    res.sendFile('/Users/kelsyvaughn/Documents/Hack Reactor/firtsHalfOfCourse/Course/popular-dishes/server/leftarrow.png');
});

app.get('/arrow.png', (req, res) => {
    res.sendFile('/Users/kelsyvaughn/Documents/Hack Reactor/firtsHalfOfCourse/Course/popular-dishes/server/arrow.png');
});

app.listen(port, () => console.log(`proxy server listening on port ${port}`));
