importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
	"https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
	apiKey: "AIzaSyBshpZ7i4AGd-VpVdFc3zkFjgrlZ0NQyro",
	authDomain: "job-portal-typescript.firebaseapp.com",
	projectId: "job-portal-typescript",
	storageBucket: "job-portal-typescript.firebasestorage.app",
	messagingSenderId: "887818898329",
	appId: "1:887818898329:web:ccf81a59800ba927732108",
	measurementId: "G-642TEKFBK2",
};
firebase?.initializeApp(firebaseConfig);

const isiOSSupported = () => {
	return (
		navigator?.userAgent?.indexOf("Safari") !== -1 ||
		navigator?.userAgent?.indexOf("Chrome") !== -1 ||
		navigator?.userAgent?.indexOf("Firefox") !== -1 ||
		(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream)
	);
};

if (isiOSSupported()) {
	if (firebase?.messaging?.isSupported()) {
		const messaging = firebase?.messaging();

		messaging?.onBackgroundMessage((payload) => {
			console.log(
				"[firebase-messaging-sw.js] Received background message ",
				payload
			);

			// Send the notification data to the main thread
			self?.clients
				?.matchAll({ type: "window", includeUncontrolled: true })
				.then((clients) => {
					clients.forEach((client) => {
						client.postMessage({
							type: "NEW_NOTIFICATION",
							payload: payload, // Send notification data
						});
					});
				});

			//? Uncomment only for testing firebase onBackground handler
			// const { notification, data, fcmOptions } = payload;

			// const notificationTitle = notification?.title;
			// const notificationOptions = {
			//   body: notification?.body,
			//   icon: data?.icon,
			//   badge: data?.badge,
			//   data: {
			//     url: fcmOptions?.link,
			//   },
			// };

			// self?.registration?.showNotification(notificationTitle, notificationOptions);
		});
	}
}
// console.log("isiOSSupported()-->", isiOSSupported());
// console.log("firebase?.messaging?.isSupported()-->", firebase?.messaging?.isSupported());
