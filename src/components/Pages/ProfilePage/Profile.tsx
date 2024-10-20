import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Contact, Mail, Pen } from "lucide-react";
import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NavBar from "@/components/Shared/NavBar";
import { RootState } from "@/redux/store";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { handleError } from "@/_helpers/common_functions";
import { ResponseData } from "@/types/common.types";
import { getBody } from "@/_services/service";
import { REQUEST_FETCH_APPLIED_JOBS } from "@/_services/applicant";
import { setAllAppliedJobs } from "@/redux/jobSlice";

const Profile = () => {
	const dispatch: Dispatch = useDispatch();

	const { user } = useSelector((state: RootState) => state?.auth);

	const [open, setOpen] = useState(false);
	const [initialRender, setInitialRender] = useState(true);

	const fetchAppliedJobs = () => {
		REQUEST_FETCH_APPLIED_JOBS()
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {
					dispatch(setAllAppliedJobs(response?.data));

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
			fetchAppliedJobs();
		} else {
			setInitialRender(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialRender]);

	return (
		<div>
			<NavBar />
			<div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
				<div className="flex justify-between">
					<div className="flex items-center gap-4">
						<Avatar className="h-24 w-24">
							<AvatarImage
								src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
								alt="profile"
							/>
						</Avatar>
						<div>
							<h1 className="font-medium text-xl">
								{user?.fullName}
							</h1>
							<p>{user?.profile?.bio}</p>
						</div>
					</div>
					<Button
						onClick={() => setOpen(true)}
						className="text-right"
						variant="outline"
					>
						<Pen />
					</Button>
				</div>
				<div className="my-5">
					<div className="flex items-center gap-3 my-2">
						<Mail />
						<span>{user?.email}</span>
					</div>
					<div className="flex items-center gap-3 my-2">
						<Contact />
						<span>{user?.phoneNumber}</span>
					</div>
				</div>
				<div className="my-5">
					<h1>Skills</h1>
					<div className="flex items-center gap-1">
						{user?.profile?.skills.length !== 0 ? (
							user?.profile?.skills?.map(
								(item: string, index: number) => (
									<Badge key={index + 1}>{item}</Badge>
								)
							)
						) : (
							<span>NA</span>
						)}
					</div>
				</div>
				<div className="grid w-full max-w-sm items-center gap-1.5">
					<Label className="text-md font-bold">Resume</Label>
					{/* {isResume ? ( */}
					{user?.profile?.resume ? (
						<a
							target="blank"
							href={user?.profile?.resume}
							className="text-blue-500 w-full hover:underline cursor-pointer"
						>
							{user?.profile?.resumeName}
						</a>
					) : (
						<span>NA</span>
					)}
				</div>
			</div>
			<div className="max-w-4xl mx-auto bg-white rounded-2xl">
				<h1 className="font-bold text-lg my-5">Applied Jobs</h1>
				{/* Applied Job Table   */}
				<AppliedJobTable />
			</div>
			<UpdateProfileDialog open={open} setOpen={setOpen} />
		</div>
	);
};

export default Profile;
