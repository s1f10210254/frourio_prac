import { getUser } from '$/repository/userRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  // get: async (aaa: string) => ({ status: 200, body: await getUser(aaa) }),
  get: async ({ query }) => {
    console.log('body', query);
    const userId = query.userId;
    return { status: 200, body: await getUser(userId) };
  },
}));
