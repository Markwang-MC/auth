import client from "@/lib/mongodb";
async function mongodb(data){
    console.log('----------',data)
    try {
        await client.connect();
        console.log('链接成功')
        let collection = await client.db("weller").collection('editor');
        const insertResult = await collection.insertMany([data]);
        return 'success'    
    } 
    catch (e){
    console.log('err: ',e)
    return 'fail'
    }
    finally {
    console.log('finally')
    await client.close();
    
    }
}

export default async function handler(req,res){
    const {first_name,last_name,sex,email,sin,id,college,address} = req.body
    const result = mongodb({
        first_name,
        last_name,
        sex,
        email,
        sin,
        id,
        college,
        address,
        tasks:[]
    })
    // if (result=='success'){
    //     res.end('注册成功')
    // }
    // else{
    //     res.end('注册失败')
    // }
}


// Technical Issues
// Research 和 Description的关系