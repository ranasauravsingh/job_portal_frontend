import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PrivateRouteProps } from "@/types/common.types";

const PrivateRoute = (props: PrivateRouteProps) => {
	const { children, accessibleRoles } = props;

	const { user } = useSelector((state: RootState) => state?.auth);

	const navigate = useNavigate();

	useEffect(() => {
		if (user === null || !accessibleRoles?.includes(user?.role)) {
			navigate("/");
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return children;
};

export default PrivateRoute;