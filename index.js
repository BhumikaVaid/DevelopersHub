const http = require('http');
const path = require('path');
const fs = require('fs');

const { MongoClient} = require('mongodb');
const uri = "mongodb+srv://bhumika:vaid1709@cluster0.ceowmum.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const cors = require('cors');

const server = http.createServer(async (req,res)=>{

    console.log(req.url);

    if(req.url ==='/'){
        
        fs.readFile(path.join(__dirname,'public','index.html'), (err, content)=>{
            if (err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(content);

        });
    }
    
    else if(req.url ==='/api' && req.method==='GET'){
       
            
            try {
                
                await client.connect();

                const cursor = client.db("DevelopersHub").collection("DevelopersCollection").find({});
                const result = await cursor.toArray();
                console.log(result);

                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type','application/json');
                

                res.end(JSON.stringify(result));
                
                
            
                   
            }
            catch(e){

                await console.log(e);


            } finally {
              
                await client.close();
                console.log("Connection closed!")
            }
     
    
        }
        else{

            res.writeHead(404,{'Content-Type':'text/html'});
            res.end("<h1> 404 Nothing Found </h1>");
        }

})

const PORT= process.env.PORT || 5050;

server.listen(PORT,()=> console.log(`Yaayy server is running on port ${PORT}`));
