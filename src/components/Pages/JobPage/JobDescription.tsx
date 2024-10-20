import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Dispatch } from "@reduxjs/toolkit";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { REQUEST_FETCH_JOB_BY_ID } from "@/_services/job";
import { AxiosError, AxiosResponse } from "axios";
import { getBody } from "@/_services/service";
import { ResponseData } from "@/types/common.types";
import { handleError } from "@/_helpers/common_functions";
import { setSingleJob } from "@/redux/jobSlice";
import { RootState } from "@/redux/store";
import { ApplicantType, JobRouteParams } from "@/types/job.types";
import { REQUEST_APPLY_JOB_BY_ID } from "@/_services/applicant";

const JobDescription = () => {
	const params: JobRouteParams = useParams();
	const dispatch: Dispatch = useDispatch();

	const { singleJob } = useSelector((state: RootState) => state?.job);
	const { user } = useSelector((state: RootState) => state?.auth);

	const { id = "" } = params;

	const [initialRender, setInitialRender] = useState(true);

	const isInitiallyApplied =
		singleJob?.applications?.some(
			(application: ApplicantType) => application?.applicant === user?._id
		) || false;

	const [isApplied, setIsApplied] = useState(isInitiallyApplied);

	const applyJobHandler = async (jobId: string) => {
		REQUEST_APPLY_JOB_BY_ID(jobId)
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {

					const updatedSingleJob = {
						...singleJob,
						applications: [
							...singleJob.applications,
							{ applicant: user?._id },
						],
					};
					dispatch(setSingleJob(updatedSingleJob));
					setIsApplied(true);

					if (response?.message) {
						toast.success(response?.message);
					}
				}
			})
			.catch((error: AxiosError) => {
				handleError(error);
			});
	};

	const fetchJobById = (jobId: string) => {
		REQUEST_FETCH_JOB_BY_ID(jobId)
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {
					dispatch(setSingleJob(response?.data));

					const { applications } = response.data;

					setIsApplied(
						applications?.some(
							(application: ApplicantType) =>
								application?.applicant === user?._id
						)
					);

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
			fetchJobById(id);
		} else {
			setInitialRender(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialRender]);

	return (
		<div className="max-w-7xl mx-auto my-10">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="font-bold text-xl">{singleJob?.title}</h1>
					<div className="flex items-center gap-2 mt-4">
						<Badge
							className={"text-blue-700 font-bold"}
							variant="outline"
						>
							{singleJob?.positions} Positions
						</Badge>
						<Badge
							className={"text-[#F83002] font-bold"}
							variant="outline"
						>
							{singleJob?.jobType}
						</Badge>
						<Badge
							className={"text-[#7209b7] font-bold"}
							variant="outline"
						>
							{singleJob?.salary}LPA
						</Badge>
					</div>
				</div>
				<Button
					disabled={isApplied}
					onClick={() => {
						applyJobHandler(singleJob?._id);
					}}
					className={`rounded-lg ${
						isApplied
							? "bg-gray-600 cursor-not-allowed"
							: "bg-[#7209b7] hover:bg-[#5f32ad]"
					}`}
				>
					{isApplied ? "Already Applied" : "Apply Now"}
				</Button>
			</div>
			<h1 className="border-b-2 border-b-gray-300 font-medium py-4">
				Job Description
			</h1>
			<div className="my-4">
				<h1 className="font-bold my-1">
					Role:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{singleJob?.title}
					</span>
				</h1>
				<h1 className="font-bold my-1">
					Location:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{singleJob?.location}
					</span>
				</h1>
				<h1 className="font-bold my-1">
					Description:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{singleJob?.description}
					</span>
				</h1>
				<h1 className="font-bold my-1">
					Experience:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{singleJob?.experienceLevel} yrs
					</span>
				</h1>
				<h1 className="font-bold my-1">
					Salary:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{singleJob?.salary}LPA
					</span>
				</h1>
				<h1 className="font-bold my-1">
					Total Applicants:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{singleJob?.applications?.length}
					</span>
				</h1>
				<h1 className="font-bold my-1">
					Posted Date:{" "}
					<span className="pl-4 font-normal text-gray-800">
						{singleJob?.createdAt.split("T")[0]}
					</span>
				</h1>
			</div>
		</div>
	);
};

export default JobDescription;
