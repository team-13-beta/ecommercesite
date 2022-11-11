import { connect } from "mongoose";


function preLogin_Oauth(req,res,next){
    if(req.cookies['connect.sid']){
        throw new Error(`Oauth로 이미 로그인 되어있습니다`);        
    }
    else next();
    
} 

function preLogin_General(req,res,next){
    if(req.headers.Authorization){
        throw new Error(`${req.headers.Authorization} 일반 접속으로 이미 로그인 되어있습니다`);
        // res.json(202).redirect("/?login=AlreadyLogined");
    }
    else next();
}

export {preLogin_Oauth,preLogin_General};