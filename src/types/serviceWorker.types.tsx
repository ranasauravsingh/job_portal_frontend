export type ConfigProps = {
	onUpdate?: (registration: ServiceWorkerRegistration) => void;
	onSuccess?: (registration: ServiceWorkerRegistration) => void;
};
