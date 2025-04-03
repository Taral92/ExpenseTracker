const expenseschema = require("../models/expense.model");
const addexpense = async (req, res) => {
  try {
    const userId = req.userId;
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
      userId,
    });
    return res.json({ message: "your expense added", expense });
  } catch (error) {
    console.log(error);

    return res.json({ message: "error while adding your expenses" });
  }
};
const getallexpense = async (req, res) => {
  try {
    const userid = req.userId;
    const query = {
      userid, //filter by id
    };
    const category = req.query.category || "";
    const done = req.query.done || "";

    if (category.toLowerCase() === "all") {
      // no need to filter
    } else {
      query.category = { $regex: new RegExp(category, "i") };
    }
    if (done.toLowerCase() === "done") {
      query.done = true;
    } else if (done.toLowerCase() === "undone") {
      query.done = false;
    }
    const expense = await expenseschema.find(query);
    if (!expense || expense.length === 0) {
      res.status(404).json({ message: "no expense found", success: false });
    }
    return res.ststus(200).json({ expense, success: true });
  } catch (error) {
    console.log(error);
  }
};
const markasdone = async (req, res) => {
  const expenseid = req.params.id;
  const done=req.body
  const expense=await expenseschema.findByIdAndUpdate(expenseid,done,{new:true})
  if(!expense){
    return res.ststus(404).json({message:'expense not found',success:false})
  }
  return res.json({message:`expense mark as done ${expense.done? 'done': 'undone'}`,success:true})
};
const removeexpense=async (req,res)=>{
         const expenseid=req.params.id
         await expenseschema.findByIdAndDelete(expenseid)
         return res.ststus(200).json({
            message:'expense removed',
            success:true
         })
}
const updateexpense=async(req,res)=>{
   try {
      const {description,amount,category}=req.body
       const expenseid=req.params.id
       const updatedata={description,amount,category}
       const expense=await expenseschema.findByIdAndUpdate(expenseid,updatedata,{new:true})
       return res.ststus(200).json({
        message:'expense updated',
        expense,
        success:true
     })
   } catch (error) {
    console.log(error);
    
   }
}
module.exports ={ addexpense,getallexpense,markasdone,removeexpense,updateexpense};
