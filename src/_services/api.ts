// const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_URL = `https://job-portal-backend-wkxa.onrender.com/api`;

const addPrefix = (route: string) => {
	return API_URL + "/" + route;
};

// Auth
export const ROUTE_LOGIN = addPrefix("user/login");
export const ROUTE_REGISTER = addPrefix("user/register");
export const ROUTE_UPDATE_USER = addPrefix("user/update-profile");
export const ROUTE_LOGOUT = addPrefix("user/logout");
export const ROUTE_UPDATE_USER_FCM_TOKEN = addPrefix("user/update-fcm-token");

// Job
export const ROUTE_FETCH_ALL_JOBS = addPrefix("job/get");
export const ROUTE_FETCH_JOB_BY_ID = addPrefix("job/get");
export const ROUTE_FETCH_ADMIN_JOBS = addPrefix("job/get-admin-jobs");
export const ROUTE_ADMIN_POST_JOB = addPrefix("job/post");

// Applicant
export const ROUTE_APPLY_JOB_BY_ID = addPrefix("application/apply");
export const ROUTE_FETCH_APPLICANTS = addPrefix("application/applicants");
export const ROUTE_UPDATE_APPLICANT_STATUS = addPrefix(
	"application/status/update"
);
export const ROUTE_FETCH_APPLIED_JOBS = addPrefix("application/get");

// Companies
export const ROUTE_REGISTER_COMPANY = addPrefix("company/register");
export const ROUTE_UPDATE_COMPANY_BY_ID = addPrefix("company/update");
export const ROUTE_FETCH_COMPANY_BY_ID = addPrefix("company/get");
export const ROUTE_FETCH_ALL_COMPANIES = addPrefix("company/get");
