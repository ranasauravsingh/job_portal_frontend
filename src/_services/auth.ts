import { GET, POST } from "./service";
import { LoginPayload } from "@/types/auth.types";
import {
	ROUTE_LOGIN,
	ROUTE_LOGOUT,
	ROUTE_REGISTER,
	ROUTE_UPDATE_USER,
} from "./api";

export const REQUEST_ROUTE_LOGIN = (data: LoginPayload) => {
	return POST(ROUTE_LOGIN, data);
};

export const REQUEST_ROUTE_REGISTER = (data: FormData, requestHeaders = {}) => {
	return POST(ROUTE_REGISTER, data, requestHeaders);
};

export const REQUEST_ROUTE_UPDATE_USER = (
	data: FormData,
	requestHeaders = {}
) => {
	return POST(ROUTE_UPDATE_USER, data, requestHeaders);
};

export const REQUEST_ROUTE_LOGOUT = () => {
	return GET(ROUTE_LOGOUT);
};
