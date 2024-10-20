import { useEffect, useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";

import NavBar from "@/components/Shared/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";

import { RegisterPayload, UserRoles } from "@/types/auth.types";
import { REQUEST_ROUTE_REGISTER } from "@/_services/auth";
import { handleError } from "@/_helpers/common_functions";
import { ResponseData } from "@/types/common.types";
import { getBody } from "@/_services/service";
import { setLoading } from "@/redux/authSlice";
import { RootState } from "@/redux/store";

const Register: React.FunctionComponent = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch: Dispatch = useDispatch();
	const { loading, user } = useSelector((state: RootState) => state?.auth);

	const [input, setInput] = useState<RegisterPayload>({
		fullName: "",
		email: "",
		phoneNumber: "",
		password: "",
		role: UserRoles?.Student,
		file: null,
	});

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
		dispatch(setLoading(true));

		const registerPayload: FormData = new FormData();
		const { fullName, email, password, phoneNumber, role, file } = input;

		registerPayload?.append("fullName", fullName);
		registerPayload?.append("email", email);
		registerPayload?.append("password", password);
		registerPayload?.append("phoneNumber", phoneNumber);
		registerPayload?.append("role", role);

		if (file) {
			registerPayload?.append("file", file);
		}

		const requestHeaders = {
			"Content-Type": "multipart/form-data",
		};

		REQUEST_ROUTE_REGISTER(registerPayload, requestHeaders)
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {
					navigate("/login");
					if (response?.message) {
						toast?.success(response?.message);
					}
				}
			})
			.catch((error: AxiosError) => {
				handleError(error);
			})
			.finally(() => {
				dispatch(setLoading(false));
			});
	};

	useEffect(() => {
		if (user) {
			navigate("/");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<NavBar />
			<div className="flex items-center justify-center max-w-7xl mx-auto">
				<form
					onSubmit={submitHandler}
					className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
				>
					<h1 className="font-bold text-xl mb-5">Sign Up</h1>
					<div className="my-2">
						<Label>Full Name</Label>
						<Input
							type="text"
							value={input?.fullName}
							name="fullName"
							onChange={changeEventHandler}
							placeholder="john doe"
						/>
					</div>
					<div className="my-2">
						<Label>Email</Label>
						<Input
							type="email"
							value={input?.email}
							name="email"
							onChange={changeEventHandler}
							placeholder="johnDoe@mailinator.com"
						/>
					</div>
					<div className="my-2">
						<Label>Phone Number</Label>
						<Input
							type="number"
							value={input?.phoneNumber}
							name="phoneNumber"
							onChange={changeEventHandler}
							placeholder="9898989898"
						/>
					</div>
					<div className="my-2">
						<Label>Password</Label>
						<Input
							type="password"
							value={input?.password}
							name="password"
							onChange={changeEventHandler}
							placeholder="johnDoe12345"
						/>
					</div>
					<div className="flex items-center justify-between">
						<RadioGroup className="flex items-center gap-4 my-5">
							<div className="flex items-center space-x-2">
								<Input
									type="radio"
									name="role"
									value={UserRoles?.Student}
									checked={input?.role === UserRoles?.Student}
									onChange={changeEventHandler}
									className="cursor-pointer"
								/>
								<Label htmlFor="student">Student</Label>
							</div>
							<div className="flex items-center space-x-2">
								<Input
									type="radio"
									name="role"
									value={UserRoles?.Recruiter}
									checked={
										input?.role === UserRoles?.Recruiter
									}
									onChange={changeEventHandler}
									className="cursor-pointer"
								/>
								<Label htmlFor="recruiter">Recruiter</Label>
							</div>
						</RadioGroup>
						<div className="flex items-center gap-2">
							<Label>Profile</Label>
							<Input
								accept="image/*"
								type="file"
								name="file"
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
							Sign Up
						</Button>
					)}
					<span className="text-sm">
						Already have an account?{" "}
						<Link
							to="/login"
							className="text-blue-600 hover:underline"
						>
							Login
						</Link>
					</span>
				</form>
			</div>
		</div>
	);
};

export default Register;
