/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST?.filter((_) => false));
// precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("install", (event) => {
	// Activate immediately upon installation
	self.skipWaiting();
});

// self.addEventListener("controlling", () => {
// 	window.location.reload();
// });

self.addEventListener("activate", (event) => {
	event.waitUntil(
		(async () => {
			// Optionally, clear out all caches to ensure no old caches remain
			const cacheNames = await caches.keys();
			await Promise.all(cacheNames.map((cache) => caches.delete(cache)));
		})()
	);
	self.clients.claim();
});

clientsClaim();

// All Message Event Handlers
self.addEventListener("message", (event) => {
	console.log("Message received--->", event?.data);
	switch (event.data?.type) {
		case "SKIP_WAITING":
			self.skipWaiting();
			break;
		case "PUSH_NOTIFICATION":
			const { notificationTitle, notificationOptions } = event.data;
			self.registration.showNotification(
				notificationTitle,
				notificationOptions
			);
			break;
		case "RELOAD_ON_FOCUS":
			self.clients.matchAll({ type: "window" }).then((clients) => {
				clients.forEach((client) => client.postMessage("RELOAD"));
			});
			break;
		default:
			console.warn("Unknown message type:", event.data?.type);
	}
});

self.addEventListener("notificationclick", (event) => {
	const url = event.notification?.data?.url || "/";

	event.notification.close();

	event.waitUntil(
		(async () => {
			try {
				const clientList = await self.clients.matchAll({
					type: "window",
					includeUncontrolled: true,
				});

				for (const client of clientList) {
					if (client?.url === url && "focus" in client) {
						return client.focus();
					}
				}
				if (self?.clients?.openWindow) {
					return self?.clients?.openWindow(url);
				} else {
					console.error("clients.openWindow is not available.");
				}
			} catch (error) {
				console.error("Error handling notification click:", error);
			}
		})()
	);
});
