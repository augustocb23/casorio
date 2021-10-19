import 'reflect-metadata';
import { createExpressServer, useContainer } from 'routing-controllers';
import { Container } from 'typedi';

import { environment } from './environments';

useContainer(Container);

const server = createExpressServer({
  controllers: [__dirname + '/controllers/*.ts'],
  classTransformer: false,
  cors: true
});

server.listen(environment.port, () => {
  console.info(`[SERVER] Running at http://localhost:${environment.port}`);
});
