import { connect } from "mongoose";


function preLogin_Oauth(req,res,next){
    console.log(req.cookies['connect.sid'], 'oauth 미들웨어');
    if(req.cookies['connect.sid'] !== undefined || req.cookies['connect.sid'] == ''){
        throw new Error("이미 로그인 되어있습니다");
        return;        
    }
    else next();
    return;
} 

function preLogin_General(req,res,next){
    // console.log(req.cookies['token'],'제너럴 미들웨어');
    // if(req.cookies['token]){
    //     throw new Error("이미 로그인 되어있습니다");
    //     // res.json(202).redirect("/?login=AlreadyLogined");
    // }
    next();
}

export {preLogin_Oauth,preLogin_General};