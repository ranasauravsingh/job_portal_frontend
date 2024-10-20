import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "sonner";
import { MoreHorizontal } from "lucide-react";

import NavBar from "@/components/Shared/NavBar";
import {
	REQUEST_FETCH_APPLICANTS,
	REQUEST_UPDATE_APPLICANT_STATUS,
} from "@/_services/applicant";
import { getBody } from "@/_services/service";
import { ResponseData } from "@/types/common.types";
import { handleError } from "@/_helpers/common_functions";
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
import { AdminApplicantStatus, AdminApplicantType } from "@/types/job.types";

const Applicants = () => {
	const params = useParams();
	const { id = "" } = params;

	const [initialRender, setInitialRender] = useState(true);
	const [applicants, setApplicants] = useState<AdminApplicantType[]>([]);

	const statusHandler = async (status: string, applicationId: string) => {
		const applicationPayload: FormData = new FormData();
		applicationPayload?.append("status", status);

		REQUEST_UPDATE_APPLICANT_STATUS(applicationPayload, applicationId)
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.message) {
					toast.success(response?.message);
				}
			})
			.catch((error: AxiosError) => {
				handleError(error);
			})
			.finally(() => {
				setInitialRender(false);
			});
	};

	const fetchAllApplicants = async (jobId: string) => {
		REQUEST_FETCH_APPLICANTS(jobId)
			.then((res: AxiosResponse) => {
				const response = getBody(res);
				const { applications } = response?.data || [];
				setApplicants(applications);

				if (response?.message) {
					toast.success(response?.message);
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
			fetchAllApplicants(id);
		} else {
			setInitialRender(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialRender]);

	return (
		<div>
			<NavBar />
			<div className="max-w-7xl mx-auto">
				<h1 className="font-bold text-xl my-5">
					Applicants {applicants?.length}
				</h1>
				<div>
					<Table>
						<TableCaption>
							A list of your recent applied user
						</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Full Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Contact</TableHead>
								<TableHead>Resume</TableHead>
								<TableHead>Date</TableHead>
								<TableHead className="text-right">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{applicants &&
								applicants?.map((item) => (
									<tr key={item._id}>
										<TableCell>
											{item?.applicant?.fullName}
										</TableCell>
										<TableCell>
											{item?.applicant?.email}
										</TableCell>
										<TableCell>
											{item?.applicant?.phoneNumber}
										</TableCell>
										<TableCell>
											{item.applicant?.profile?.resume ? (
												<a
													className="text-blue-600 cursor-pointer"
													href={
														item?.applicant?.profile
															?.resume
													}
													target="_blank"
													rel="noopener noreferrer"
												>
													{
														item?.applicant?.profile
															?.resumeName
													}
												</a>
											) : (
												<span>NA</span>
											)}
										</TableCell>
										<TableCell>
											{
												new Date(
													item?.applicant?.createdAt
												)
													?.toISOString()
													?.split("T")[0]
											}
										</TableCell>
										<TableCell className="float-right cursor-pointer">
											<Popover>
												<PopoverTrigger>
													<MoreHorizontal />
												</PopoverTrigger>
												<PopoverContent className="w-32">
													{Object.keys(
														AdminApplicantStatus
													).map((status, index) => {
														return (
															<div
																onClick={() =>
																	statusHandler(
																		status,
																		item?._id
																	)
																}
																key={index}
																className="flex w-fit items-center my-2 cursor-pointer"
															>
																<span>
																	{status}
																</span>
															</div>
														);
													})}
												</PopoverContent>
											</Popover>
										</TableCell>
									</tr>
								))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default Applicants;
