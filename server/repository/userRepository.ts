import { prismaClient } from '$/service/prismaClient';

export const getUser = async (user: string) => {
  console.log(user);
  return await prismaClient.user.findMany({
    where: { id: user },
  });
};

export const getPost = async (user: string) => {
  const post = await prismaClient.post.findMany({
    where: { userId: user },
  });

  return post.map((post) => ({
    ...post,
    postTime: post.postTime.toISOString(),
  }));
};
