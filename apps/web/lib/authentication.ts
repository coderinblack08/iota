import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import Router from "next/router";
import { auth, firestore } from "./firebase";

export const getProvider = (strategy: string) => {
  if (strategy === "google") {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    return provider;
  }
  throw new Error("Unknown authentication strategy");
};

export const login = async (
  provider: GoogleAuthProvider | GithubAuthProvider | TwitterAuthProvider
) => {
  try {
    const { user } = await signInWithPopup(auth, provider);
    await setDoc(doc(firestore, "users", user.uid), {
      email: user.email,
      displayName: user.displayName,
      bio: "",
      socials: {},
      createdAt: serverTimestamp(),
    });
    Router.push("/workspace");
  } catch (error) {
    console.error(error);
  }
};
