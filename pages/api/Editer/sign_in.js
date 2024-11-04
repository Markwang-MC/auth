async function mongo(acount) {
    try {
        await client.connect();
        let collection = await client.db("weller").collection('editer');
        const data = await collection.find({gmail:acount}).toArray();
        return data
      } 
      catch (error){
        console.log('err: ',error)
        return {error}
    }
      finally {
        console.log('finally')
        await client.close();
        
      }
}

export default async function handler(req,res){
    const {gmail,password} = req.body
    let data = await mongo(gmail)
    if (data.error) {
        res.json(data)
        return
    }
    if(data.length==0){
        res.json({error:'the acount is not existed'})
        return
    }
 
 
    data = data[0]
    
    password = crypto(password)
    if (password!=data.password){
        res.json({error:'Wrong password'})
        return
    }
    let {avatar,nickname} = data
    let token = jwt({avatar,nickname,gmail})
    res.json({token})
}