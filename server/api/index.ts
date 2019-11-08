import { Router } from 'express';
import question from './routes/question';

// guaranteed to get dependencies
export default () => {
  const app = Router();

  question(app);

  return app;
};
