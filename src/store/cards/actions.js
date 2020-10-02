import { axiosInstance } from "boot/axios";
import { firebaseDb } from "boot/firebase";

export function card({ commit }) {
  axiosInstance({
    url: "/spreads/random_card",
    method: "get"
  }).then(result => {
    commit("setCard", result.data[0]);
    // const [month, date, year] = new Date().toLocaleDateString().split("/");
    firebaseDb.ref("Tarot").push({
      card: {
        ...result.data[0],
        datePicked: new Date().toLocaleDateString(),
        todayChecked: true
      }
    });
  });
}

export function lastCard({ commit }) {
  firebaseDb
    .ref("Tarot")
    .limitToLast(1)
    .once("child_added", card => {
      commit("setCard", card.val().card);
    });
}
