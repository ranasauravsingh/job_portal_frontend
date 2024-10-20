export type CompanyPayload = {
	name: string;
	description: string;
	website: string;
	location: string;
	file: File | null;
};

export type CompanyType = {
	name: string;
	description: string;
	website: string;
	location: string;
	logo: string;
	createdAt: Date;
	_id: string;
};
