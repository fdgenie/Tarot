import { axiosInstance } from "boot/axios";
import { firebaseDb } from "boot/firebase";

export function card({ commit }) {
  axiosInstance({
    url: "/spreads/random_card",
    method: "get"
  }).then(result => {
    commit("setCard", result.data[0]);
    firebaseDb.ref("Tarot/" + new Date()).set({
      card: result.data[0]
    });
  });
}
