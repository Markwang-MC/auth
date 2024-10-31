import { log } from "@/lib/indexdb/libs/uitils/log";
import client from "@/lib/mongodb";
export default async function handler(req, res) {
    console.log('start---------')
    try {
        await client.connect();
        console.log('链接成功')
        let collection = await client.db("weller").collection('customer');
        const data = await collection.find().toArray();
        console.log("this is user table: ",data);
        return data
      } 
      catch (e){
        console.log('err: ',e)
      }
      finally {
        console.log('finally')
        await client.close();
      }
     
}
  
