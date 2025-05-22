import { AxiosError } from "axios";
import { toast } from "sonner";
import { getToken } from "firebase/messaging";

import { ResponseData } from "@/types/common.types";
import { messaging } from "@/firebase/firebase";
import { REQUEST_UPDATE_USER_FCM_TOKEN } from "@/_services/auth";

export const handleError = (error: AxiosError) => {
	const errorResponse = error?.response?.data as ResponseData;

	if (errorResponse?.message) {
		toast.error(errorResponse?.message);
		if(errorResponse?.message === "User not authenticated.") {
			localStorage.clear();
			window.location.href = "/login";
		}
		return;
	} else {
		return console.log(`Something went wrong: ${error}`);
	}
};

export const appendBaseURL = (url: string) => {
	const REACT_BASE_URL = "";

	return `${REACT_BASE_URL}${url}`;
};

export const isNotifySupported = (): boolean => {
	return (
		typeof window !== "undefined" &&
		"serviceWorker" in navigator &&
		"Notification" in window &&
		"PushManager" in window
	);
};

export const isiOSSupported = (): boolean => {
	return (
		navigator?.userAgent?.indexOf("Safari") !== -1 ||
		navigator?.userAgent?.indexOf("Chrome") !== -1 ||
		navigator?.userAgent?.indexOf("Firefox") !== -1 ||
		(/iPad|iPhone|iPod/.test(navigator.userAgent) &&
			!(window as { MSStream?: unknown }).MSStream)
	);
};

export const detectDeviceType = () => {
	const userAgent =
		navigator.userAgent ||
		navigator.vendor ||
		((window as { opera?: unknown }).opera as string | undefined);

	if (typeof userAgent === "string") {
		// Check for iOS devices
		if (
			/iPad|iPhone|iPod/.test(userAgent) &&
			!(window as { MSStream?: unknown }).MSStream
		) {
			return "Ios";
		}

		// Check for Android devices
		if (/android/i.test(userAgent)) {
			return "Android";
		}
	}

	// Otherwise, assume it's a web browser
	return "Web";
};

export const getBrowserName = async (): Promise<string> => {
	let browserName = "";
	const userAgent = navigator.userAgent;

	if (userAgent.indexOf("Firefox") > -1) {
		browserName = "MozillaFirefox";
		// return "MozillaFirefox";
	} else if (userAgent.indexOf("SamsungBrowser") > -1) {
		browserName = "SamsungInternet";
		// return "SamsungInternet";
	} else if (
		userAgent.indexOf("Opera") > -1 ||
		userAgent.indexOf("OPR") > -1
	) {
		browserName = "Opera";
		// return "Opera";
	} else if (
		userAgent.indexOf("Trident") > -1 ||
		userAgent.indexOf("MSIE") > -1
	) {
		browserName = "MicrosoftInternetExplorer";
		// return "MicrosoftInternetExplorer";
	} else if (userAgent.indexOf("Edg") > -1) {
		browserName = "MicrosoftEdge";
		// return "MicrosoftEdge";
	} else if (
		(
			navigator as Navigator & {
				brave?: { isBrave: () => Promise<boolean> };
			}
		).brave &&
		(await (
			navigator as Navigator & {
				brave?: { isBrave: () => Promise<boolean> };
			}
		).brave!.isBrave())
	) {
		browserName = "Brave";
		// return "Brave";
	} else if (userAgent.indexOf("Chrome") > -1) {
		if (userAgent.indexOf("Vivaldi") > -1) {
			browserName = "Vivaldi";
			// return "Vivaldi";
		} else if (userAgent.indexOf("Chromium") > -1) {
			browserName = "Chromium";
			// return "Chromium";
		}
		browserName = "GoogleChrome";
		// return "GoogleChrome";
	} else if (
		userAgent.indexOf("Safari") > -1 &&
		userAgent.indexOf("Chrome") === -1
	) {
		browserName = "AppleSafari";
		// return "AppleSafari";
	} else if (userAgent.indexOf("DuckDuckGo") > -1) {
		browserName = "DuckDuckGo";
		// return "DuckDuckGo";
	} else if (userAgent.indexOf("Silk") > -1) {
		browserName = "AmazonSilk";
		// return "AmazonSilk";
	} else if (userAgent.indexOf("UCBrowser") > -1) {
		browserName = "UCBrowser";
		// return "UCBrowser";
	} else if (userAgent.indexOf("Puffin") > -1) {
		browserName = "Puffin";
		// return "Puffin";
	} else if (userAgent.indexOf("Maxthon") > -1) {
		browserName = "Maxthon";
		// return "Maxthon";
	} else if (userAgent.indexOf("Yandex") > -1) {
		browserName = "Yandex";
		// return "Yandex";
	} else if (userAgent.indexOf("Epiphany") > -1) {
		browserName = "GNOMEWebEpiphany";
		// return "GNOMEWebEpiphany";
	} else {
		browserName = "Unknown";
		// return "Unknown";
	}
	localStorage.setItem("deviceBrowser", browserName);
	return browserName;
};

