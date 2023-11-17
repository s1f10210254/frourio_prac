import {
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { createAuth } from 'src/utils/firebase';
import { returnNull } from './returnNull';

export const loginWithGitHub = async () => {
  const ghProvider = new GithubAuthProvider();
  console.log('ghProvider', ghProvider);
  ghProvider.addScope('read:user');

  const loginData = await signInWithPopup(createAuth(), ghProvider).catch(returnNull);

  return loginData?.user.uid;
};

export const registerWithEmail = async (email: string, password: string) => {
  try {
    const auth = createAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('userCredential', userCredential.user);
  } catch (error) {
    console.error(error);
  }
};

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const auth = createAuth();
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  await createAuth().signOut();
};
