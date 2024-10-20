import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";

import NavBar from "@/components/Shared/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/redux/store";
import { JobPayload } from "@/types/job.types";
import { CompanyType } from "@/types/company.types";
import { REQUEST_ADMIN_POST_JOB } from "@/_services/job";
import { AxiosError, AxiosResponse } from "axios";
import { handleError } from "@/_helpers/common_functions";
import { getBody } from "@/_services/service";
import { toast } from "sonner";
import { ResponseData } from "@/types/common.types";

const JobCreate = () => {
	const navigate: NavigateFunction = useNavigate();

	const { companies } = useSelector((state: RootState) => state?.company);

	const [input, setInput] = useState<JobPayload>({
		title: "",
		description: "",
		requirements: "",
		salary: 0,
		location: "",
		jobType: "",
		experience: 0,
		positions: 0,
		companyId: "",
	});
	const [loading, setLoading] = useState(false);

	const changeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setInput((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	};

	const selectChangeHandler = (value: string) => {
		const selectedCompany = companies.find(
			(company: CompanyType) => company?.name?.toLowerCase() === value
		);
		setInput({ ...input, companyId: selectedCompany._id });
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		setLoading(true);

		const {
			title,
			description,
			requirements,
			salary,
			location,
			jobType,
			experience,
			positions,
			companyId,
		} = input;

		const jobPayload: FormData = new FormData();

		jobPayload?.append("title", title);
		jobPayload?.append("description", description);
		jobPayload?.append("requirements", requirements);
		jobPayload?.append("salary", salary.toString());
		jobPayload?.append("location", location);
		jobPayload?.append("jobType", jobType);
		jobPayload?.append("experience", experience.toString());
		jobPayload?.append("positions", positions.toString());
		jobPayload?.append("companyId", companyId);

		REQUEST_ADMIN_POST_JOB(jobPayload)
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {
					navigate("/admin/jobs");
					if (response?.message) {
						toast?.success(response?.message);
					}
				}
			})
			.catch((error: AxiosError) => {
				handleError(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div>
			<NavBar />
			<div className="flex items-center justify-center w-screen my-5">
				<form
					onSubmit={submitHandler}
					className="p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md"
				>
					<div className="grid grid-cols-2 gap-2">
						<div>
							<Label>Title</Label>
							<Input
								type="text"
								name="title"
								value={input?.title}
								onChange={changeEventHandler}
								className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
							/>
						</div>
						<div>
							<Label>Description</Label>
							<Input
								type="text"
								name="description"
								value={input?.description}
								onChange={changeEventHandler}
								className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
							/>
						</div>
						<div>
							<Label>Requirements</Label>
							<Input
								type="text"
								name="requirements"
								value={input?.requirements}
								onChange={changeEventHandler}
								className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
							/>
						</div>
						<div>
							<Label>Salary</Label>
							<Input
								type="number"
								name="salary"
								value={input?.salary}
								onChange={changeEventHandler}
								className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
							/>
						</div>
						<div>
							<Label>Location</Label>
							<Input
								type="text"
								name="location"
								value={input?.location}
								onChange={changeEventHandler}
								className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
							/>
						</div>
						<div>
							<Label>Job Type</Label>
							<Input
								type="text"
								name="jobType"
								value={input?.jobType}
								onChange={changeEventHandler}
								className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
							/>
						</div>
						<div>
							<Label>Experience Level</Label>
							<Input
								type="number"
								name="experience"
								value={input?.experience}
								onChange={changeEventHandler}
								className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
							/>
						</div>
						<div>
							<Label>No of Positions</Label>
							<Input
								type="number"
								name="positions"
								value={input?.positions}
								onChange={changeEventHandler}
								className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
							/>
						</div>
						{companies.length > 0 && (
							<Select onValueChange={selectChangeHandler}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select a Company" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{companies.map(
											(company: CompanyType) => {
												return (
													<SelectItem
														value={company?.name?.toLowerCase()}
													>
														{company?.name}
													</SelectItem>
												);
											}
										)}
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					</div>
					{loading ? (
						<Button className="w-full my-4">
							{" "}
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
							Please wait{" "}
						</Button>
					) : (
						<Button type="submit" className="w-full my-4">
							Post New Job
						</Button>
					)}
					{companies.length === 0 && (
						<p className="text-xs text-red-600 font-bold text-center my-3">
							*Please register a company first, before posting a
							jobs
						</p>
					)}
				</form>
			</div>
		</div>
	);
};

export default JobCreate;
