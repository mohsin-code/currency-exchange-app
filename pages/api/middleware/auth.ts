import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type AuthHandler = (
  req: NextApiRequest & { user: any },
  res: NextApiResponse
) => Promise<void>;

export const withAuth = (handler: AuthHandler) => async (
  req: NextApiRequest & { user: any },
  res: NextApiResponse
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

    req.user = decoded;
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default withAuth;
