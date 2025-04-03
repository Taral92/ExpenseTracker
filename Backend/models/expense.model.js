const mongoose=require('mongoose')

const ExpenseSchema=new mongoose.Schema({
     description:{
        type:String,
        required:true
     },
     amount:{
        type:Number,
        required:true
     },
     category:{
        type:String,
        required:true
     },
     done:{
        type:Boolean,
        default:false
     },
     userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     }

},{timestamps:true}
)
const expense=mongoose.model('expense',ExpenseSchema)

module.exports=expense