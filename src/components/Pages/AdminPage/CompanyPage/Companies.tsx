import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Edit2, MoreHorizontal } from "lucide-react";
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
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RootState } from "@/redux/store";
import { REQUEST_FETCH_ALL_COMPANIES } from "@/_services/company";
import { getBody } from "@/_services/service";
import { ResponseData } from "@/types/common.types";
import { appendBaseURL, handleError } from "@/_helpers/common_functions";
import { setCompanies } from "@/redux/companySlice";
import { CompanyType } from "@/types/company.types";

const Companies = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch: Dispatch = useDispatch();

	const { companies } = useSelector((state: RootState) => state?.company);

	const [input, setInput] = useState("");
	const [initialRender, setInitialRender] = useState(true);
	const [filterCompany, setFilterCompany] =
		useState<CompanyType[]>(companies);

	const fetchAllCompanies = () => {
		REQUEST_FETCH_ALL_COMPANIES()
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {
					dispatch(setCompanies(response?.data));

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
		const filteredCompany =
			companies.length >= 0 &&
			companies.filter((company: CompanyType) => {
				if (!input) {
					return true;
				}
				return company?.name
					?.toLowerCase()
					?.includes(input.toLowerCase());
			});
		setFilterCompany(filteredCompany);
	}, [companies, input]);

	useEffect(() => {
		if (!initialRender) {
			fetchAllCompanies();
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
						placeholder="Filter by name"
						onChange={(e) => setInput(e.target.value)}
					/>
					<Button
						onClick={() =>
							navigate(appendBaseURL("/admin/companies/create"))
						}
					>
						New Company
					</Button>
				</div>
				<div>
					<Table>
						<TableCaption>
							A list of your recent registered companies
						</TableCaption>
						<TableHeader>
							<TableRow>
								<TableHead>Logo</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Date</TableHead>
								<TableHead className="text-right">
									Action
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filterCompany?.map(
								(company: CompanyType, index: number) => (
									<TableRow key={index + 1}>
										<TableCell>
											<Avatar>
												<AvatarImage
													src={company?.logo}
												/>
											</Avatar>
										</TableCell>
										<TableCell>{company?.name}</TableCell>
										<TableCell>
											{
												new Date(company?.createdAt)
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
																	`/admin/companies/${company?._id}`
																)
															)
														}
														className="flex items-center gap-2 w-fit cursor-pointer"
													>
														<Edit2 className="w-4" />
														<span>Edit</span>
													</div>
												</PopoverContent>
											</Popover>
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default Companies;
