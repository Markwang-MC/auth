import client from "@/lib/mongodb";
const crypto = require('crypto');
import {generateToken,authenticateToken} from "@/lib/api/jwt";

//role
const editor = 0
const customer = 1
const admin = 2
const super_admin = 3
const hr_admin = 4

//request type:
const register_users = 0 //hr admins are in charge P
const issue_task = 1 //customer issue new task P
const apply_task = 2 //editor apply task G
const read_tasks = 3 //all users read tasks within their right limits G
const update_task = 4 //editor update the task's status G 
const user_self_update = 5 //user update its avtar, nickname and password P
const read_users = 6 //admin, super admin and hr admin read users G
const find_password = 7 //when forgeting password G
const login = 8 //G


async function post(req,res) {
    const token = req.headers['Authorization']
    if (!token){
        res.json({error:'Unauthorized Access'})
        return
    }
    const {type} = req.body
    const {email,role} = await authenticateToken(token)
    

    switch(type){
        case register_users:
            if (role!=hr_admin){
                res.json({error:'Unauthorized Access'})
                return
            }
            const {data} = req.body
            await client.connect();
            collection = await client.db("weller").collection('users');
            const insertResult = await collection.insertMany(data);
            await collection.close();
            res.json({insertResult})
            return
            
        case issue_task:
            if (role!=customer){
                res.json({error:'Unauthorized Access'})
                return
            }
            data = req.body.data
            await client.connect();
            collection = await client.db("weller").collection('task');
            insertResult = await collection.insertMany(data);
            await collection.close();

            res.json({insertResult})
            return

        case user_self_update:
            if (role!=customer){
                res.json({error:'Unauthorized Access'})
                return
            }
            let {newavtar,newnickname,newpassword} = req.body
            if (!newavtar&&!newnickname&&!newpassword) {
                res.json({error:'Wrong Data'})
                return
            }
            await client.connect();
            collection = await client.db("weller").collection('users');
            let updateResult
            if (newavtar)
                updateResult = await collection.updateOne({email}, {$set: {avatar:newavtar}});
            else if(newnickname)
                updateResult = await collection.updateOne({email}, {$set: {nickname:newnickname}});
            else if(newpassword)
                updateResult = await collection.updateOne({email}, {$set: {password:newpassword}});
            res.json({updateResult})
            return
    }
}


async function get(req,res){
    const token = req.headers['Authorization']
    const {type} = req.query
    if (!token&&(type!=find_password||type!=login)){
        res.json({error:'Unauthorized Access'})
        return
    }
    let collection,data
    switch(type){
        case find_password:
            let {email,verify_code} = req.query
            await client.connect();
            collection = await client.db("weller").collection('users');
            data = await collection.find({email}).toArray();
            if (verify_code==null){
                //send the verify_code to the user's email
                return 
            }
            // if the user gives the wrong verify code
            if (verify_code!=data.verify_code){
                res.json({error:'Wrong Verify Code'})
                return
            }
            // if the verify code is correct
            res.json({data})
            return

        case read_users:
            result = await authenticateToken(token)
            email = result.email
            role = result.role
            // making sure only the HR and Super Admin can have access
            if (role==customer||role==editor||role==admin){
                res.json({error:'Unauthorized Access'})
                return
            }
            // acquire the condition for reading
            condition = req.query.condition
            await client.connect();
            collection = await client.db("weller").collection('users');
            data = await collection.find(condition).toArray();
            res.json({data})
            return

        case update_task:
            result = await authenticateToken(token)
            email = result.email
            role = result.role
            // making sure the cumtomers can't access
            if (role==customer){
                res.json({error:'Unauthorized Access'})
                return
            }
            condition = req.query.condition
            // acquire the new status that the editer want to update
            let status = req.query.status
            await client.connect();
            collection = await client.db("weller").collection('task');
            // update status
            await collection.updateOne({condition}, { $set: {status} });
            res.json({error:'Task Updated'})
            return

        case read_tasks:
            result = await authenticateToken(token)
            email = result.email
            role = result.role
            await client.connect();
            collection = await client.db("weller").collection('task');
            // the customer can only read the tasks that he posted
            if (role==customer){
                data = await collection.find({poster:email}).toArray();
                res.json({data})
                return
            }
            
            // the editer can only read the tasks that he have done
            if (role==editor){
                data = await collection.find({acceptor:email}).toArray();
                res.json({data})
                return
            }

            condition = req.query.condition
            data = await collection.find(condition).toArray();
            res.json({data})
            return

        case apply_task:
            result = await authenticateToken(token)
            email = result.email
            role = result.role
            // customer can't take tasks
            if (role==customer){
                res.json({error:'Unauthorized Access'})
                return
            }

            // if it's not a customer then give back the first task that hasn't been accept
            await client.connect();
            collection = await client.db("weller").collection('task');
            _task = await collection.find({acceptor:null}).toArray()[0];
            res.json({task:_task})
            return

        case login:
            let {password,role} = req.query
            email = req.query.email
            await client.connect();
            collection = await client.db("weller").collection('users');
            data = await collection.find({email}).toArray()[0];
            const hash_password = crypto.createHash('sha256').update(password).digest('hex');
            if (hash_password!=data.password) {
                res.json({error:'Wrong password'})
                return
            }
            let token = generateToken({role,email})
            res.json({token})
            return
        
        
    }
        
}


async function post(req,res) {
    const token = req.headers['Authorization']
    if (!token) {
        res.json({error:'Unauthorized Access'})
        return
    }


}




export default async function handler(req,res) {
    if (req.method=='get'){
        get(req,res)
        return
    }
    post(req,res)
}