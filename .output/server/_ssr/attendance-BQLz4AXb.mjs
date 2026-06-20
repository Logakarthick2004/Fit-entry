import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BmkySxaU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useActiveTenant } from "./use-tenant-L5ZosG5R.mjs";
import { n as PageBody, r as PageHeader } from "./page-header-9A-c6Jmg.mjs";
import { i as formatDateTime } from "./utils-DMmnJHxL.mjs";
import { t as Button } from "./button-BTGd3p39.mjs";
import { t as Input } from "./input-C7-F0e9p.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DMbzW0DI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { h as LogIn, m as LogOut, u as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/attendance-BQLz4AXb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Attendance() {
	const { active } = useActiveTenant();
	const tenantId = active?.tenant_id;
	const qc = useQueryClient();
	const [q, setQ] = (0, import_react.useState)("");
	const { data: members } = useQuery({
		enabled: !!tenantId && q.length > 0,
		queryKey: [
			"members-search",
			tenantId,
			q
		],
		queryFn: async () => {
			const { data } = await supabase.from("members").select("id, code, full_name, phone").eq("tenant_id", tenantId).or(`full_name.ilike.%${q}%,code.ilike.%${q}%,phone.ilike.%${q}%`).limit(10);
			return data ?? [];
		}
	});
	const { data: todayAtt } = useQuery({
		enabled: !!tenantId,
		queryKey: ["today-att", tenantId],
		queryFn: async () => {
			const today = /* @__PURE__ */ new Date();
			today.setHours(0, 0, 0, 0);
			const { data } = await supabase.from("attendance").select("*, members(full_name, code)").eq("tenant_id", tenantId).gte("check_in", today.toISOString()).order("check_in", { ascending: false });
			return data ?? [];
		},
		refetchInterval: 1e4
	});
	const checkin = useMutation({
		mutationFn: async ({ memberId, method = "manual" }) => {
			if (!tenantId) throw new Error("No tenant");
			const today = /* @__PURE__ */ new Date();
			today.setHours(0, 0, 0, 0);
			const { data: open } = await supabase.from("attendance").select("*").eq("member_id", memberId).is("check_out", null).gte("check_in", today.toISOString()).limit(1).maybeSingle();
			if (open) {
				const now = /* @__PURE__ */ new Date();
				const dur = Math.round((now.getTime() - new Date(open.check_in).getTime()) / 6e4);
				const { error } = await supabase.from("attendance").update({
					check_out: now.toISOString(),
					duration_minutes: dur
				}).eq("id", open.id);
				if (error) throw error;
				return {
					action: "out",
					duration: dur
				};
			} else {
				const { error } = await supabase.from("attendance").insert({
					tenant_id: tenantId,
					member_id: memberId,
					method
				});
				if (error) throw error;
				return { action: "in" };
			}
		},
		onSuccess: (r) => {
			toast.success(r.action === "in" ? "Checked in" : `Checked out (${r.duration} min)`);
			qc.invalidateQueries({ queryKey: ["today-att"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: "Attendance",
		description: "Check members in and out"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
		defaultValue: "manual",
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: "manual",
				children: "Manual"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
				value: "qr",
				children: "QR Scanner"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "manual",
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "pl-9",
							placeholder: "Search by name, code, or phone…",
							value: q,
							onChange: (e) => setQ(e.target.value)
						})]
					}), members && members.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 divide-y divide-border rounded-md border border-border",
						children: members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => checkin.mutate({ memberId: m.id }),
							className: "flex w-full items-center justify-between px-3 py-2 text-left hover:bg-secondary/40",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-medium",
								children: m.full_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-muted-foreground",
								children: [
									m.code,
									" · ",
									m.phone ?? "no phone"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4 text-primary" })]
						}, m.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
				value: "qr",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrScanner, { onScan: (token) => {
					try {
						const [, memberId] = atob(token.split("/").pop() || token).split(":");
						if (memberId) checkin.mutate({
							memberId,
							method: "qr"
						});
					} catch {
						toast.error("Invalid QR");
					}
				} })
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 rounded-xl border border-border bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
			className: "font-display text-lg tracking-wide",
			children: [
				"TODAY'S CHECK-INS (",
				todayAtt?.length ?? 0,
				")"
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "mt-3 w-full text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "text-left text-xs uppercase text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-2",
						children: "Member"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "In" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Out" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Method" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [(todayAtt ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t border-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-2 font-medium",
						children: [
							a.members?.full_name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-xs text-muted-foreground",
								children: a.members?.code
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatDateTime(a.check_in) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.check_out ? formatDateTime(a.check_out) : "—" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "uppercase text-xs",
						children: a.method
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "text-right",
						children: !a.check_out && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => checkin.mutate({ memberId: a.member_id }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-1 h-3 w-3" }), " Out"]
						})
					})
				]
			}, a.id)), (!todayAtt || todayAtt.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				colSpan: 5,
				className: "py-6 text-center text-muted-foreground",
				children: "No check-ins yet today"
			}) })] })]
		})]
	})] })] });
}
function QrScanner({ onScan }) {
	const [active, setActive] = (0, import_react.useState)(false);
	const scannerRef = (0, import_react.useRef)(null);
	const elId = "qr-reader";
	(0, import_react.useEffect)(() => {
		if (!active) return;
		let mounted = true;
		(async () => {
			const { Html5Qrcode } = await import("../_libs/html5-qrcode.mjs").then((n) => n.t);
			if (!mounted) return;
			const inst = new Html5Qrcode(elId);
			scannerRef.current = inst;
			try {
				await inst.start({ facingMode: "environment" }, {
					fps: 10,
					qrbox: 240
				}, (text) => {
					onScan(text);
					inst.stop().catch(() => {});
					setActive(false);
				}, () => {});
			} catch (e) {
				toast.error("Camera error: " + e.message);
				setActive(false);
			}
		})();
		return () => {
			mounted = false;
			scannerRef.current?.stop().catch(() => {});
		};
	}, [active, onScan]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-xl border border-border bg-card p-5",
		children: !active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted-foreground",
				children: "Scan a member's QR code to check them in or out."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setActive(true),
				children: "Start camera"
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			id: elId,
			className: "mx-auto max-w-sm overflow-hidden rounded-md"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				onClick: () => {
					scannerRef.current?.stop().catch(() => {});
					setActive(false);
				},
				children: "Stop"
			})
		})] })
	});
}
//#endregion
export { Attendance as component };
