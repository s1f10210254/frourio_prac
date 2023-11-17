import { prismaClient } from '$/service/prismaClient';

export const getUser = async (user: string) => {
  console.log(user);
  return await prismaClient.user.findMany({
    where: { id: user },
  });
};

export const postUser = async (userId: string) => {
  console.log(userId);
  const user = await prismaClient.user.create({
    data: {
      id: userId,
      latitude: 1,
      longitude: 2,
    },
  });
  return user;
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

export const postPost = async (
  postcontent: string,
  postlatitude: number,
  postlongitude: number,
  userId: string
) => {
  console.log('postpostpost');
  const post = await prismaClient.post.create({
    data: {
      content: postcontent,
      latitude: postlatitude,
      longitude: postlongitude,
      userId,
    },
  });
  console.log('postpostpost', post);
  return post;
};
