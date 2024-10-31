import { log } from "@/lib/indexdb/libs/uitils/log";
import client from "@/lib/mongodb";
export default async function handler(req, res) {
    console.log('start---------')
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        console.log('链接成功')
        // Send a ping to confirm a successful connection
        let collection = await client.db("weller").collection('customer');
        const data = await collection.find().toArray();
    
        console.log("this is user table: ",data);
        return data
      } finally {
        await client.close();
      }
     
}
  
