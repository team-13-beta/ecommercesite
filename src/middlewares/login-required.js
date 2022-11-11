import jwt from "jsonwebtoken";
import passport from "passport";

function loginRequired(req, res, next) {
  // request 헤더로부터 authorization bearer 토큰을 받음. -> general access
  // request 헤더로부터 oauth 토큰을 받음 -> oauth access
  const userToken = req.headers["authorization"]?.split(" ")[1];
  const isUserToken = !userToken || userToken === "null";
// console.log(req);  
  const access = '';
  // console.log("미들웨어안에서")
  // console.log(req.cookies);
  // console.log(req.session);
  if(req.cookies && req.session.name){
    // console.log(req.session);
    req.currentName = req.session.name;
    req.currentUserId = req.session.userObjId;
    req.currentRole = req.session.role;
    req.currentAccess = req.session.access;
    req.currentEmail = req.session.email
    req.currentPhoneNumber = req.session.phoneNumber;
    // console.log(req.cookie)
    next(); 
  }
  else if(req.headers.authorization){ 
    if (isUserToken) {
      console.log("서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음");
      res.status(403).json({
        result: "forbidden-approach",
        reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
      });
  
      return;
    }
    
    // 해당 token 이 정상적인 token인지 확인
    try {
      const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
      const jwtDecoded = jwt.verify(userToken, secretKey);
  
      const userId = jwtDecoded.userId;
      const role = jwtDecoded.role;
      // 라우터에서 req.currentUserId를 통해 유저의 id에 접근 가능하게 됨
      req.currentUserId = userId;
      req.currentRole = role;
      req.currentAccess = 'general';
  
      next();
    } catch (error) {
      // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
      // 403 코드로 JSON 형태로 프론트에 전달함.
      res.status(403).json({
      
        reason: "정상적인 토큰이 아닙니다.",
      });
  
      return;
    }
      
  }
  else{
    res.status(403).json({
      reason: "로그인한 유저만 사용할 수 있는 서비스입니다.",
    });
    return;
  }


}

export { loginRequired };
