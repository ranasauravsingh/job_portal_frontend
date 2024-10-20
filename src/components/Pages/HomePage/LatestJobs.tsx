import { useSelector } from "react-redux";

import LatestJobCards from "./LatestJobCards";
import { RootState } from "@/redux/store";
import { JobType } from "@/types/job.types";

const LatestJobs = () => {
	const { allJobs } = useSelector((state: RootState) => state?.job);

	return (
		<div className="max-w-7xl mx-auto my-20">
			<h1 className="text-4xl font-bold">
				<span className="text-[#6A38C2]">Latest & Top </span> Job
				Openings
			</h1>
			<div className="grid grid-cols-3 gap-4 my-5">
				{allJobs?.length <= 0 ? (
					<span>No Job Available</span>
				) : (
					allJobs
						?.slice(0, 6)
						.map((job: JobType, index: number) => (
							<LatestJobCards
								key={job?._id || index + 1}
								job={job}
							/>
						))
				)}
			</div>
		</div>
	);
};

export default LatestJobs;
