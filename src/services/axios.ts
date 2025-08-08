import axios from "axios";

export const instance = axios.create({
	withCredentials: false,
});

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);
