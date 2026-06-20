import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-BmkySxaU.js
function createSupabaseClient() {
	return createClient("https://zicxlfkzbhvtwrfwsbjf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppY3hsZmt6Ymh2dHdyZndzYmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5MDAxNDAsImV4cCI6MjA5NzQ3NjE0MH0.qaCyCcxXtONdkgzuHgi7Nq2GVqGggj2UHGG6P7lHwSg", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { supabase as t };
