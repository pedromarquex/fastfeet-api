import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import auth from './app/middlewares/auth';
import Recipient from './app/models/Recipient';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(auth);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:pk', RecipientController.update);
routes.delete('/recipients/:pk', RecipientController.destroy);

export default routes;
