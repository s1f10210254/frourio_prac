import { deletePost, getPost, postPost } from '$/repository/userRepository';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ query }) => {
    const userId = query.userId;
    return { status: 200, body: await getPost(userId) };
  },
  post: async ({ body }) => ({
    status: 201,
    body: await postPost(body.content, body.latitude, body.longitude, body.userId),
  }),
  delete: async ({ query }) => {
    const postId = query.postId;
    await deletePost(postId);
    return { status: 204 };
  },
}));
