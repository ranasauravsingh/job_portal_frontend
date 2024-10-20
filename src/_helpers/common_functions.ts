import { AxiosError } from "axios";
import { toast } from "sonner";

import { ResponseData } from "@/types/common.types";

export const handleError = (error: AxiosError) => {
	const errorResponse = error?.response?.data as ResponseData;

	if (errorResponse?.message) {
		toast.error(errorResponse?.message);
		return;
	} else {
		return console.log(`Something went wrong: ${error}`);
	}
};

export const appendBaseURL = (url: string) => {
	const REACT_BASE_URL = "/job_portal_frontend";

	return `${REACT_BASE_URL}${url}`;
};
