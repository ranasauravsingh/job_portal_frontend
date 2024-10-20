import { GET, POST, PUT } from "./service";
import {
	ROUTE_FETCH_ALL_COMPANIES,
	ROUTE_FETCH_COMPANY_BY_ID,
	ROUTE_REGISTER_COMPANY,
	ROUTE_UPDATE_COMPANY_BY_ID,
} from "./api";

export const REQUEST_REGISTER_COMPANY = (data: FormData) => {
	return POST(ROUTE_REGISTER_COMPANY, data);
};

export const REQUEST_UPDATE_COMPANY_BY_ID = (
	data: FormData,
	id: string,
	requestHeaders = {}
) => {
	return PUT(`${ROUTE_UPDATE_COMPANY_BY_ID}/${id}`, data, requestHeaders);
};

export const REQUEST_FETCH_COMPANY_BY_ID = (id: string) => {
	return GET(`${ROUTE_FETCH_COMPANY_BY_ID}/${id}`);
};

export const REQUEST_FETCH_ALL_COMPANIES = () => {
	return GET(ROUTE_FETCH_ALL_COMPANIES);
};
