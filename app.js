const express = require("express");
const mongoose = require("mongoose");

// create express app

const app = express();

// port define

const PORT = 3000;

//db aayi connect cheyyan db_url

const DB_URL = 'mongodb://localhost:27017/school';

//Middle ware passing

app.use(express.json());

//db connection

mongoose.connect(DB_URL,)  ///{useNewUrlParser: true, useUnifiedTopology: false}/// ithum kodukkam athinte ullil
.then(()=>{console.log('db is connected!')})
.catch(err=> console.log('Error found',err));


//define schema
const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      address: { type: String, required: true },
      age: { type: Number, required: true },
      phone_number: { type: Number, required: true }
  });
  

//model creation

const User = mongoose.model('User',userSchema,'student');

//CRUD operations

//INSERT ------ POST 

app.post('/users',async (req,res)=>{
     try{
    
      const user =new User(req.body);
      const insertData =await user.save();

      res.status(201).json({
            message: 'Inserted successfully',
            insertData: insertData
      })
 
     }catch(err){
     res.status(400).json({
      message: 'User not inserted',
     });
     console.log('Error',err);
      
     }
});


//Get ------ READ


app.get('/allusers',async (req,res)=>{
      try{
   
      const users =await User.find();
      res.status(200).json({
        message:"Read successfully",
        all_users:users
      });
      }catch(err){
      res.status(400).json({
       message: 'User not accessed',
      });
      console.log('Error',err);
       
      }
 });
 
//USER READ USING ID 

 app.get('/user/:id',async (req,res)=>{
      try{
   
      const user =await User.findById(req.params.id);
      res.status(200).json({
        message:"Read successfully",
        all_users:user
      });
      }catch(err){
      res.status(400).json({
       message: 'User not accessed',
      });
      console.log('Error',err);
       
      }
 });

 //UPDATE -----PUT

 
app.put('/user/:id',async (req,res)=>{
      try{
       const updatedData = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
 
       res.status(201).json({
             message: 'Updated successfully',
             insertData: updatedData
       })
  
      }catch(err){
      res.status(400).json({
       message: 'User not Updated',
      });
      console.log('Error',err);
       
      }
 });

//DELETE ----- DELETE

app.delete('/user/:id',async (req,res)=>{
      try{
   
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message:"Deleted successfully",
        deleted_user:user
      });
      }catch(err){
      res.status(400).json({
       message: 'User not accessed',
      });
      console.log('Error',err);
       
      }
 });

// image upload api 


//start server

app.listen(PORT,()=>{console.log('Server_running ');
})