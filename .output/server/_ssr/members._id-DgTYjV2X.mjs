import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-BmkySxaU.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useActiveTenant } from "./use-tenant-L5ZosG5R.mjs";
import { n as PageBody, r as PageHeader } from "./page-header-9A-c6Jmg.mjs";
import { i as formatDateTime, n as formatCurrency, r as formatDate } from "./utils-DMmnJHxL.mjs";
import { t as Button } from "./button-BTGd3p39.mjs";
import { t as Input } from "./input-C7-F0e9p.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { F as ArrowLeft, f as QrCode, p as Plus } from "../_libs/lucide-react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Label } from "./label-Cj5oJoSC.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as DialogTrigger, r as DialogFooter, t as Dialog } from "./dialog-1f98Mygr.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-C8RpZWXk.mjs";
import { t as Route } from "./members._id-DW9X0_be.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/members._id-DgTYjV2X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function MemberDetail() {
	const { id } = Route.useParams();
	const { active } = useActiveTenant();
	const tenantId = active?.tenant_id;
	const currency = active?.tenant.currency ?? "USD";
	const qc = useQueryClient();
	const qrRef = (0, import_react.useRef)(null);
	const { data: member } = useQuery({
		enabled: !!tenantId,
		queryKey: ["member", id],
		queryFn: async () => {
			const { data } = await supabase.from("members").select("*").eq("id", id).single();
			return data;
		}
	});
	const { data: memberships } = useQuery({
		queryKey: ["member-memberships", id],
		queryFn: async () => {
			const { data } = await supabase.from("member_memberships").select("*, membership_plans(name, duration_days)").eq("member_id", id).order("start_date", { ascending: false });
			return data ?? [];
		}
	});
	const { data: payments } = useQuery({
		queryKey: ["member-payments", id],
		queryFn: async () => {
			const { data } = await supabase.from("payments").select("*").eq("member_id", id).order("paid_at", { ascending: false }).limit(20);
			return data ?? [];
		}
	});
	const { data: attendance } = useQuery({
		queryKey: ["member-attendance", id],
		queryFn: async () => {
			const { data } = await supabase.from("attendance").select("*").eq("member_id", id).order("check_in", { ascending: false }).limit(20);
			return data ?? [];
		}
	});
	const { data: plans } = useQuery({
		enabled: !!tenantId,
		queryKey: ["mplans", tenantId],
		queryFn: async () => {
			const { data } = await supabase.from("membership_plans").select("*").eq("tenant_id", tenantId).eq("is_active", true);
			return data ?? [];
		}
	});
	const [assignOpen, setAssignOpen] = (0, import_react.useState)(false);
	const [planId, setPlanId] = (0, import_react.useState)("");
	const [startDate, setStartDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("cash");
	const assign = useMutation({
		mutationFn: async () => {
			const plan = plans?.find((p) => p.id === planId);
			if (!plan || !tenantId || !member) throw new Error("Missing data");
			const end = new Date(startDate);
			end.setDate(end.getDate() + plan.duration_days);
			const { data: mm, error } = await supabase.from("member_memberships").insert({
				tenant_id: tenantId,
				member_id: id,
				plan_id: planId,
				start_date: startDate,
				end_date: end.toISOString().slice(0, 10),
				price: plan.price,
				status: "active"
			}).select().single();
			if (error) throw error;
			const { data: pay, error: payErr } = await supabase.from("payments").insert({
				tenant_id: tenantId,
				member_id: id,
				membership_id: mm.id,
				amount: plan.price,
				method: paymentMethod,
				status: "paid"
			}).select().single();
			if (payErr) throw payErr;
			const num = "INV-" + Date.now().toString().slice(-8);
			const tax = Number(plan.price) * (Number(active?.tenant.tax_percent ?? 0) / 100);
			await supabase.from("invoices").insert({
				tenant_id: tenantId,
				member_id: id,
				payment_id: pay.id,
				number: num,
				subtotal: plan.price,
				tax,
				total: Number(plan.price) + tax
			});
			await supabase.from("members").update({ status: "active" }).eq("id", id);
		},
		onSuccess: () => {
			toast.success("Membership assigned");
			setAssignOpen(false);
			qc.invalidateQueries({ queryKey: ["member-memberships"] });
			qc.invalidateQueries({ queryKey: ["member-payments"] });
			qc.invalidateQueries({ queryKey: ["member"] });
		},
		onError: (e) => toast.error(e.message)
	});
	(0, import_react.useEffect)(() => {
		if (!member || !qrRef.current) return;
		const token = `${member.tenant_id}:${member.id}`;
		const url = `${window.location.origin}/c/${btoa(token)}`;
		import_lib.toCanvas(qrRef.current, url, {
			width: 220,
			margin: 1,
			color: {
				dark: "#ff5b1f",
				light: "#0b0b0f"
			}
		});
	}, [member]);
	if (!member) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBody, { children: "Loading…" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		title: member.full_name,
		description: `Code ${member.code} · ${member.status}`,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/members",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-2 h-4 w-4" }), " Back"]
			})
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PageBody, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg tracking-wide",
					children: "PROFILE"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Phone",
							v: member.phone
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Email",
							v: member.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Gender",
							v: member.gender
						}),
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "DOB",
							v: member.dob ? formatDate(member.dob) : null
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Joined",
							v: formatDate(member.joined_at)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Emergency",
							v: member.emergency_contact
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Address",
							v: member.address
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg tracking-wide",
						children: "MEMBERSHIPS"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
						open: assignOpen,
						onOpenChange: setAssignOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1 h-4 w-4" }), " Assign plan"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Assign membership" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Plan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: planId,
										onValueChange: setPlanId,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose plan" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (plans ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
											value: p.id,
											children: [
												p.name,
												" — ",
												formatCurrency(p.price, currency),
												" / ",
												p.duration_days,
												"d"
											]
										}, p.id)) })]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Start date" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: startDate,
										onChange: (e) => setStartDate(e.target.value)
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Payment method" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: paymentMethod,
										onValueChange: setPaymentMethod,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
											"cash",
											"upi",
											"credit_card",
											"debit_card",
											"bank_transfer",
											"other"
										].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: m,
											children: m.replace("_", " ")
										}, m)) })]
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => assign.mutate(),
								disabled: !planId || assign.isPending,
								children: "Assign + Collect"
							}) })
						] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: memberships && memberships.length > 0 ? memberships.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md border border-border p-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: m.membership_plans?.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-2 py-0.5 text-xs ${m.status === "active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`,
								children: m.status
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [
								formatDate(m.start_date),
								" → ",
								formatDate(m.end_date),
								" · ",
								formatCurrency(Number(m.price), currency)
							]
						})]
					}, m.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No memberships yet."
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg tracking-wide",
						children: "QR CODE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Scan at front desk to check in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid place-items-center rounded-md bg-background p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
							ref: qrRef,
							className: "rounded"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "mt-3 w-full",
						onClick: () => {
							const c = qrRef.current;
							if (!c) return;
							const a = document.createElement("a");
							a.href = c.toDataURL("image/png");
							a.download = `${member.code}-qr.png`;
							a.click();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "mr-2 h-4 w-4" }), " Download"]
					})
				]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-6 grid gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg tracking-wide",
				children: "PAYMENTS"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-3 w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-left text-xs uppercase text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2",
							children: "Date"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Amount" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Method" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [(payments ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: formatDate(p.paid_at)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: formatCurrency(Number(p.amount), currency) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "capitalize",
							children: p.method.replace("_", " ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: p.status })
					]
				}, p.id)), (!payments || payments.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 4,
					className: "py-4 text-center text-muted-foreground",
					children: "No payments yet"
				}) })] })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg tracking-wide",
				children: "ATTENDANCE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-3 w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-left text-xs uppercase text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2",
							children: "In"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Out" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Method" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [(attendance ?? []).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2",
							children: formatDateTime(a.check_in)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: a.check_out ? formatDateTime(a.check_out) : "—" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "uppercase text-xs",
							children: a.method
						})
					]
				}, a.id)), (!attendance || attendance.length === 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 3,
					className: "py-4 text-center text-muted-foreground",
					children: "No check-ins yet"
				}) })] })]
			})]
		})]
	})] })] });
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-right",
			children: v || "—"
		})]
	});
}
//#endregion
export { MemberDetail as component };
