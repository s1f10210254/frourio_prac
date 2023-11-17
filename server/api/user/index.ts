import type { DefineMethods } from 'aspida';

export type Methods = DefineMethods<{
  get: {
    query: { userId: string };
    resBody: { id: string; latitude: number; longitude: number }[];
  };
  post: {
    reqBody: {
      userId: string;
    };
  };
}>;
