import { prismaClient } from '$/service/prismaClient';

export const getUser = async (userId: string) => {
  console.log(userId);
  return await prismaClient.user.findMany({
    where: { id: userId },
  });
};

// const postUser = async (userId: string) => {
//   const prismaUser = await prismaClient.user.create({
//     data: {
//       id: userId,
//       latitude: 1.1,
//       longitude: 1.2,
//     },
//   });
// };
