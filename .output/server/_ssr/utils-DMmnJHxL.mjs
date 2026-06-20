import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-DMmnJHxL.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatCurrency(amount, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		maximumFractionDigits: 2
	}).format(amount);
}
function formatDate(d) {
	if (!d) return "—";
	return (typeof d === "string" ? new Date(d) : d).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric"
	});
}
function formatDateTime(d) {
	if (!d) return "—";
	return (typeof d === "string" ? new Date(d) : d).toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function initials(name) {
	if (!name) return "?";
	return name.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join("");
}
//#endregion
export { initials as a, formatDateTime as i, formatCurrency as n, formatDate as r, cn as t };
