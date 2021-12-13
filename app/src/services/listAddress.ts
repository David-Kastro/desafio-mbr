import axios from "axios";

const URL = "http://localhost:3000/address/list";

export default function sendAddress(
  page: number,
  pageSize: number,
  orderBy: string | null,
  order: string | null,
  keyword: string | null
) {
  const query = `${URL}?page=${page}${pageSize ? `&pageSize=${pageSize}` : ""}${
    orderBy ? `&orderBy=${orderBy}` : ""
  }${order ? `&order=${order}` : ""}${
    keyword && keyword !== "" ? `&keyword=${keyword}` : ""
  }`;
  return axios.get<Result<{ list: Address[]; total: number } | null>>(query);
}
