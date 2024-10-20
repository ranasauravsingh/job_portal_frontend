import { useDispatch, useSelector } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { LogOut, User2 } from "lucide-react";
import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RootState } from "@/redux/store";
import { REQUEST_ROUTE_LOGOUT } from "@/_services/auth";
import { getBody } from "@/_services/service";
import { ResponseData } from "@/types/common.types";
import { setUser } from "@/redux/authSlice";
import { handleError } from "@/_helpers/common_functions";

const NavBar = () => {
	const navigate: NavigateFunction = useNavigate();
	const dispatch: Dispatch = useDispatch();
	const { user } = useSelector((store: RootState) => store?.auth);

	const logoutHandler = async () => {
		REQUEST_ROUTE_LOGOUT()
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {
					dispatch(setUser(null));
					navigate("/");

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
		<div className="bg-white">
			<div className="flex items-center justify-between mx-auto max-w-7xl h-16">
				<div>
					<h1 className="text-2xl font-bold">
						Job<span className="text-[#F83002]">Portal</span>
					</h1>
				</div>
				<div className="flex items-center gap-12">
					<ul className="flex font-medium items-center gap-5">
						{user && user?.role === "recruiter" ? (
							<>
								<li>
									<Link to="/admin/companies">Companies</Link>
								</li>
								<li>
									<Link to="/admin/jobs">Jobs</Link>
								</li>
							</>
						) : (
							<>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/jobs">Jobs</Link>
								</li>
								<li>
									<Link to="/browse">Browse</Link>
								</li>
							</>
						)}
					</ul>

					{!user ? (
						<div className="flex items-center gap-2">
							<Link to="/login">
								<Button variant={"outline"}>Login</Button>
							</Link>
							<Link to="/register">
								<Button className="bg-[#6A38C2] hover:bg-[#5b30a6] text-[#ffffff]">
									SignUp
								</Button>
							</Link>
						</div>
					) : (
						<Popover>
							<PopoverTrigger asChild>
								<Avatar className="cursor-pointer">
									<AvatarImage
										src={
											user?.profile?.profilePhoto ||
											`https://github.com/shadcn.png`
										}
										alt="profile_photo"
									/>
								</Avatar>
							</PopoverTrigger>
							<PopoverContent className="w-80">
								<div className="">
									<div className="flex gap-4 items-center">
										<Avatar className="cursor-pointer">
											<AvatarImage
												src={
													user?.profile
														?.profilePhoto ||
													`https://github.com/shadcn.png`
												}
												alt="profile_photo"
											/>
										</Avatar>
										<div>
											<h4 className="font-medium">
												{user?.fullName}
											</h4>
											<p className="text-sm text-muted-foreground">
												{user?.profile?.bio}
											</p>
										</div>
									</div>
									<div className="flex flex-col my-2 text-gray-600">
										{user && user.role === "student" && (
											<div className="flex w-fit items-center gap-2 cursor-pointer">
												<User2 />
												<Button
													variant="link"
													onClick={() => {
														navigate("/profile");
													}}
												>
													{" "}
													View Profile
												</Button>
											</div>
										)}

										<div className="flex w-fit items-center gap-2 cursor-pointer">
											<LogOut />
											<Button
												onClick={logoutHandler}
												variant="link"
											>
												Logout
											</Button>
										</div>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
