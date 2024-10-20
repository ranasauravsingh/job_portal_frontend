import { GET, POST } from "./service";
import {
	ROUTE_APPLY_JOB_BY_ID,
	ROUTE_FETCH_APPLICANTS,
	ROUTE_FETCH_APPLIED_JOBS,
	ROUTE_UPDATE_APPLICANT_STATUS,
} from "./api";

export const REQUEST_APPLY_JOB_BY_ID = (id: string) => {
	return GET(`${ROUTE_APPLY_JOB_BY_ID}/${id}`);
};

export const REQUEST_FETCH_APPLICANTS = (jobId: string) => {
	return GET(`${ROUTE_FETCH_APPLICANTS}/${jobId}`);
};

export const REQUEST_UPDATE_APPLICANT_STATUS = (
	data: FormData,
	applicationId: string
) => {
	return POST(`${ROUTE_UPDATE_APPLICANT_STATUS}/${applicationId}`, data);
};

export const REQUEST_FETCH_APPLIED_JOBS = () => {
	return GET(ROUTE_FETCH_APPLIED_JOBS);
};
