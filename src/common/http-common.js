import axios from "axios";

export default axios.create({
  baseURL: "https://gtv-be.herokuapp.com",
  headers: {
    "Content-type": "application/json",
  },
});
