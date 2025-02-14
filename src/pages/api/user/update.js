import { encode, decode } from '../../../utils/encryption';
import { connectDb } from '../../../utils/db'; // We'll define this utility later

export default async function handler(req, res) {

  try {
    const {method,data,params} = decode(req.body)
    if (method=='put') {

      const connection = await connectDb();
      const result = await connection.query(
        "UPDATE ep_users SET password = ?, salt = ?, fail_attempt = 0, status = 'active', date_changepassword = ? WHERE username = ? ",
        [data?.password, data?.salt, data?.date_changepassword, data?.username],
        function(err, results) {
          console.error(err);
          console.log(results)
        }
      );
      connection.end();

      console.log(result)
      res.status(200).json({data: encode(result)})
    } else {
      res.status(405).send('Method not allowed')
    }
  } catch (error) {
    console.error('Error:', error);
    // return res.status(500).json({ error: 'Server error' });
  }
}
