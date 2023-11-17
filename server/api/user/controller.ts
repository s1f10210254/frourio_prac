import { getUser, postUser } from '$/repository/userRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  // get: async (aaa: string) => ({ status: 200, body: await getUser(aaa) }),
  get: async ({ query }) => {
    console.log('query', query);
    const userId = query.userId;
    return { status: 200, body: await getUser(userId) };
  },
  post: async ({ body }) => ({
    status: 201,
    body: await postUser(body.userId),
  }),
}));
