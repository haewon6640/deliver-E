import axios from "axios";

export const createCustomer = (tokenId, email) => {
  const body = {
    tokenId: tokenId,
    uid: email
  };
  const headers = {
    "Content-Type": "application/json"
  };
  return axios
    .post("https://salty-wildwood-68776.herokuapp.com/api/", body, {
      headers
    })
    .then(({ data }) => {
      return data;
    })
    .catch(error => {
      return Promise.reject("Error in making payment", error);
    });
};

export const doPayment = (amount, tokenId, email) => {
  const body = {
    amount: amount,
    tokenId: tokenId,
    uid: email
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

export const createUser = authCode => {
  const body = {
    authCode: authCode
  };
  const headers = {
    "Content-Type": "application/json"
  };
  return axios
    .post("https://salty-wildwood-68776.herokuapp.com/api/createUser", body, {
      headers
    })
    .then(({ data }) => {
      return data.stripe_user_id;
    })
    .catch(error => {
      return error;
    });
};
