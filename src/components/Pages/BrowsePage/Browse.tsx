import { useEffect } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import NavBar from "@/components/Shared/NavBar";
import JobCard from "../JobPage/JobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { RootState } from "@/redux/store";
import { setSearchedQuery } from "@/redux/jobSlice";
import { JobType } from "@/types/job.types";

const Browse = () => {
	useGetAllJobs();

	const { allJobs } = useSelector((state: RootState) => state?.job);
	const dispatch: Dispatch = useDispatch();

	useEffect(() => {
		return () => {
			dispatch(setSearchedQuery(""));
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<NavBar />
			<div className="max-w-7xl mx-auto my-10">
				<h1 className="font-bold text-xl my-10">
					Search Results ({allJobs?.length})
				</h1>
				<div className="grid grid-cols-3 gap-4">
					{allJobs?.map((job: JobType, index: number) => {
						return (
							<JobCard key={job?._id || index + 1} job={job} />
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Browse;
