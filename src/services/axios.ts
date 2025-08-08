import axios from "axios";

export const instance = axios.create({
	withCredentials: true,
});

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);
