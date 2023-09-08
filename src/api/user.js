import axios from "axios";

const fetchUsers = () => {
  return axios.get("http://localhost:8001/users");
};

const addUser = (data) => {
  return axios.post("http://localhost:8001/users", data);
};

const login = (params) => {
  let newParams = { username: params.username, password: params.password };
  var validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (params.username.match(validRegex)) {
    newParams = { email: params.username, password: params.password };
  }

  return axios.get("http://localhost:8001/users", {
    params: newParams,
  });
};

const checkEmailAvailability = (email) => {
  return axios.get(`http://localhost:8001/users/check-email/${email}`);
};

export default {
  fetchUsers,
  login,
  addUser,
  checkEmailAvailability,
};
