import {userModel} from './user-model.js';
import bcypt from 'bcrypt';

async function userModelTest(){

const pw = await bcypt.hash('1111',10);
     if(!await userModel.findByEmail("admin@example.com"))
    userModel.create({
        email:"admin@example.com",
        name:"admin",
        password:pw,
        phoneNumber:'010-2323-2424',
        address:{  
            postalCode: "000-000",
            address1: "ex_City",
            address2: "ex_apartMent"
        },
        role:'admin'
    });

    if(!await userModel.findByEmail("abc@example.com"))
    userModel.create({
        email:"abc@example.com",
        name:"가가",
        password:pw,
        phoneNumber:'010-2323-2424',
        address:{  
            postalCode: "000-000",
            address1: "ex_City",
            address2: "ex_apartMent"
        },
    });
    if(!await userModel.findByEmail("aaa@example.com"))
    userModel.create({
        email:"aaa@example.com",
        name:"나나",
        password:pw,
        phoneNumber:'010-2323-2424',
        address:{  
            postalCode: "000-000",
            address1: "ex_City",
            address2: "ex_apartMent"
        },
    });
    if(!await userModel.findByEmail("bbb@example.com"))
    userModel.create({
        email:"bbb@example.com",
        name:"다다",
        password:pw,
        phoneNumber:'010-2323-2424',
        address:{  
            postalCode: "000-000",
            address1: "ex_City",
            address2: "ex_apartMent"
        },
    });
    if(!await userModel.findByEmail("ccc@example.com"))
    userModel.create({
        email:"ccc@example.com",
        name:"라라",
        password:pw,
        phoneNumber:'010-2323-2424',
        address:{  
            postalCode: "000-000",
            address1: "ex_City",
            address2: "ex_apartMent"
        },
    });
}

export {userModelTest}
