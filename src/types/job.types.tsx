export type JobType = {
	_id: string;
	title: string;
	description: string;
	requirements: string[];
	salary: number;
	experienceLevel: number;
	location: string;
	jobType: string;
	positions: number;
	company: {
		_id: string;
		location: string;
		name: string;
		logo: string;
	};
	applications: string[];
	createdAt: Date;
};

export type LatestJobCardProps = {
	job: JobType;
};

export type JobCardProps = {
	job: JobType;
};

export type JobRouteParams = {
	id?: string;
};

export type JobCreateProps = {
	isEdit?: boolean;
}

export type JobPayload = {
	title: string;
	description: string;
	requirements: string;
	salary: number;
	location: string;
	jobType: string;
	experience: number;
	positions: number;
	companyId: string;
};

export enum ApplicantStatus {
	Pending = "pending",
	Accepted = "accepted",
	Rejected = "rejected",
}

export enum AdminApplicantStatus {
	Accepted = "accepted",
	Rejected = "rejected",
}

export type ApplicantType = {
	applicant: string;
	job: string;
	status: ApplicantStatus;
	_id: string;
};

export type AdminApplicant = {
	fullName: string;
	email: string;
	phoneNumber: number;
	profile: {
		resume: string;
		resumeName: string;
	};
	createdAt: Date;
};

export type AdminApplicantType = {
	applicant: AdminApplicant;
	job: string;
	status: ApplicantStatus;
	_id: string;
};

export type AppliedJobType = {
	applicant: string;
	job: JobType;
	status: ApplicantStatus;
	createdAt: Date;
	_id: string;
};
