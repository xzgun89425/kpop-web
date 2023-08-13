import memberModel from '@/server/model/member.model';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { name, email, password } = body;

    const member = new memberModel({ name, email, password })
    await member.save();

    return { success: true, body };
});