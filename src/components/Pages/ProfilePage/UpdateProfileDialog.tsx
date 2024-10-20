import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RootState } from "@/redux/store";
import { REQUEST_ROUTE_UPDATE_USER } from "@/_services/auth";
import { ResponseData } from "@/types/common.types";
import { getBody } from "@/_services/service";
import { handleError } from "@/_helpers/common_functions";
import { setUser } from "@/redux/authSlice";
import { UpdateProfileProps } from "@/types/profile.types";

const UpdateProfileDialog = (props: UpdateProfileProps) => {
	const dispatch: Dispatch = useDispatch();

	const { user } = useSelector((state: RootState) => state.auth);
	const [loading, setLoading] = useState(false);

	const { open, setOpen } = props;

	const [input, setInput] = useState({
		name: user?.fullName || "",
		email: user?.email || "",
		phoneNumber: user?.phoneNumber || "",
		bio: user?.profile?.bio || "",
		skills: user?.profile?.skills || "",
		file: user?.profile?.resume || "",
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
		setLoading(true);

		const updateUserPayload: FormData = new FormData();
		updateUserPayload?.append("fullName", input?.name);
		updateUserPayload?.append("email", input?.email);
		updateUserPayload?.append("phoneNumber", input?.phoneNumber);
		updateUserPayload?.append("bio", input?.bio);
		updateUserPayload?.append("skills", input?.skills);
		if (input?.file) {
			updateUserPayload?.append("file", input?.file);
		}

		const requestHeaders = {
			"Content-Type": "multipart/form-data",
		};

		REQUEST_ROUTE_UPDATE_USER(updateUserPayload, requestHeaders)
			.then((res: AxiosResponse) => {
				const response: ResponseData = getBody(res);

				if (response?.success === true) {
					dispatch(setUser(response?.data?.user));
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

		setOpen(false);
	};

	return (
		<div>
			<Dialog open={open}>
				<DialogContent
					className="sm:max-w-[425px]"
					onInteractOutside={() => setOpen(false)}
				>
					<DialogHeader>
						<DialogTitle>Update Profile</DialogTitle>
						<DialogDescription>
							Fill in the fields below to update your profile
							information.
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={submitHandler}>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="name" className="text-right">
									Name
								</Label>
								<Input
									id="name"
									name="name"
									type="text"
									value={input?.name}
									onChange={changeEventHandler}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="email" className="text-right">
									Email
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									value={input?.email}
									onChange={changeEventHandler}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="number" className="text-right">
									Number
								</Label>
								<Input
									id="number"
									name="number"
									value={input?.phoneNumber}
									onChange={changeEventHandler}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="bio" className="text-right">
									Bio
								</Label>
								<Input
									id="bio"
									name="bio"
									value={input?.bio}
									onChange={changeEventHandler}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="skills" className="text-right">
									Skills
								</Label>
								<Input
									id="skills"
									name="skills"
									value={input?.skills}
									onChange={changeEventHandler}
									className="col-span-3"
								/>
							</div>
							<div className="grid grid-cols-4 items-center gap-4">
								<Label htmlFor="file" className="text-right">
									Resume
								</Label>
								<Input
									id="file"
									name="file"
									type="file"
									accept="application/pdf"
									onChange={changeFileHandler}
									className="col-span-3"
								/>
							</div>
						</div>
						<DialogFooter>
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
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default UpdateProfileDialog;
