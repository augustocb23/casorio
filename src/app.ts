import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { environment } from './environments';

useContainer(Container);

const app = createExpressServer({
  controllers: [`${__dirname}/controllers/*.ts`],
  classTransformer: false,
  cors: true
});

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index');
});

app.listen(environment.port, () => {
  console.info(`[SERVER] Running at http://localhost:${environment.port}`);
});
