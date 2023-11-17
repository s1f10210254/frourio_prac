import type { UserModel } from 'commonTypesWithClient/models';
import { atom } from 'jotai';

export const userAtom = atom<UserModel | null>(null);

export const userIDAtom = atom<string | null>(null);
