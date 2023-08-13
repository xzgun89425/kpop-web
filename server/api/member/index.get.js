import memberModel from '@/server/model/member.model';

export default defineEventHandler(async (event) => {
    const member = await memberModel.find({});
    return member;
});