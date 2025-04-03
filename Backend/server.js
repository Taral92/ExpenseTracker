const express=require('express')
require('dotenv').config()
const cors=require('cors')
const cookieparser=require('cookie-parser')
const connect=require('./db/connectdb')
connect()
const app=express()
corsoption={
    origin:'http://localhost:5173',
    Credential:true,
    methods:'GET.HEAD,PUT,DELETE,POST,PATCH',
    allowedHeaders:["Content-Type","Authorization"]

}
app.use(cookieparser())
app.use(cors(corsoption))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send('i am here')
})
app.use('/api/user',require('./routes/userroute'))
app.listen(process.env.PORT,()=>{
    console.log(`server running on ${process.env.PORT}`);
    
})