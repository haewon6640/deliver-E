import axios from "axios";

export const doPayment = (amount, tokenId, accessToken) => {
  const body = {
    amount: amount,
    tokenId: tokenId
  };
  const headers = {
    "Content-Type": "application/json"
  };
  alert("sdfd");
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
