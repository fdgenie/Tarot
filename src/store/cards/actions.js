import { axiosInstance } from "boot/axios";
import { firebaseDb } from "boot/firebase";

export function card({ commit }) {
  axiosInstance({
    url: "/spreads/random_card",
    method: "get"
  }).then(result => {
    console.log(result.data[0].name);
    const [month, date, year] = new Date().toLocaleDateString().split("/");
    const card = {
      ...result.data[0],
      name: result.data[0].name.toUpperCase().split('-').join(" "),
      datePicked: date + "-" + month + "-" + year,
      todayChecked: true,
      isReverse: Math.floor(Math.random() * Math.floor(3))
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
