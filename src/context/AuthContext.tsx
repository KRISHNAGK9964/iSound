import { auth } from "@/firebase/firebaseConfig/auth";
import { db } from "@/firebase/firebaseConfig/store";
import { GithubAuthProvider, GoogleAuthProvider, User, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type userData = User & DocumentData;

type authContextType = {
  user: userData | null;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  signinWithGoogle: (callbackUrl?:string | undefined) => void;
  signinWithGitHub: (callbackUrl?:string | undefined) => void;
  loading: boolean;
};

const authContextDefaultValues: authContextType = {
  user: null,
  signIn: () => Promise.reject(new Error("Not implemented")),
  createUser: () => Promise.reject(new Error("Not implemented")),
  logOut: () => Promise.reject(new Error("Not implemented")),
  signinWithGoogle: () => null,
  signinWithGitHub: () => null,
  loading: true,
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);


export const useAuth = () => {
    useContext(AuthContext);
}

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
    const [user, setCurrentUser] = useState<userData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
  
    const signIn = (email: string, password: string): Promise<UserCredential> => {
      return signInWithEmailAndPassword(auth, email, password);
    };
    const createUser = (
      email: string,
      password: string
    ): Promise<UserCredential> => {
      return createUserWithEmailAndPassword(auth, email, password);
    };
  
    const logOut = (): Promise<void> => {
      return signOut(auth);
    };
  
    //auth Providers
    const googleprovider = new GoogleAuthProvider();
    const githubprovider = new GithubAuthProvider();
  
    //AuthProvider mwthods
    const signinWithGoogle = (callbackUrl:string | undefined) => {
      signInWithPopup(auth, googleprovider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          if (!credential) throw new Error("No credential");
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          const userRef = doc(db, "users", user.uid);
          const docsnap = await getDoc(userRef);
          if (!docsnap.exists()) {
            const { email, photoURL, uid, displayName } = user;
            const userDoc = {
              username: displayName,
              email: email,
              password: "",
              profile_picture_url: photoURL,
              userId: uid,
              posts: [],
            };
            await setDoc(doc(db, "users", uid), userDoc);
          }
          toast.success("logged in");
          console.log(user);
          router.replace(callbackUrl ?? "/");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.log(credential, email, errorMessage, errorCode);
        });
    };
    const signinWithGitHub = (callbackUrl:string | undefined) => {
      signInWithPopup(auth, githubprovider)
        .then(async (result) => {
          // This gives you a GitHub Access Token. You can use it to access the GitHub API.
          const credential = GithubAuthProvider.credentialFromResult(result);
          if (!credential) throw new Error("No credential");
          const token = credential.accessToken;
  
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          const userRef = doc(db, "users", user.uid);
          const docsnap = await getDoc(userRef);
          if (!docsnap.exists()) {
            const { email, photoURL, uid, displayName } = user;
            const userDoc = {
              username: displayName,
              email: email,
              password: "",
              profile_picture_url: photoURL,
              userId: uid,
              posts: [],
            };
            await setDoc(doc(db, "users", uid), userDoc);
          }
  
          toast.success("logged in");
          router.replace(callbackUrl ?? "/");
        })
        .catch((error: any) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GithubAuthProvider.credentialFromError(error);
          // ...
          console.log(credential, email, errorMessage, errorCode);
        });
    };
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        console.log("AuthState changed", user);
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("USerData");
            const userData = docSnap.data();
            const currentUser = { ...user, ...userData, password: "" };
            setCurrentUser(currentUser);
            console.log(currentUser);
            setLoading(false);
          } else {
            setLoading(false);
          }
        } else {
          setCurrentUser(null);
          setLoading(false);
        }
      });
      return unsubscribe;
    }, []);
  
    const value: authContextType = {
      user,
      signIn,
      createUser,
      logOut,
      signinWithGoogle,
      signinWithGitHub,
      loading,
    };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };