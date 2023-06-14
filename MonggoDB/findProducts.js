
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017/";

const mongoClient = new MongoClient(uri);

async function findProductsById(collName) {
    //var filterDoc={productId:"P101"};

    //var filterDoc ={price : {$gt:10000,$lt:20000}};
    /*
    // function which returns all the docs which have the word "iphone" in the name and price > 10000

     var filterDoc = {
        $and: [
            { name: /iphone/i },
            { price: { $gt: 10000 } }
        ]
    } 
    */
    var projectionDoc = { _id: 0 }
    var cursor = collName.find(filterDoc, { projection: projectionDoc });
    var productsArr = await cursor.toArray();
    console.log("Docs with filter doc : ", filterDoc, "Is", productsArr);
}

// insertA single doc
async function insertOneDoc(collName) {
    var docsToBeInserted = { productId: "P401", price: 16666, name: "Google pixel" };
        
    collName.insertOne(docsToBeInserted)
        .then((res) => {
            console.log("Result", res);
            if(res.insertedId)
            {
                console.log("Document inserted successfully")
            }
            
        })
        .catch((err) => {
            console.log(`Error : ${err})`);
        })
}


async function insertDocs(collName) {
    var docsToBeInserted = [
        { productId: "P201", price: 6666, name: "Samasung flip" },
        { productId: "P202", price: 8888, name: "Samsung fold" },
        { productId: "P203", price: 78787, name: "Iphone 13" }
    ]
    collName.insertMany(docsToBeInserted)
        .then((res) => {
            console.log("Result", res);
            console.log("Number of docs inserted ",res.insertedCount)
        })
        .catch((err) => {
            console.log(`Error : ${err})`);
        })
}

async function run() {
    try {
        var client = await mongoClient.connect();
        console.log("Connected successfully to the client");
        // var dbName = client.db("dxcDb");
        var dbName = client.db("dbdxc");
        // var collName = dbName.collection("products");
        var collName = dbName.collection("product");
        //await insertDocs(collName);
        
        await insertOneDoc(collName);
        var cursor = collName.find();// return all the docs
        var productsArr = [];
        productsArr = await cursor.toArray();
        console.log("Products Array ", productsArr);

        //findProductsById(collName);
        mongoClient.close();
    }
    catch (err) {
        console.log(`Error : ${err})`);
    }
}

run();

/* Using promises
mongoClient.connect()
.then((client)=>{

})
.catch(err=>{
    console.log(`Error : ${err})`);
})

*/
// function which returns all the docs which have the word "iphone" in the name and price > 10000

// db.products.find({
// $and:[
// {name:/iphone/i},
// {price:{$gt:10000}}
// ]
// })



// function which returns all the docs which have the word "iphone" in the name and price > 10000
// --db.employee.find({
// $and: [
// {productName:/iphone/i},
// {price:{$gt:10000}},
// ]
// })

