import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares/index.js";
import { userService  } from "../services/index.js";
import { preLogin_General } from "../middlewares/index.js";
import { preLogin_Oauth } from "../middlewares/index.js";
import oauth2 from "passport-google-oauth2";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import jwt from "jsonwebtoken";


import {orderService} from "../services/order-service.js"

config();
const userRouter = Router();
userRouter.use(cookieParser())
userRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false, // js 코드로 쿠키를 가져오지 못하게
      secure: false, // https 에서만 가져오도록 할 것인가?
      // maxAge:1800000 // cookie expired : 30minute 
    },
    store: MongoStore.create({mongoUrl: process.env.MONGO_ATALS_URL}), 
    //store: MongoStore.create({mongoUrl: process.env.MONGO_SESSION_URL}), 
  })
);

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
userRouter.post("/register", async (req, res, next) => {
  try { 
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요",
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      fullName,
      email,
      password,
      address,
      phoneNumber
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    const result = {
      code : 200,
      data : null,
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});
userRouter.post("/registerOauth", async (req, res, next) => {
  try { 
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
 
    
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요",
      );
    }
    // req (request)의 body 에서 데이터 가져오기
    // const {fullName, email, role, access}  = req.session.info;
    
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    
    const {fullName,email,role,access} = req.session.info;
    
    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUserBySession({
      fullName,
      email,
      address,
      phoneNumber,
      role,
      access
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    const result = {
      code : 200,
      data : null,
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});



// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
userRouter.post("/login", async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요",
      );
    }

    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const userToken = await userService.getUserToken({ email, password });
    // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
    const result = {
      code:200,
      token : "bearer "+userToken.token,
      isAdmin : userToken.isAdmin
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});


const GoogleStrategy = oauth2.Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID 
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET; 

//passport 초기화 및 session 연결
userRouter.use(passport.initialize())
userRouter.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
// 사용자가 페이지를 방문할 때마다 호출되는 함수
// done(null, id)로 사용자의 정보를 각 request의 user 변수에 넣어준다.
passport.deserializeUser(function (id, done) {
    done(null, id);
});


// Google login 전략
// 로그인 성공 시 callback으로 request, accessToken, refreshToken, profile 등이 나온다.
// 해당 콜백 function에서 사용자가 누구인지 done(null, user) 형식으로 넣으면 된다.
// 이 예시에서는 넘겨받은 profile을 전달하는 것으로 대체했다.
passport.use(
  new GoogleStrategy(
      {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:5000/api/auth/google/callback",
          passReqToCallback: true,
      },
      function (request, accessToken, refreshToken, profile, done) {
          return done(null, profile);
      }
  )
);

userRouter.get('/auth/google', 
passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

userRouter.get('/auth/google/callback', 
  passport.authenticate( 'google', {failureRedirect: '/login?loginError' }),
    async function(req,res){
      const email = req.user.email;     
      const user = await userService.getUserByUserEmail(email); 
      if(!user){ // 해당계정이 존재하지 않으므로 auth 사용자 회원가입 창으로 리다이렉트
        req.session.info ={
        fullName : req.user.displayName,
        email : req.user.email,
        role : "user",
        access : "auth"
      };

        res.redirect('/registerOauth');
        return;
      }
      req.session.userObjId = user._id;
      req.session.userId = user.userId;
      req.session.name = user.name;
      req.session.email = user.email;
      req.session.role = user.role;
      req.session.access = user.access;
      req.session.phoneNumber = user.phoneNumber;

      res.redirect("/");
    }

);

/* [Error Code] : 라우팅 간에 /login이 먼저 들어가면 get이 인식이 되지 않는 
userRouter.get("/login/auth/google" , async function(req,res){
  passport.authenticate("google", { scope: ["email", "profile"] })
  // return res.status(200).json({ key: req.session.id, expire : req.session.cookie.expires, example:"hoho"});
})

userRouter.get("/login/auth/google/callback",
passport.authenticate("google",{
  successRedirect : "/",
  failureRedirect:"/login"
}))
*/
userRouter.get('/logout', async (req,res,next)=> {
	await req.session.destroy((err)=>{
    if(err){  // 에러가 발생하면 세션에 상태를 저장 -> 이후에 session DB를 훑어서 삭제.
    req.session.staus = 'deleted';
    res.json({result:"error"});
  }
    else
    res.status(200).json({result:"success"});
  });
})




// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.use("/userlist", loginRequired)
userRouter.get("/userlist", async function (req, res, next) {
  try {
    // 사용자의 권한(Role)에 따라 사용자 목록을 얻음 || admin : 전체 데이터, user : 본인의 데이터
    let option = '';
    if(req.currentRole !== 'admin')
    option = req.currentUserId;    
    
    const user = await userService.getUsers(option);

    if(!user){
    res.status(502).json("해당 계정이 삭제되었거나 존재하지 않습니다");
    return ;
  }
    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// userRouter.get("/userlistBySession", loginRequired,async function(req,res,next){

// });



userRouter.get("/userBySession", loginRequired, async function(req,res,next){
  try{
  if (is.emptyObject(req.body)) {
    throw new Error(
      "headers의 Content-Type을 application/json으로 설정해주세요",
    );
  }

  const name = req.body.fullName;
  const userId = req.session.userObjId;
  const address = req.body.address;
  const phoneNumber =  req.body.phoneNumber;
  const role = req.session.role;

  const toUpdate = {
    ...(name && { name }),
    ...(address && { address }),
    ...(phoneNumber && { phoneNumber }),
    ...(role && { role }),
  };

  // 사용자 정보를 업데이트함.
  const updatedUserInfo = await userService.updateUserBySession(userId,toUpdate);
  console.log(updatedUserInfo);
  // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
  res.status(200).json(updatedUserInfo);
  return;
}catch (error) {
  next(error);
}
}); 




// 사용자 정보 수정
// (예를 들어 /api/users/abc12345@example.com => req.params.userEmail
userRouter.patch("/users",
  loginRequired,
  async function (req, res, next) {
    try {
      // content-type 을 application/json 로 프론트에서
      // 설정 안 하고 요청하면, body가 비어 있게 됨.
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해주세요",
        );
      }

      // params로부터 Email을 가져옴
      // const userEmail = req.params.userEmail;
       const userId = req.currentUserId;

      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.fullName;
      const password = req.body.password;
      const address = req.body.address;
      const phoneNumber = req.body.phoneNumber;
      const role = req.body.role;

      // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
      const currentPassword = req.body.currentPassword;

      // currentPassword 없을 시, 진행 불가
      if (!currentPassword) {
        throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
      } 

      const userInfoRequired = { userId, currentPassword };

      // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
      // 보내주었다면, 업데이트용 객체에 삽입함.
      // req.body로 보내주지 않은 필드는 업데이트를 진행하지 않음
      const toUpdate = {
        ...(name && { name }),
        ...(password && { password }),
        ...(address && { address }),
        ...(phoneNumber && { phoneNumber }),
        ...(role && { role }),
      };

      // 사용자 정보를 업데이트함.
      const updatedUserInfo = await userService.updateUser(
        userInfoRequired,
        toUpdate,
      );

      // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
      res.status(200).json(updatedUserInfo);
      return;
    } catch (error) {
      next(error);
    }
  },
);

userRouter.delete('/delete', loginRequired, async (req,res,next)=>{
const userId = req.currentUserId;
// res.json({userId, Role });
const state = await userService.deleteUser(userId);
res.json(state);
});


userRouter.get('/sessionInfo',async (req,res,next)=>{
  res.json({
    name:req.session.name,
  })
})



userRouter.get('/:user_id',loginRequired, async (req,res,next)=>{
  try {
    // 사용자의 권한(Role)에 따라 사용자 목록을 얻음 || admin : 전체 데이터, user : 본인의 데이터
    const userId = req.params.user_id;
    if(req.currentRole !== 'admin') throw new Error("일반 사용자는 접근권한이 없습니다!") 
    const user = await userService.getUserByUserId(userId);
    if(!user){
    res.status(502).json("해당 계정이 삭제되었거나 존재하지 않습니다");
    return ;
  }
    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
})

userRouter.get('/admin/check', async (req,res,next)=>{
      if(req.headers.authorization){
          const userToken = req.headers["authorization"].split(" ")[1];
          const isUserToken = !userToken || userToken === "null";
          if (isUserToken) {
            res.status(403).json({
              result: userToken,
              });
              return;
            }
  
          try {
          const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
          const jwtDecoded = jwt.verify(userToken, secretKey);
      
          const userId = jwtDecoded.userId;
          const role = jwtDecoded.role;
          // 라우터에서 req.currentUserId를 통해 유저의 id에 접근 가능하게 됨
          if(role !== "admin"){
          throw new Error("해당 페이지에 접근 할 권한이 없습니다");
          }
          
          res.status(200).json({
            result : "success"
          });
          return;
          
           } catch (error) {
          // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
          // 403 코드로 JSON 형태로 프론트에 전달함.
          res.status(403).json({
              result: "fail",
          });
          return;
          }
      }
      else{
        res.status(403).json({
          result: "fail"
        });
          return;
        }
    })

/////////////// 주문 관련 API
    userRouter.post("/orders", loginRequired, async (req, res, next) => {
      try {
        // req (request)의 body 에서 데이터 가져오기
        // 추가해볼 데이터
        const userObjId = req.currentUserId;
        
        const { userName, address, phoneNumber, buyingProduct } = req.body;
        const basket = { userName, address, phoneNumber, buyingProduct };
        console.log("여기가 order apiw 지점");
        console.log(basket);
        console.log(userObjId,basket);
        // 위 데이터를 유저 db에 추가하기
        const newOrder = await orderService.addOrder({
          userObjId,
          basket,
        });
        
        const result = {
          code: 200,
          message: "주문 성공!",
        };
        // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
        // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
    });

    userRouter.get("/orders", async (req, res, next) => {
      try {
        const orders = await orderService.getAllOrders();
        let result = [];
        for (let order of orders) {
          let content = {
            id: String(order.orderId),
            userName: order.userName,
            userId: order.userId, //(product.categoryId.categoryId)
            buyingProduct: order.buyingProduct,
            address: order.address,
            phoneNumber: order.phoneNumber,
            status: order.status,
            totalPrice: order.totalPrice,
            createdTime: order.createdTime,
            updatedTime: order.updatedTime,
          };
          result.push(content);
        }
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });
    
    userRouter.get("/orders/:consumer_id", async (req, res, next) => {
      try {
        const consumer_id = req.params.consumer_id;
        const orders = await orderService.getOrders(consumer_id);
        let result = [];
        for (let order of orders) {
          let content = {
            id: String(order.orderId),
            userName: order.userName,
            userId: order.userId, //(product.categoryId.categoryId)
            buyingProduct: order.buyingProduct,
            address: order.address,
            phoneNumber: order.phoneNumber,
            status: order.status,
            totalPrice: order.totalPrice,
            createdTime: order.createdTime,
            updatedTime: order.updatedTime,
          };
          result.push(content);
        }
        //console.log(products);
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });
    
    //주문 상세조회 API
    userRouter.get("/orders/item/:order_id", async (req, res, next) => {
      try {
        const order_id = req.params.order_id;
        const order = await orderService.getOrder(Number(order_id));
        //console.log(products);
        let result = {
          id: String(order.orderId),
          userName: order.userName,
          userId: order.userId, //(product.categoryId.categoryId)
          buyingProduct: order.buyingProduct,
          address: order.address,
          phoneNumber: order.phoneNumber,
          status: order.status,
          totalPrice: order.totalPrice,
          createdTime: order.createdTime,
          updatedTime: order.updatedTime,
        };
        res.status(200).json(result);
      } catch (err) {
        next(err);
      }
    });
    
    userRouter.patch("/orders/:order_Id", async function (req, res, next) {
      try {
        // params로부터 id를 가져옴
        const order_Id = req.params.order_Id;
        console.log(order_Id);
        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const { address, status } = req.body;
    
        // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
        // 보내주었다면, 업데이트용 객체에 삽입함.
        const toUpdate = {
          ...(address && { address }),
          ...(status && { status }),
        };
        console.log(toUpdate);
        // 사용자 정보를 업데이트함.
        const updatedOrderInfo = await orderService.setOrder(order_Id, toUpdate);
    
        // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
        res.status(200).json(updatedOrderInfo);
      } catch (error) {
        next(error);
      }
    });
    
    userRouter.delete("/orders/:order_Id", loginRequired, async (req, res, next) => {
      // 삭제할 상품 이름
      try {
        const order_Id = req.params.order_Id;
        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const userObjId = req.currentUserId;
        console.log(userObjId);
        const deleteorder = await orderService.deleteOrder(order_Id, userObjId);
        res.status(201).json(deleteorder);
      } catch (err) {
        next(err);
      }
    });


export { userRouter };
