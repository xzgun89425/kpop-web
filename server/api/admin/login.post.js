// import adminModel from '@/server/model/admin.model';

// export default defineEventHandler(async (event) => {
//     const body = await readBody(event);
//     const { account, password } = body;

//     const user = await adminModel.findOne({ account: account });
//     if (user) {
//         if (user.password === password) {
//             return { status: 200, statusText: '登入成功', body }
//         } else {
//             return { status: 400, statusText: '密碼錯誤', body }
//         }
//     } else {
//         return { status: 400, statusText: '查無帳號', body }
//     }
// });