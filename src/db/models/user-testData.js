import { userModel } from "./user-model.js";
import bcypt from "bcrypt";
import { timeZone } from "../../services/timeZone.js";
import { userService } from "../../services/user-service.js";
async function userModelTest() {
  const pw = await bcypt.hash("1111", 10);

  const time = timeZone();

  /*
 async addUser(userInfo) {
    // 객체 destructuring
    const { email, fullName:name, password, phoneNumber, address } = userInfo;
    // 이메일 중복 확인
    const user = await this.userModel.findByEmail(email);
    if (user) {
      throw new Error(
        '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.',
      );
    }

    // 이메일 중복은 이제 아니므로, 회원가입을 진행함

    // 우선 비밀번호 해쉬화(암호화)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserInfo = { name, email, password: hashedPassword , phoneNumber, address };

    // db에 저장
    const createdNewUser = await this.userModel.create(newUserInfo);

    return createdNewUser;
  }

*/

  if (!(await userModel.findByEmail("admin@example.com")))
    // admin은 role:admin 예외 지정이 필요, userModel로 create!
    await userModel.create({
      userId: 1,
      email: "admin@example.com",
      name: "admin",
      password: String(pw),
      phoneNumber: "010-2323-2424",
      address: {
        postalCode: "000-000",
        address1: "ex_City",
        address2: "ex_apartMent",
      },
      role: "admin",
      createdTime: time,
      updatedTime: time,
    });

  if (!(await userModel.findByEmail("abc@example.com")))
    await userService.addUser({
      email: "abc@example.com",
      fullName: "가가",
      password: "1111",
      phoneNumber: "010-2323-2424",
      address: {
        postalCode: "000-000",
        address1: "ex_City",
        address2: "ex_apartMent",
      },
    });

  if (!(await userModel.findByEmail("aaa@example.com")))
    await userService.addUser({
      email: "aaa@example.com",
      fullName: "나나",
      password: "1111",
      phoneNumber: "010-2323-2424",
      address: {
        postalCode: "000-000",
        address1: "ex_City",
        address2: "ex_apartMent",
      },
    });

  if (!(await userModel.findByEmail("bbb@example.com")))
    await userService.addUser({
      email: "bbb@example.com",
      fullName: "다다",
      password: "1111",
      phoneNumber: "010-2323-2424",
      address: {
        postalCode: "000-000",
        address1: "ex_City",
        address2: "ex_apartMent",
      },
    });

  if (!(await userModel.findByEmail("ccc@example.com")))
    await userService.addUser({
      email: "ccc@example.com",
      fullName: "라라",
      password: "1111",
      phoneNumber: "010-2323-2424",
      address: {
        postalCode: "000-000",
        address1: "ex_City",
        address2: "ex_apartMent",
      },
    });
}
export { userModelTest };
