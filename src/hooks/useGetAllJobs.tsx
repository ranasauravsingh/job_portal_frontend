import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";

import { REQUEST_ROUTE_FETCH_ALL_JOBS } from "@/_services/job";
import { handleError } from "@/_helpers/common_functions";
import { getBody } from "@/_services/service";
import { setAllJobs } from "@/redux/jobSlice";
import { ResponseData } from "@/types/common.types";
import { RootState } from "@/redux/store";

const useGetAllJobs = () => {
	const dispatch: Dispatch = useDispatch();

	const { searchedQuery } =
		useSelector((state: RootState) => state?.job) || "";

	const [initialRender, setInitialRender] = useState(true);

	const fetchAllJobs = () => {
		REQUEST_ROUTE_FETCH_ALL_JOBS(searchedQuery)
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {
					dispatch(setAllJobs(response?.data));

					if (response?.message) {
						toast.success(response?.message);
					}
				}
			})
			.catch((error: AxiosError) => {
				handleError(error);
			})
			.finally(() => {
				setInitialRender(false);
			});
	};

	useEffect(() => {
		if (!initialRender) {
			fetchAllJobs();
		} else {
			setInitialRender(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialRender]);
};

export default useGetAllJobs;
