import fs from 'fs';
import path from 'path';
import { getSession } from 'next-auth/react';
export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    if (!session) {
        // User is not authenticated, return an error response
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    // User is authenticated, you can proceed with your API logic here
    // const decodePath = decode(req.params?.path);
    console.log(req.query);
    const filePath = path.join(process.env.NEXT_PUBLIC_BASEFOLDER, 'private', req.query?.path); 
    const fileData = await fs.readFileSync(filePath);
    
    // Set the appropriate headers for file download
    res.setHeader('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', fileData.length);

    // Send the file data in the response
    res.status(200).end(fileData);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}
