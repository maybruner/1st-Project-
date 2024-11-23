import Express from "express";
import connect from "./connection.js";
import userModel from "./usermodel.js";
import productModel from "./products.js";
import paymentModel from "./payment.js";

import cors from 'cors';
const app = Express();
app.use(Express.json());
app.use(cors())

connect();

const products = [
  {name: "Bread", price: 15 },
  {name: "Milk", price: 23 },
  {name: "Gum", price: 3 },
];

// For the sake of simplicity, only 3 products were populated.
// In general, the "right" way is to get the list of products and their price from the server.
const populateProducts = ()=>{
  products.forEach(async (p)=>{
    console.log(p)
    await productModel.create(p)
  })
}

// login
app.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ password: password, email: email });
    if(user){
        console.log("works")
        res.status(200).json(user)
        return
    }
    res.status(404).json({
        error: "User Not found or Password is Incorrect"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
});

// sign up
app.post("/sign-up", async (req, res) => {
  try {
    const user = req.body;
    const existingUser = await userModel.findOne({
      email: user.email,
    });
    if (existingUser) {
      return res.status(403).send("user already exsit...");
    }
    await userModel.create(user);
    res.status(200).send("user is created succefully...");
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
});

// Payment
app.post("/approve", async (req, res)=> {
  try{
    console.log(req.body)
    const productAndUser = req.body
    console.log(productAndUser)
    const user = await userModel.findOne({ email: productAndUser.user });
    const payment = new paymentModel({
      user: user._id,
      products: productAndUser.products,
    })
    await payment.save()
    res.status(200).json({ message: "Payment approved!" });

    console.log("success")
  }catch(error){
    console.log(error)
    res.status(500).json(error)
  }
})

app.listen(3002, () => {
  console.log("listening on 3002..."); 
});
