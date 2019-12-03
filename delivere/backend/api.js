import axios from "axios";
// import { access } from "fs";

export const doPayment = (amount, tokenId, accessToken) => {
  const body = {
    amount: amount,
    tokenId: tokenId,
    uid: accessToken
  };
  const headers = {
    "Content-Type": "application/json"
  };
  return axios
    .post("https://salty-wildwood-68776.herokuapp.com/api/doPayment", body, {
      headers
    })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return Promise.reject("Error in making payment", error);
    });
};
