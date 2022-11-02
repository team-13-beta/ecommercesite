import express from "express";
const adminRouter = express.Router();
// adminRouter.use("/",async(req,res,next) => res.json("hello"));
adminRouter.get("/orders", async(req,res,next) => 
{
    res.json("hehe")
    return;
});

// adminRouter.use("/",serveStatic("admin"));
export {adminRouter};

