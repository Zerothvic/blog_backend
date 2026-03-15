import Notification from "../models/Notification.js";

export const getNotifications = async (req,res)=>{

  try{

    const notifications = await Notification
      .find({ user:req.user.id })
      .populate("post","title")
      .sort({createdAt:-1});

    res.json(notifications);

  }catch(err){

    res.status(500).json({message:"Failed to fetch notifications"});

  }

};


export const markAsRead = async (req,res)=>{

  try{

    const notification = await Notification.findById(req.params.id);

    if(!notification){
      return res.status(404).json({message:"Notification not found"});
    }

    notification.read = true;

    await notification.save();

    res.json(notification);

  }catch(err){

    res.status(500).json({message:"Failed to update notification"});

  }

};