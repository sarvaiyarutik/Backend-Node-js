

import express from "express";
import httpError from "./middleware/httpError.js";



const app = express();

app.use(express.json())

const productList = [
  {
    id: 1,
    name: "iPhone 15",
    category: "Mobile",
    price: 65000,
    stock: 10
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "Mobile",
    price: 72000,
    stock: 8
  },
  {
    id: 3,
    name: "HP Pavilion",
    category: "Laptop",
    price: 58000,
    stock: 15
  },
  {
    id: 4,
    name: "Dell Inspiron",
    category: "Laptop",
    price: 62000,
    stock: 12
  },
  {
    id: 5,
    name: "Boat Rockerz 450",
    category: "Headphone",
    price: 1500,
    stock: 25
  },
  {
    id: 6,
    name: "Sony WH-1000XM5",
    category: "Headphone",
    price: 29000,
    stock: 6
  },
  {
    id: 7,
    name: "Logitech Mouse",
    category: "Accessories",
    price: 1200,
    stock: 30
  },
  {
    id: 8,
    name: "Redragon Keyboard",
    category: "Accessories",
    price: 2500,
    stock: 20
  },
  {
    id: 9,
    name: "Samsung 24 Inch Monitor",
    category: "Monitor",
    price: 11000,
    stock: 14
  },
  {
    id: 10,
    name: "Mi Smart Watch",
    category: "Smartwatch",
    price: 3500,
    stock: 18
  }
]; 


app.get("/",(req,res)=>{

    res.json("Express crud");

})

app.get("/productList",(req,res)=>{

        if(productList.length === 0){

            return res.status(200).json({message:"product data not available"});
        }

        res.status(200).json({success:true,message:"data added successfully",productList})

})

app.get("/productList/:id",(req,res,next)=>{

    try{

        const { id } = req.params

        const product = productList.find((p)=>p.id === Number(id));


        if(product === undefined){

            return res.status(200).json("product not available");
        }

        res.status(200).json({message:"id not available",product});


    }catch(err){

        return next(new httpError("Request not found"));
    }

});


app.post("/product/add",(req,res,next)=>{

    try{    

        const { name , category }  = req.body;

        if(name === undefined || category === undefined){

            return res.status(200).json("name and category required");

        }

        const newProduct ={

            id:new Date().getTime(),
            name:name,
            category:category
        }

        productList.push(newProduct);

        res.status(201).json({success:true,message:"data added successfully",newProduct});


    }catch(err){

        return next(new httpError("Request not found"));

    }

})


app.delete("/productDelete/:id",(req,res,next)=>{

     try{

        const { id }  = req.params;

        const { name , category } = req.body;

        const index = productList.findIndex((p)=>p.id === Number(id));

        if(index === -1){

            return next(new httpError("data not found with this id",404));

        }

        productList.splice(index,1);


        return res.status(200).json({success:true,message:"Data  delete successfully",productList})

     }catch(err){

        return next(new httpError("Request not found"));

     }

})


app.patch("/productPatch/:id",(req,res,next)=>{

    try{

        const { id } = req.params

        const { name,category } = req.body

        const product = productList.find((p)=>p.id === Number(id));

        if(product === undefined){

            return next(new httpError("data not found with this required",404));

        }

        if(name){

            product.name = name;

        }

        if(category){

            product.category = category;       

        }

        if(name === undefined && category === undefined){

            return next(new httpError("for updating task data task or description is required",404))

        }

        res.status(200).json({success:true,message:"data update successfully",product});
        
    }catch(err){

        return next(new httpError("Request not found"));

    }

})

app.put("/productPut/:id",(req,res,next)=>{


    try{

        const {id}  = req.params;
        const {name, category} = req.body;

        const index  = productList.findIndex((p)=>p.id === Number(id));

        if(index === -1){
 
            return next(new httpError("data with this id not found",404));

        }

        productList[index]={

            ...productList[index],
            name:name || productList[index].name,
            category:category || productList[index].category,

        }


        res.status(200).json({success:true,message:"Data added successfully",product:productList[index]});


    }catch(err){

        return next(new httpError("Request not found"));

    }


})


app.use((req,res,next)=>{

    return next(new httpError("Request not found"));

})

app.use((error,req,res,next)=>{

    if(res.headersSent){

        return next(error);

    }

    res.status(error.statusCode || 500).json({message: error.message || "Internal Server error"});

})




const port = 4000;

app.listen(port,(err)=>{

    if(err){

        console.log(err);

    }

    console.log(`server running on port ${port}`)

})