export const storeUserFCMToken = (fcmToken: string) => {
	const userFCMPayload = new FormData();

	userFCMPayload.append("userFcmToken", fcmToken);
	userFCMPayload.append(
		"platform",
		`${localStorage?.getItem("deviceType")}${localStorage?.getItem(
			"deviceBrowser"
		)}`
	);

	REQUEST_UPDATE_USER_FCM_TOKEN(userFCMPayload)
		.then(() => {
			// const response = getBody(res);
			// console.log("response--->", response);
		})
		.catch((error) => {
			handleError(error);
		});
};

export const storeFirebaseToken = async () => {
	try {
		const serviceWorkerRegistration =
			await navigator.serviceWorker.register(
				`${import.meta.env.BASE_URL}firebase-messaging-sw.js`
			);

		const firebaseDeviceToken = await getToken(messaging, {
			vapidKey: import.meta.env.VITE_REACT_APP_FIREBASE_VAPID_KEY,
			serviceWorkerRegistration,
		});
		if (firebaseDeviceToken) {
			console.log("Token--->", firebaseDeviceToken);
			localStorage.setItem("firebaseToken", firebaseDeviceToken);
			localStorage.setItem("deviceType", detectDeviceType());
			await getBrowserName();

			storeUserFCMToken(firebaseDeviceToken);
		}
	} catch (error) {
		console.log("Error Occurred while fetching token from Firebase", error);
		setTimeout(async () => {
			const serviceWorkerRegistration =
				await navigator.serviceWorker.register(
					`${import.meta.env.BASE_URL}firebase-messaging-sw.js`
				);

			const fcmDeviceToken = await getToken(messaging, {
				vapidKey: import.meta.env.VITE_REACT_APP_FIREBASE_VAPID_KEY,
				serviceWorkerRegistration,
			});

			if (fcmDeviceToken) {
				console.log("Token--->", fcmDeviceToken);

				localStorage.setItem("firebaseToken", fcmDeviceToken);
				localStorage.setItem("deviceType", detectDeviceType());
				await getBrowserName();

				storeUserFCMToken(fcmDeviceToken);
			}
		}, 1000);
	}
};

export const handleRequestPermission = async () => {
	// Push Notifications

	if (isNotifySupported() && Notification) {
		const browserPermission = await Notification?.requestPermission();
		console.log("Notification Permission-->", browserPermission);
		if (browserPermission === "granted" && isiOSSupported()) {
			// if (browserPermission === 'granted') {
			await storeFirebaseToken();
		}
	} else {
		alert(
			"Your browser does not support notifications or service workers."
		);
	}
};

export const checkNotificationPermission = async () => {
	if (isNotifySupported() && Notification) {

		if (Notification?.permission === "granted" && isiOSSupported()) {
			await storeFirebaseToken();
		} else if (Notification?.permission === "default" && isiOSSupported()) {
			await handleRequestPermission();
		}
	}
};
