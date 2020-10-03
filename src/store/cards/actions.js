import { axiosInstance } from "boot/axios";
import { firebaseDb } from "boot/firebase";

export function card({ commit }) {
  axiosInstance({
    url: "/spreads/random_card",
    method: "get"
  }).then(result => {
    const [month, date, year] = new Date().toLocaleDateString().split("/");
    const card = {
      ...result.data[0],
      datePicked: date + "-" + month + "-" + year,
      todayChecked: true
    };
    firebaseDb.ref("Tarot").push({
      card
    });
    commit("setCard", card);
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

export function latestReadings({ commit }) {
  firebaseDb
    .ref("Tarot")
    .once("value", card => {
      let cards = [];

      card.forEach((item) => {
        var itemVal = item.val();
        cards.push(itemVal);
    });
      
      commit("setCards", cards);
    });
}

