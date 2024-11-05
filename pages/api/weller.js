import {
    register_users,
    issue_task,
    apply_task,
    read_tasks,
    update_task,
    userself_update,
    read_users,
    find_password
} from "@/lib/api/constants"
import {
    registerUsers,
    issueTask,
    applyTask,
    readTasks,
    updateTask,
    userselfUpdate,
    readUsers,
    findPassword
} from "@/lib/api/requests"

const jwt = require("../lib/api/jwt")
import client from "@/lib/api/mongo"
export default async handler(req,res){
    let dbName = "weller"
    await client.connect()
    const db = client.db(dbName);
    let {token} = req.headers
    let error = 0    
        
 
    if(!token){
        signin(req,res)
        return
    }
    token = token.slice(6)
    let user = await jwt.veryfy(token)
    const {err} = user
    if(err)
        if(err.message=="jwt expired"){
            let _user = db.collection("users").findOne({email:user.email})
            if(_user.forbidden){
                res.end({error})
                return
            }
            req.token = await jwt.sign({email:_user.email,_role:email.role})
        } 
        else{
            res.end({error})
            return
        }
    
    let {email,role} = user
    req.user = user
    
    let {type} = req.query
    if(!req.query) type = req.body.type
    if(!type){
        res.json({error})
        return
    }

    switch (type) {
        case register_users:
                await registerUsers(client,req,res)    
                break;
            case issue_task:
                await issueTask(client,req,res)    
                break;
            case apply_task:
                await applyTask(client,req,res)    
                break;
            case read_tasks:
                await readTasks(client,req,res)    
                break;
            case update_task:
                await updateTask(client,req,res)    
                break;
            case userself_update:
                await userselfUpdate(client,req,res)    
                break;
            case read_users:
                await readUsers(client,req,res)    
                break;
            case find_password:
                await findPassword(client,req,res)    
                break;                
            default:
                res.json({error})                    
    }        

    client.close();    

}

  
          
    
        
  