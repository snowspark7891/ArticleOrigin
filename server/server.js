import { config } from "dotenv";
import express, { response, urlencoded } from "express";
import axios from "axios";
import cors from "cors";
config()

const app = express();
app.use(cors());
app.use(urlencoded({extends:true}))

const apikey = process.env.API_KEY;  //api for news



app.get('/',(req,res)=>{
    res.send("This running !")
})




function fetchnew(Url,res){
    axios.get(Url)
    .then(response =>{
        if(response.data.totalResult > 0){
            res.json({
                status:200,
                sucess:true,
                massage:"Successfully fetched the data",
                data:response.data
            });
        } else {
            res.json({                      //response and error handing
                status:200,
                sucess:true,
                massage:"No more Results",
                data:response.data
            });
        }
    }).catch(err=>{
        res.json({
            status:500,
            sucess:false,
            massage:"Something went wrong , opration failed",
            error:err.massage
        });
    }); 
}

//all news rout

app.get("/all-news",(req,res)=>{
    let pagesize =parseInt(req.query.pagesize) || 40;
    let page=parseInt(req.query.page) || 1;
    let url = `https://newsapi.org/v2/everything?q=page=${page}&pagesize=${pagesize}&apiKey=${apikey}`
    fetchnew(url,res);
})


//top head lines rout
app.options("/topheadlines",cors());
app.get("/topheadlines",(req,res)=>{
    let pagesize =parseInt(req.query.pagesize) || 80;
    let page=parseInt(req.query.page) || 1;
    let category = req.query.category || "general"
    let url =`https://newsapi.org/v2/top-headlines?sources=bbc-news&page=${page}&pagesize=${pagesize}&apiKey=${apikey}`
    fetchnew(url,res)
})

//country specific rout
app.options("/country/:iso",cors());
app.get("/country/:iso",(req,res)=>{
    let pagesize =parseInt(req.query.pagesize) || 80;
    let page=parseInt(req.query.page) || 1;
    let countrty = req.query.iso;
    let url = `https://newsapi.org/v2/top-headlines?country=${countrty}&apiKey=${apikey}&page=${page}&pagesize=${pagesize}`
    fetchnew(url,res);
})



app.listen(process.env.PORT,()=>{
    console.log("seems like its working");
})