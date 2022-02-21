import Axios from 'axios';

export const algoIndexer = Axios.create({
  baseURL: process.env.REACT_APP_ALGORAND_INDEXER_URL,
});

algoIndexer.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;

    return Promise.reject(new Error(message as string));
  }
);
