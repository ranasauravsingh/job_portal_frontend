export type FrontRoutes = {
	path: string;
	element: React.ReactElement;
};

export type ResponseData = {
	message: string;
	success: boolean;
	data?: Record<string, unknown>;
};

export type PrivateRouteProps = {
	children: React.ReactElement;
	accessibleRoles: string[];
};
