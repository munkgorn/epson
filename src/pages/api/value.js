import { encode, decode } from '../../utils/encryption';
import { connectDb } from '../../utils/db'; // We'll define this utility later
import _ from  'lodash';

export default async function handler(req, res) {
    try {
    const table = 'es_cc_val';
    const {method,data,params} = decode(req.body)

    if (method=='get') {
        let sql = 'SELECT * FROM '+table;
        let objParam = [];
        if (_.size(params)>0) {
            sql += ' WHERE '
            sql += _.join(_.map(params, (val,key) => {
                
                if (_.startsWith(val,'*') && _.endsWith(val,'*')) {
                    val = _.trim(val, '*');
                    objParam.push(val);
                    return key+' LIKE ?';
                } else {
                    objParam.push(val);
                    return key+' = ?';
                }
            }), ' AND ');
        }
        console.log('sql', sql)
        console.log('params', objParam)

        const connection = await connectDb();
        const [result] = await connection.query(sql, [objParam]);
        
        connection.end();
        // console.log(result)
        res.status(200).json({data: encode(result)})
    } else {
        res.status(405).send('Method not allowed')
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error?.message });
  }
}
