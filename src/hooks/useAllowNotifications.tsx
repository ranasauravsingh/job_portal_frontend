import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { checkNotificationPermission } from "@/_helpers/common_functions";
import { RootState } from "@/redux/store";

const useAllowNotifications = () => {

	const { user } = useSelector((store: RootState) => store?.auth);

	const [initialRender, setInitialRender] = useState(true);

	useEffect(() => {
		if (!initialRender) {
			if(user) {
				checkNotificationPermission();
			}
		} else {
			setInitialRender(false);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialRender]);
};

export default useAllowNotifications;
