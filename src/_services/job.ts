import { GET, POST } from "./service";
import {
	ROUTE_ADMIN_POST_JOB,
	ROUTE_FETCH_ADMIN_JOBS,
	ROUTE_FETCH_ALL_JOBS,
	ROUTE_FETCH_JOB_BY_ID,
} from "./api";

export const REQUEST_ROUTE_FETCH_ALL_JOBS = (query: string) => {
	return GET(`${ROUTE_FETCH_ALL_JOBS}?keyword=${query}`);
};

export const REQUEST_FETCH_JOB_BY_ID = (id: string) => {
	return GET(`${ROUTE_FETCH_JOB_BY_ID}/${id}`);
};

export const REQUEST_FETCH_ADMIN_JOBS = () => {
	return GET(ROUTE_FETCH_ADMIN_JOBS);
};

export const REQUEST_ADMIN_POST_JOB = (data: FormData) => {
	return POST(ROUTE_ADMIN_POST_JOB, data);
};
