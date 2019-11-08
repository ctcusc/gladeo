import express from 'express';
import bodyParser from 'body-parser';
import routes from '../../api';
import config from '../../../config';

export default ({ app }: { app: express.Application }) => {
  // connection checkpoint
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // load api routes
  app.use(config.api.prefix, routes());

  // general 404 error hendler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  // general 500 error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
