import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: { userId: string };
    resBody: {
      id: number;
      postTime: string;
      content: string;
      latitude: number;
      longitude: number;
      likes: number;
      userId: string;
    }[];
  };
}>;
