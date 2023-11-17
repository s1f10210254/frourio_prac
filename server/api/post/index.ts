import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: { userId: string };
    resBody: {
      id: string;
      postTime: string;
      content: string;
      latitude: number;
      longitude: number;
      likes: number;
      userId: string;
    }[];
  };

  post: {
    reqBody: {
      content: string;
      latitude: number;
      longitude: number;
      userId: string;
    };
  };

  delete: {
    query: { postId: string };
  };
}>;
