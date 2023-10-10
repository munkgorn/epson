import { encode, decode } from '../../../utils/encryption';
import { connectDb } from '../../../utils/db'; // We'll define this utility later

export default async function handler(req, res) {

  try {
    const {method,data,params} = decode(req.body)
    if (method=='put') {
      const connection = await connectDb();
      
      let status = 'active';
      if (+data?.attempt>=6) {
        status = 'lock';
      }

      const update = await connection.query(
        'UPDATE ep_users SET fail_attempt = ?, status = ? WHERE username = ?',
        [data?.attempt, status, data?.username],
        function(err, results) {
        console.error(err);
        console.log(results)
        }
    );
    console.log(update);
      connection.end();

      res.status(200).json({data: encode(update[0])})
    } else {
      res.status(405).send('Method not allowed')
    }
  } catch (error) {
    console.error('Error:', error);
    // return res.status(500).json({ error: 'Server error' });
  }
}
