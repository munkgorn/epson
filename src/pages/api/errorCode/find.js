import { connectDb } from '../../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const connection = await connectDb();
      const { model, errorCode } = req.body;
      const [logData] = await connection.query(
        'SELECT * FROM `es_pt_model_errorcode` WHERE `model_name` = ? AND `error_code` = ?',
        [model, errorCode]
      );

      return res.status(200).json(logData);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
