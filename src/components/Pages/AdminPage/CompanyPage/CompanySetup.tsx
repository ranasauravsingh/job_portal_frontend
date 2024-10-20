import { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";

import NavBar from "@/components/Shared/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getBody } from "@/_services/service";
import { appendBaseURL, handleError } from "@/_helpers/common_functions";
import {
	REQUEST_FETCH_COMPANY_BY_ID,
	REQUEST_UPDATE_COMPANY_BY_ID,
} from "@/_services/company";
import { ResponseData } from "@/types/common.types";
import { CompanyPayload } from "@/types/company.types";

const CompanySetup = () => {
	const params = useParams();

	const navigate: NavigateFunction = useNavigate();

	const { id = "" } = params;
	const [input, setInput] = useState<CompanyPayload>({
		name: "",
		description: "",
		website: "",
		location: "",
		file: null,
	});
	const [loading, setLoading] = useState(false);
	const [initialRender, setInitialRender] = useState(true);

	const changeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setInput((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	};

	const changeFileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput((prevInput) => ({
			...prevInput,
			file: event?.target?.files?.[0] ?? null,
		}));
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		setLoading(true);

		const companyPayload: FormData = new FormData();
		const { name, description, website, location, file } = input;

		companyPayload?.append("name", name);
		companyPayload?.append("description", description);
		companyPayload?.append("website", website);
		companyPayload?.append("location", location);

		if (file) {
			companyPayload?.append("file", file);
		}

		const requestHeaders = {
			"Content-Type": "multipart/form-data",
		};

		REQUEST_UPDATE_COMPANY_BY_ID(companyPayload, id, requestHeaders)
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {
					navigate(appendBaseURL("/admin/companies"));
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

	const fetchCompanyById = (companyId: string) => {
		REQUEST_FETCH_COMPANY_BY_ID(companyId)
			.then((res: AxiosResponse) => {
				const response = getBody(res);

				if (response?.success === true) {
					const { name, description, website, location, file } =
						response.data;

					setInput((prevInput) => ({
						...prevInput,
						name: name || "",
						description: description || "",
						website: website || "",
						location: location || "",
						file: file || null,
					}));

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
		if (!initialRender) {
			fetchCompanyById(id);
		} else {
			setInitialRender(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialRender]);

	return (
		<div>
			<NavBar />
			<div className="max-w-xl mx-auto my-10">
				<form onSubmit={submitHandler}>
					<div className="flex items-center gap-5 p-8">
						<Button
							onClick={() =>
								navigate(appendBaseURL("/admin/companies"))
							}
							variant="outline"
							className="flex items-center gap-2 text-gray-500 font-semibold"
						>
							<ArrowLeft />
							<span>Back</span>
						</Button>
						<h1 className="font-bold text-xl">Company Setup</h1>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<Label>Company Name</Label>
							<Input
								type="text"
								name="name"
								value={input?.name}
								onChange={changeEventHandler}
							/>
						</div>
						<div>
							<Label>Description</Label>
							<Input
								type="text"
								name="description"
								value={input?.description}
								onChange={changeEventHandler}
							/>
						</div>
						<div>
							<Label>Website</Label>
							<Input
								type="text"
								name="website"
								value={input?.website}
								onChange={changeEventHandler}
							/>
						</div>
						<div>
							<Label>Location</Label>
							<Input
								type="text"
								name="location"
								value={input?.location}
								onChange={changeEventHandler}
							/>
						</div>
						<div>
							<Label>Logo</Label>
							<Input
								type="file"
								name="file"
								accept="image/*"
								onChange={changeFileHandler}
								className="cursor-pointer"
							/>
						</div>
					</div>
					{loading ? (
						<Button className="w-full my-4">
							{" "}
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
							Please wait{" "}
						</Button>
					) : (
						<Button type="submit" className="w-full my-4">
							Update
						</Button>
					)}
				</form>
			</div>
		</div>
	);
};

export default CompanySetup;
