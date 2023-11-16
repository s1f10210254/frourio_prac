import { getPost } from '$/repository/userRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => {
    const userId = query.userId;
    return { status: 200, body: await getPost(userId) };
  },
}));
