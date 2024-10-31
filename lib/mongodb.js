
// 密码：
// rt7gbtOFvXwZqlSn

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jimmywxuanyu:<db_password>@cluster0.tnrlx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export default client


// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     let collection = await client.db("sample_mflix").collection('users');
//     const filteredDocs = await collection.find().toArray();

//     console.log("this is user table: ",filteredDocs);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
