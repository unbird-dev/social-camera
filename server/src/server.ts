import Express from 'express';
import getPresignedUrl from 'routes/getPresignedUrl';
import login from 'routes/login';
import signup from 'routes/signup';
import { authenticationMiddleware } from 'src/utility/authentication';
import { json } from 'body-parser';

const app = Express();
const jsonMiddleWare = json();

app.get('/get-presigned-url', authenticationMiddleware, getPresignedUrl);
app.post('/login', login);
app.post('/signup', jsonMiddleWare, signup);

export default app;
