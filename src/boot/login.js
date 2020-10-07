import { firebaseAuth } from "boot/firebase";

export default async ({ store }) => {
  await firebaseAuth.signInAnonymously().catch(error => {
    console.log(error);
  });

  await firebaseAuth.onAuthStateChanged(user => {
    store.commit("user/setUser", user.uid);
  });
};
