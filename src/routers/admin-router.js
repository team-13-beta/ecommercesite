import express from "express";
import path from "path"
const adminRouter = express.Router();
// adminRouter.use("/",async(req,res,next) => res.json("hello"));
adminRouter.get("/orders", async(req,res) => 
{
    res.redirect("/admin")

});
adminRouter.get("/products", async(req,res) => 
{
    res.redirect("/admin")

});
adminRouter.get("/categories", async(req,res) => 
{
    res.redirect("/admin")

});
// adminRouter.use("/",serveStatic("admin"));
export {adminRouter};
