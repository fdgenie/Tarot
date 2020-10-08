import { axiosInstance } from "boot/axios";
import { firebaseDb, firebaseAuth } from "boot/firebase";

export function card({ commit, dispatch }, userId) {
  axiosInstance({
    url: "/spreads/random_card",
    method: "get"
  }).then(result => {
    const [month, date, year] = new Date().toLocaleDateString().split("/");
    const card = {
      ...result.data[0],
      name: result.data[0].name
        .toUpperCase()
        .split("-")
        .join(" "),
      datePicked: date + "-" + month + "-" + year,
      todayChecked: true,
      isReverse: Math.floor(Math.random() * Math.floor(3))
    };
    firebaseDb.ref("Tarot/" + userId).push({
      card
    });
    commit("setCard", card);
    dispatch("latestReadings", userId);
  });
}

export function lastCard({ commit }, userId) {
  firebaseDb
    .ref("Tarot/" + userId)
    .limitToLast(1)
    .once("child_added", card => {
      commit("setCard", card.val().card);
    });
}

export function latestReadings({ commit }, userId) {
  firebaseDb
    .ref("Tarot/" + userId)
    .limitToLast(10)
    .once("value", card => {
      let cards = [];

      card.forEach(item => {
        var itemVal = item.val();
        cards.push(itemVal);
      });

      commit("setCards", cards.reverse());
    });
}
