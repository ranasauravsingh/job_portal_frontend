import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";

import NavBar from "@/components/Shared/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBody } from "@/_services/service";
import { handleError } from "@/_helpers/common_functions";
import { REQUEST_REGISTER_COMPANY } from "@/_services/company";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch: Dispatch = useDispatch();

	const [companyName, setCompanyName] = useState("");

	const handleCompanyRegister = () => {
		const requestPayload = new FormData();
		requestPayload.append("companyName", companyName);
		REQUEST_REGISTER_COMPANY(requestPayload)
			.then((res: AxiosResponse) => {
				const response = getBody(res);

				if (response?.success === true) {
					dispatch(setSingleCompany(response?.data));
					const companyId = response?.data?._id;
					navigate(`/admin/companies/${companyId}`);

					if (response?.message) {
						toast.success(response?.message);
					}
				}
			})
			.catch((error: AxiosError) => {
				handleError(error);
			});
	};

	return (
		<div>
			<NavBar />
			<div className="max-w-4xl mx-auto">
				<div className="my-10">
					<h1 className="font-bold text-2xl">Your Company Name</h1>
					<p className="text-gray-500">
						What would you like to give your company name? you can
						change this later.
					</p>
				</div>

				<Label>Company Name</Label>
				<Input
					type="text"
					className="my-2"
					placeholder="JobHunt, Microsoft etc."
					onChange={(e) => setCompanyName(e.target.value)}
				/>
				<div className="flex items-center gap-2 my-10">
					<Button
						variant="outline"
						onClick={() => navigate("/admin/companies")}
					>
						Cancel
					</Button>
					<Button onClick={handleCompanyRegister}>Continue</Button>
				</div>
			</div>
		</div>
	);
};

export default CompanyCreate;
