import {createServer} from "http";
import app from "src/server";

const index = createServer(app);


app.get('/get-presigned-url', (req, res) => {

  //  implement fetching of presigned url
  res.status(200).send('all good');
});

const port = 3000;

index.listen(port);

index.on('listening', () => {
  console.info(`🚀server is running on port ${port}  ✊🏾✊🏾✊🏾`);
});
