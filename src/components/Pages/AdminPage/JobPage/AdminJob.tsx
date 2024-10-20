import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";

import NavBar from "@/components/Shared/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RootState } from "@/redux/store";
import { appendBaseURL, handleError } from "@/_helpers/common_functions";
import { ResponseData } from "@/types/common.types";
import { getBody } from "@/_services/service";
import { JobType } from "@/types/job.types";
import { setAllAdminJobs } from "@/redux/jobSlice";
import { REQUEST_FETCH_ADMIN_JOBS } from "@/_services/job";

const AdminJob = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch: Dispatch = useDispatch();

	const { allAdminJobs } = useSelector((state: RootState) => state?.job);

	const [input, setInput] = useState("");
	const [initialRender, setInitialRender] = useState(true);
	const [filterJobs, setFilterJobs] = useState<JobType[]>(allAdminJobs);

	const fetchAllJobs = () => {
		REQUEST_FETCH_ADMIN_JOBS()
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {
					dispatch(setAllAdminJobs(response?.data));

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
		const filteredJobs =
			allAdminJobs.length >= 0 &&
			allAdminJobs.filter((job: JobType) => {
				if (!input) {
					return true;
				}
				return (
					job?.title?.toLowerCase()?.includes(input?.toLowerCase()) ||
					job?.company?.name
						?.toLowerCase()
						?.includes(input?.toLowerCase())
				);
			});
		setFilterJobs(filteredJobs);
	}, [allAdminJobs, input]);

	useEffect(() => {
		if (!initialRender) {
			fetchAllJobs();
		} else {
			setInitialRender(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialRender]);

	return (
		<div>
			<NavBar />
			<div className="max-w-6xl mx-auto my-10">
				<div className="flex items-center justify-between my-5">
					<Input
						className="w-fit"
						placeholder="Filter by name, role"
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button
						onClick={() =>
							navigate(appendBaseURL("/admin/jobs/create"))
						}
					>
						New Job
					</Button>
				</div>
				<div>
					<Table>
						<TableCaption>
							A list of your recent posted jobs
						</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Company Name</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Date</TableHead>
								<TableHead className="text-right">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filterJobs?.map((job: JobType, index: number) => (
								<TableRow key={index + 1}>
									<TableCell>{job?.company?.name}</TableCell>
									<TableCell>{job?.title}</TableCell>
									<TableCell>
										{
											new Date(job?.createdAt)
												?.toISOString()
												?.split("T")[0]
										}
									</TableCell>
									<TableCell className="text-right cursor-pointer">
										<Popover>
											<PopoverTrigger>
												<MoreHorizontal />
											</PopoverTrigger>
											<PopoverContent className="w-32">
												<div
													onClick={() =>
														navigate(
															appendBaseURL(
																`/admin/companies/${job?._id}`
															)
														)
													}
													className="flex items-center gap-2 w-fit cursor-pointer"
												>
													<Edit2 className="w-4" />
													<span>Edit</span>
												</div>
												<div
													onClick={() =>
														navigate(
															appendBaseURL(
																`/admin/jobs/applicants/${job?._id}`
															)
														)
													}
													className="flex items-center w-fit gap-2 cursor-pointer mt-2"
												>
													<Eye className="w-4" />
													<span>Applicants</span>
												</div>
											</PopoverContent>
										</Popover>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default AdminJob;
