const expense = require('../models/expense.model');
const expenseschema=require('../models/expense.model')
const addexpense = async (req, res) => {
  try {
    const userId=req.userId
    const { description, amount, category } = req.body;
    if (!description || !amount || !category) {
      return res
        .status(300)
        .json({ message: "require all fields", success: false });
    }
    const expense = await expenseschema.create({
      description,
      amount,
      category,
      userId
    });
    return res.json({message:'your expense added',expense});
  } catch (error) {
    console.log(error);
    
    return res.json({ message: "error while adding your expenses"});
  }

};
const getallexpense=async (req,res)=>{
   const userid=req.userId
   const query={
    userid //filter by id
   }
   const category=req.query.category || ''
   const done=req.query.done || ''

   if(category.toLowerCase() === 'all'){
       // no need to filter
   }else{
      query.category={$regex:new RegExp(category,'i')}
   }
}
module.exports = addexpense;
