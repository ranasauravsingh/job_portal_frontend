export enum UserRoles {
	Student = "student",
	Recruiter = "recruiter",
}

export type LoginPayload = {
	email: string;
	password: string;
	role: UserRoles;
};

export type RegisterPayload = {
	fullName: string;
	email: string;
	phoneNumber: string;
	password: string;
	role: UserRoles;
	file: File | null;
};
