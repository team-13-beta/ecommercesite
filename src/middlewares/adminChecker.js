import jwt from "jsonwebtoken";

function adminChecker(req, res, next) {
  if (req.headers.Authorization) {
    const userToken = req.headers["authorization"]?.split(" ")[1];
    const isUserToken = !userToken || userToken === "null";

    if (isUserToken) {
      console.log(
        "서비스 사용 요청이 있습니다.하지만, Authorization 토큰: 없음",
      );
      res.status(403).json({
        result: "forbidden-approach",
        reason: "로그인한 유저만 사용할 수 있는 서비스05입니다.",
      });
      return;
    }

    try {
      const secretKey = process.env.JWT_SECRET_KEY || "secret-key";
      const jwtDecoded = jwt.verify(userToken, secretKey);

      const userId = jwtDecoded.userId;
      const role = jwtDecoded.role;
      // 라우터에서 req.currentUserId를 통해 유저의 id에 접근 가능하게 됨
      if (role !== "admin") {
        throw new Error("해당 페이지에 접근 할 권한이 없습니다");
      }

      req.currentUserId = userId;
      req.currentRole = role;
      next();
      return;
    } catch (error) {
      // jwt.verify 함수가 에러를 발생시키는 경우는 토큰이 정상적으로 decode 안되었을 경우임.
      // 403 코드로 JSON 형태로 프론트에 전달함.
      res.status(403).json({
        result: "forbidden-approach",
        reason: "위 페이지를 접근할 수 없는 토큰입니다",
      });
      return;
    }
  } else {
    res.status(403).json({
      result: "forbidden-approach",
      reason:
        "로그인을 하지 않았거나 Oauth 사용자 일 경우 위 경로에 접근할 수 없습니다.",
    });
    return;
  }
}

export { adminChecker };
