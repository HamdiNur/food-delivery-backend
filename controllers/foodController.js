import foodModal from "../models/foodmodel.js";
import fs from 'fs';

// add food item

const addFood=async(req,res)=>{
    let image_filename=`${req.file.filename}`;
    const food=new foodModal({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename

    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        
    }

}

//all food list
const listFood=async(req,res)=>{
    try {
        const foods=await foodModal.find({});
        res.json({success:true,data:foods})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }

    
}

//remove food item

const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    // try to find the food item
    const food = await foodModal.findById(id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: 'Food item not found' });
    }

    // delete the image if it exists
    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.error('Error deleting image file:', err);
    });

    // delete the document
    await foodModal.findByIdAndDelete(id);

    res.json({ success: true, message: 'Food Removed' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};



///api for updating order status

const updateStatus=async (req,res)=>{

}




export {addFood,listFood,removeFood,}