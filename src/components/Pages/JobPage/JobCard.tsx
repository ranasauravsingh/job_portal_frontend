import { Bookmark } from "lucide-react";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JobCardProps } from "@/types/job.types";

const JobCard = (props: JobCardProps) => {
	const navigate: NavigateFunction = useNavigate();

	const { job } = props;

	const daysAgoFunction = (mongodbTime: Date) => {
		const createdAt: Date = new Date(mongodbTime);
		const currentTime: Date = new Date();
		const timeDifference = currentTime?.valueOf() - createdAt?.valueOf();
		return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
	};

	return (
		<div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
			<div className="flex items-center justify-between">
				<p className="text-sm text-gray-500">
					{daysAgoFunction(job?.createdAt) === 0
						? "Today"
						: `${daysAgoFunction(job?.createdAt)} days ago`}
				</p>
				<Button variant="outline" className="rounded-full" size="icon">
					<Bookmark />
				</Button>
			</div>

			<div className="flex items-center gap-2 my-2">
				<Button className="p-6" variant="outline" size="icon">
					<Avatar>
						<AvatarImage
							src={
								job?.company?.logo ||
								`https://github.com/shadcn.png`
							}
						/>
					</Avatar>
				</Button>
				<div>
					<h1 className="font-medium text-lg">
						{job?.company?.name || `Company Name`}
					</h1>
					<p className="text-sm text-gray-500">India</p>
				</div>
			</div>

			<div>
				<h1 className="font-bold text-lg my-2">
					{job?.title || `Title`}
				</h1>
				<p className="text-sm text-gray-600">
					{job?.description || `Description`}
				</p>
			</div>
			<div className="flex items-center gap-2 mt-4">
				<Badge className={"text-blue-700 font-bold"} variant="outline">
					{job?.positions || 0} Positions
				</Badge>
				<Badge className={"text-[#F83002] font-bold"} variant="outline">
					{job?.jobType || `Full Time`}
				</Badge>
				<Badge className={"text-[#7209b7] font-bold"} variant="outline">
					{job?.salary || 0}LPA
				</Badge>
			</div>
			<div className="flex items-center gap-4 mt-4">
				<Button
					onClick={() => navigate(`/description/${job?._id}`)}
					variant="outline"
				>
					Details
				</Button>
				<Button className="bg-[#7209b7]">Save For Later</Button>
			</div>
		</div>
	);
};

export default JobCard;
