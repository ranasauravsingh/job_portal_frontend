import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import NavBar from "@/components/Shared/NavBar";
import JobCard from "./JobCard";
import FilterCard from "./FilterCard";
import { RootState } from "@/redux/store";
import { JobType } from "@/types/job.types";

const Jobs = () => {
	const { allJobs, searchedQuery } = useSelector(
		(state: RootState) => state?.job
	);

	const [filterJobs, setFilterJobs] = useState<JobType[]>(allJobs);

	useEffect(() => {
		if (searchedQuery) {
			const filteredJobs = allJobs?.filter((job: JobType) => {
				return (
					job?.title
						?.toLowerCase()
						?.includes(searchedQuery?.toLowerCase()) ||
					job?.description
						?.toLowerCase()
						?.includes(searchedQuery?.toLowerCase()) ||
					job?.location
						?.toLowerCase()
						?.includes(searchedQuery?.toLowerCase())
				);
			});
			setFilterJobs(filteredJobs);
		} else {
			setFilterJobs(allJobs);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allJobs, searchedQuery]);

	return (
		<div>
			<NavBar />
			<div className="max-w-7xl mx-auto mt-5">
				<div className="flex gap-5">
					<div className="w-20%">
						<FilterCard />
					</div>
					{filterJobs?.length <= 0 ? (
						<span>Job not found</span>
					) : (
						<div className="flex-1 h-[88vh] overflow-y-auto pb-5">
							<div className="grid grid-cols-3 gap-4">
								{filterJobs?.map(
									(job: JobType, index: number) => (
										<motion.div
											initial={{ opacity: 0, x: 100 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: -100 }}
											transition={{ duration: 0.3 }}
											key={job?._id}
										>
											<React.Fragment
												key={job?._id || index + 1}
											>
												<JobCard job={job} />
											</React.Fragment>
										</motion.div>
									)
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Jobs;