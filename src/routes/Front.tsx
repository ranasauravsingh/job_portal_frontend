import React from "react";
import {
	createBrowserRouter,
	RouterProvider,
	RouterProviderProps,
} from "react-router-dom";

import { FrontRoutes } from "@/types/common.types";
import PrivateRoute from "./PrivateRoute";
import Login from "@/components/Pages/AuthPage/Login";
import Register from "@/components/Pages/AuthPage/Register";
import Home from "@/components/Pages/HomePage/Home";
import Jobs from "@/components/Pages/JobPage/Jobs";
import Browse from "@/components/Pages/BrowsePage/Browse";
import Profile from "@/components/Pages/ProfilePage/Profile";
import JobDescription from "@/components/Pages/JobPage/JobDescription";
import Companies from "@/components/Pages/AdminPage/CompanyPage/Companies";
import CompanyCreate from "@/components/Pages/AdminPage/CompanyPage/CompanyCreate";
import CompanySetup from "@/components/Pages/AdminPage/CompanyPage/CompanySetup";
import AdminJob from "@/components/Pages/AdminPage/JobPage/AdminJob";
import JobCreate from "@/components/Pages/AdminPage/JobPage/JobCreate";
import Applicants from "@/components/Pages/AdminPage/JobPage/Applicants";
import { appendBaseURL } from "@/_helpers/common_functions";

const Front: React.FunctionComponent = () => {
	const publicRoutes: FrontRoutes[] = [
		{
			path: appendBaseURL("/"),
			element: <Home />,
		},
		{
			path: appendBaseURL("/home"),
			element: <Home />,
		},
		{
			path: appendBaseURL("/login"),
			element: <Login />,
		},
		{
			path: appendBaseURL("/register"),
			element: <Register />,
		},
	];

	const privateRoutes: FrontRoutes[] = [
		{
			path: appendBaseURL("/jobs"),
			element: <Jobs />,
		},
		{
			path: appendBaseURL("/description/:id"),
			element: (
				<PrivateRoute accessibleRoles={["student"]}>
					<JobDescription />
				</PrivateRoute>
			),
		},
		{
			path: appendBaseURL("/browse"),
			element: (
				<PrivateRoute accessibleRoles={["student"]}>
					<Browse />
				</PrivateRoute>
			),
		},
		{
			path: appendBaseURL("/profile"),
			element: (
				<PrivateRoute accessibleRoles={["student"]}>
					<Profile />
				</PrivateRoute>
			),
		},
		// admin ke liye yha se start hoga
		{
			path: appendBaseURL("/admin/companies"),
			element: (
				<PrivateRoute accessibleRoles={["recruiter"]}>
					<Companies />
				</PrivateRoute>
			),
		},
		{
			path: appendBaseURL("/admin/companies/create"),
			element: (
				<PrivateRoute accessibleRoles={["recruiter"]}>
					<CompanyCreate />
				</PrivateRoute>
			),
		},
		{
			path: appendBaseURL("/admin/companies/:id"),
			element: (
				<PrivateRoute accessibleRoles={["recruiter"]}>
					<CompanySetup />
				</PrivateRoute>
			),
		},
		{
			path: appendBaseURL("/admin/jobs"),
			element: (
				<PrivateRoute accessibleRoles={["recruiter"]}>
					<AdminJob />
				</PrivateRoute>
			),
		},
		{
			path: appendBaseURL("/admin/jobs/create"),
			element: (
				<PrivateRoute accessibleRoles={["recruiter"]}>
					<JobCreate />
				</PrivateRoute>
			),
		},
		{
			path: appendBaseURL("/admin/jobs/applicants/:id"),
			element: (
				<PrivateRoute accessibleRoles={["recruiter"]}>
					<Applicants />
				</PrivateRoute>
			),
		},
	];

	const appRouter: RouterProviderProps["router"] = createBrowserRouter([
		...publicRoutes,
		...privateRoutes,
	]);

	return (
		<div>
			<RouterProvider router={appRouter} />
		</div>
	);
};

export default Front;
