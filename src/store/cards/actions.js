import { axiosInstance } from "boot/axios";

export function card({ commit }) {
  axiosInstance({
    url: "/spreads/random_card",
    method: "get"
  }).then(result => {
    commit("setCard", result.data[0]);
  });
}
