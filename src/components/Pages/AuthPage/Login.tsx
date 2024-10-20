import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";

import NavBar from "@/components/Shared/NavBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";

import { getBody } from "@/_services/service";
import { REQUEST_ROUTE_LOGIN } from "@/_services/auth";
import { appendBaseURL, handleError } from "@/_helpers/common_functions";
// import { ResponseData } from "@/types/common.types";
import { LoginPayload, UserRoles } from "@/types/auth.types";
import { setLoading, setUser } from "@/redux/authSlice";
import { RootState } from "@/redux/store";

const Login: React.FunctionComponent = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch: Dispatch = useDispatch();
	const { loading, user } = useSelector((state: RootState) => state?.auth);

	const [input, setInput] = useState<LoginPayload>({
		email: "",
		password: "",
		role: UserRoles?.Student,
	});

	const changeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setInput((prevInput) => ({
			...prevInput,
			[name]: value,
		}));
	};

	const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();

		const loginPayload: LoginPayload = { ...input };

		dispatch(setLoading(true));

		REQUEST_ROUTE_LOGIN(loginPayload)
			.then((res: AxiosResponse) => {
				const response = getBody(res);

				if (response?.success === true) {
					dispatch(setUser(response?.data?.user));

					const { user } = response.data;
					if (user?.role === "recruiter") {
						navigate(appendBaseURL("/admin/companies"));
					} else {
						navigate(appendBaseURL("/home"));
					}

					if (response?.message) {
						toast.success(response?.message);
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
			navigate(appendBaseURL("/"));
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
					<h1 className="font-bold text-xl mb-5">Login</h1>
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
									checked={input.role === UserRoles?.Student}
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
										input.role === UserRoles?.Recruiter
									}
									onChange={changeEventHandler}
									className="cursor-pointer"
								/>
								<Label htmlFor="recruiter">Recruiter</Label>
							</div>
						</RadioGroup>
					</div>
					{loading ? (
						<Button className="w-full my-4">
							{" "}
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
							Please wait{" "}
						</Button>
					) : (
						<Button type="submit" className="w-full my-4">
							Login
						</Button>
					)}
					<span className="text-sm">
						Don't have an account?{" "}
						<Link
							to={appendBaseURL("/register")}
							className="text-blue-600 hover:underline"
						>
							Sign Up
						</Link>
					</span>
				</form>
			</div>
		</div>
	);
};

export default Login;
