const app = require('express')();
const server = require('http').createServer(app);


app.get('/get-presigned-url', (req, res) => {

  //  implement fetching of presigned url
  res.status(200).send('all good');
});

const port = 3000;

server.listen(port);

server.on('listening', () => {
  console.info(`🚀server is running on port ${port}  ✊🏾✊🏾✊🏾`);
});
