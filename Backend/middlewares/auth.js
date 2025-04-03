const jwt =require('jsonwebtoken')

const auth=async(req,res,next)=>{
      const authheader=req.headers.authorization;

      if(!authheader){
        return res.json({message:'access denied ...cos token'})
      }
      const token=authheader.split(' ')[1]


      try {
        const decode=jwt.verify(token,process.env.SECRETKEY)
        req.user=decode
        next();
      } catch (error) {
       return res.json({message:'error !!! verifying user'})
        
      }

}
module.exports=auth