import express from 'express';
import type { Request, Response } from 'express';
import { chatController } from './controllers/chat.controller';
import { reviewControler } from './controllers/review.controller';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hell world');
});
router.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'hello world' });
});

router.post('/api/chat', chatController.sendMessage);

router.get('/api/products/:id/reviews', reviewControler.getReviews);
router.post(
  '/api/products/:id/reviews/summarize',
  reviewControler.summarizeReviews
);

export default router;
