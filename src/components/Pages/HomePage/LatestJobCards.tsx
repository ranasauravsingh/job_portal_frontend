import { NavigateFunction, useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { LatestJobCardProps } from "@/types/job.types";
import { appendBaseURL } from "@/_helpers/common_functions";

const LatestJobCards = (props: LatestJobCardProps) => {
	const { job } = props;

	const navigate: NavigateFunction = useNavigate();

	return (
		<div
			onClick={() =>
				navigate(appendBaseURL(`/description/${job?._id || 0}`))
			}
			className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
		>
			<div>
				<h1 className="font-medium text-lg">
					{job?.company?.name || "lorem"}
				</h1>
				<p className="text-sm text-gray-500">India</p>
			</div>
			<div>
				<h1 className="font-bold text-lg my-2">
					{job?.title || "loremEpsum"}
				</h1>
				<p className="text-sm text-gray-600">
					{job?.description || "lorem epsum"}
				</p>
			</div>
			<div className="flex items-center gap-2 mt-4">
				<Badge className={"text-blue-700 font-bold"} variant="outline">
					{job?.positions || 0} Positions
				</Badge>
				<Badge className={"text-[#F83002] font-bold"} variant="outline">
					{job?.jobType || "Full"}
				</Badge>
				<Badge className={"text-[#7209b7] font-bold"} variant="outline">
					{job?.salary || 0}LPA
				</Badge>
			</div>
		</div>
	);
};

export default LatestJobCards;
