import axios, { AxiosInstance, AxiosResponse } from "axios";

// Axios instance with default configuration
const axiosInstance: AxiosInstance = axios.create({
	baseURL: `https://job-portal-backend-wkxa.onrender.com/api`,
	withCredentials: true, // This ensures that cookies are sent with requests
});

export const GET = (route: string, params = {}) => {
	const headers = {
		"Content-Type": "application/json",
	};
	return axiosInstance.get(route, { params, headers });
};

export const POST = (route: string, params = {}, requestHeaders = {}) => {
	const headers = {
		"Content-Type": "application/json",
		...requestHeaders,
	};
	return axiosInstance.post(route, params, { headers: headers });
};

export const PUT = (route: string, params = {}, requestHeaders = {}) => {
	const headers = {
		"Content-Type": "application/json",
		...requestHeaders,
	};
	return axiosInstance.put(route, params, { headers: headers });
};

export const getBody = (response: AxiosResponse) => {
	// if (response.response.status === 503) {
	// 	window.location.href = '/maintenance';
	// } else {
	if (
		response?.data?.message &&
		response?.data?.message === "Network Error"
	) {
		// nothing
	} else {
		if (response?.data?.code && response?.data?.code === 412) {
			// store.dispatch(loginActions.userLogout());
			localStorage.removeItem("user");
			localStorage.removeItem("access_token");
			window?.top?.close();
		}
		if (response?.data?.code && response?.data?.code === 401) {
			window.location.href = "/login";
			localStorage.clear();
		}
		if (response?.data?.meta) {
			// store.dispatch(loginActions.setMetaData(response.data.meta));
			// localStorage.setItem("meta_data", JSON.stringify(response.data.meta))
		}
		return response?.data;
	}
	// }
};
