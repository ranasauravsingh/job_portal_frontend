import { useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { RootState } from "@/redux/store";
import { AppliedJobType } from "@/types/job.types";

const AppliedJobTable = () => {
	const { allAppliedJobs } = useSelector((state: RootState) => state?.job);

	return (
		<div>
			<Table>
				<TableCaption>A list of your applied jobs</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Date</TableHead>
						<TableHead>Job Role</TableHead>
						<TableHead>Company</TableHead>
						<TableHead className="text-right">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{allAppliedJobs?.length <= 0 ? (
						<TableRow>
							<TableCell colSpan={4} className="text-center">
								You haven't applied to any jobs yet.
							</TableCell>
						</TableRow>
					) : (
						allAppliedJobs?.map(
							(appliedJob: AppliedJobType, index: number) => (
								<TableRow key={appliedJob?._id || index + 1}>
									<TableCell>
										{
											new Date(appliedJob?.createdAt)
												?.toISOString()
												?.split("T")[0]
										}
									</TableCell>
									<TableCell>
										{appliedJob?.job?.title}
									</TableCell>
									<TableCell>
										{appliedJob.job?.company?.name}
									</TableCell>
									<TableCell className="text-right">
										<Badge
											className={`${
												appliedJob?.status ===
												"rejected"
													? "bg-red-400"
													: appliedJob?.status ===
													  "pending"
													? "bg-gray-400"
													: "bg-green-400"
											}`}
										>
											{appliedJob?.status?.toUpperCase()}
										</Badge>
									</TableCell>
								</TableRow>
							)
						)
					)}
				</TableBody>
			</Table>
		</div>
	);
};

export default AppliedJobTable;
