import client from "@/lib/mongodb";
const crypto = require('crypto');

import {generateToken,authenticateToken} from "@/lib/api/jwt";
// type user task
async function _read(req,res) {
    const token = req.headers['Authorization']

    // if token dosen't exist, then start login
    if (!token) {
        let {username,password,table} = req.query

        // if password or username dosen't exist, then return with error
        if (!password||!username||!table) {
            res.json({error:'Unauthorized Access'})
            return
        }

        // get information from the database
        await client.connect();
        let collection = await client.db("weller").collection(table);
        const data = await collection.find({username}).toArray();
       
        // see if the username is correct
        if (data.length==0){
            res.json({error:'Wrong Username'})
            return
        }

        // crypy password for athentication
        const hash_password = crypto.createHash('sha256').update(password).digest('hex');

        // see if the password is correct
        if (hash_password!=data.password){
            res.json({error:'Wrong password'})
            return
        }

        // generate token and return with the token
        let {avatar,nickname} = data
        let token = generateToken({avatar,nickname,gmail})
        res.json({token})
        return
    }
    let {condition,table} = req.query
    let collection = await client.db("weller").collection(table);
    const data = await collection.find(condition).toArray();
    res.json({data})
    return
 }


async function _delete(req,res) {
    const token = req.headers['Authorization']
    if (!token) {
        res.json({error:'Unauthorized Access'})
        return
    }
    
    let result = await authenticateToken(token)
    if (!result) {
        res.json({error:'Invalid Token'})
        return
    }

     // the token is correct, start to acquire table name and data
     let {gmail,table,condition} = req.query
     let collection = await client.db("weller").collection(table);
     const role_data = await collection.find({gmail}).toArray();
 
     // admin list 0=HR Manager 1=User Manager 2=Admin 3=Super Admin
     if (role_data[0].role!=3||role_data[0].gmail!=gmail){
         res.json({error:'Permission Denied'})
         return
     }

    collection = await client.db("weller").collection(table);
    const deleteResult = await collection.deleteMany(condition);
    res.json({deleteResult})
    return
}


async function _update(req,res) {
    const token = req.headers['Authorization']
    if (!token) {
        res.json({error:'Unauthorized Access'})
        return
    }

    let result = await authenticateToken(token)
    if (!result) {
        res.json({error:'Invalid Token'})
        return
    }

    const {table,data,condition,role} = req.body
    if (role==4){
        res.json({error:'Permission Denied'})
        return
    }
    let collection = await client.db("weller").collection(table);
    const updateResult = await collection.updateOne(condition, { $set:data});
    res.json({updateResult})
    return
}

async function _create(req,res) {
    const token = req.headers['Authorization']
    // checking if token is exist or not
    if (!token) {
        res.json({error:'Unauthorized Access'})
        return
    }

    // if token is exist, check if it's an valid one
    let result = await authenticateToken(token)
    if (!result) {
        res.json({error:'Invalid Token'})
        return
    }

    // the token is correct, start to acquire table name and data
    let {gmail,table,data} = req.body
    let collection = await client.db("weller").collection(table);
    const role_data = await collection.find({gmail}).toArray();

    // admin list 0=HR Manager 1=User Manager 2=Admin 3=Super Admin
    if ((role_data[0].role!=3&&(table=='Editer'||table=='User'))||role_data[0].gmail!=gmail){
        res.json({error:'Permission Denied'})
        return
    }

    // data should be a object of what you want to insert into the table
    collection = await client.db("weller").collection(table);
    const insertResult = await collection.insertMany([...data]);
    res.json({insertResult})
}

export default async function handler(req,res) {
    if (req.method=='get'){
        switch (req.headers['Action']) {
            case 'read':
              // Code to execute if action is read
              _read(req,res)
              break;
            case 'delete':
              // Code to execute if action is delete
              _delete(req,res)
              break;
          }
        return
    }
    
    switch (req.headers['Action']) {
        case 'create':
          // Code to execute if action is create
          _create(req,res)
          break;
        case 'update':
          // Code to execute if action is update
          _update(req,res)
          break;
      }
}

// crud