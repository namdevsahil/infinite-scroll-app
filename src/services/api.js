import axios from "axios";

export const fetchPhotos = async (page = 1, limit = 12) => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/photos", {
    params: { _page: page, _limit: limit },
  });
  return res.data;
};
