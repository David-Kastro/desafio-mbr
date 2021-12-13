import axios from "axios";

const URL = "http://localhost:3000/address/create";

export default function sendAddress(data: Address) {
  return axios.post<Result>(URL, data);
}
