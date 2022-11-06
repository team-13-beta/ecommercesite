import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares/index.js";
import { userService } from "../services/index.js";
import oauth2 from "passport-google-oauth2";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import { config } from "dotenv";

const userRouter = Router();
config();
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
    const address = req.body.exAddress;
    const phoneNumber = req.body.exPhoneNumber;

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
    res.status(201).json(newUser);
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
    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

userRouter.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: false, // js 코드로 쿠키를 가져오지 못하게
      secure: false, // https 에서만 가져오도록 할 것인가?
      maxAge:1800000 // cookie expired : 30minute 
    },
    store: MongoStore.create({mongoUrl: process.env.MONGO_SESSION_URL}),
  })
);

const GoogleStrategy = oauth2.Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID 
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET; 

//passport 초기화 및 session 연결
userRouter.use(passport.initialize())
userRouter.use(passport.session());
passport.serializeUser(function (user, done) {
  console.log(user.id);
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
          // console.log("### Profile Value");
          // console.log(profile);
          // console.log("### Profile Value : " + accessToken);
          // console.log("access Token")
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
    function(req,res){
      // req.session.name = req.user.displayName;
      // req.session.email = req.user.email;
      // req.session.role = "user",
      // req.session.idcode = req.user.id
      
      
      res.redirect("/?loginSuccess");
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
  req.logout((err)=>{
    if (err) { 
      req.session.redirect('/?logoutFailure') }
    else{
    req.session.destroy();
    res.redirect('/?logoutSuccess');
  }
  });
})




// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get("/userlist", loginRequired, async function (req, res, next) {
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
      const fullName = req.body.fullName;
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
        ...(fullName && { fullName }),
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

export { userRouter };
