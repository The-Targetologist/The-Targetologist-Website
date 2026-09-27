// Kept out of lib/actions/submit-inquiry.ts ("use server") because Server
// Action files may only export async functions — exporting this array
// alongside the action broke at runtime (build error: "f.map is not a
// function", since the value doesn't survive the "use server" module
// boundary the way a plain export would).
export const CHALLENGE_OPTIONS = [
  "Not Enough Quality Leads",
  "Leads Aren't Followed Up Consistently",
  "Ad Spend Isn't Producing Booked Calls",
  "Our Tools and CRM Aren't Connected",
  "Something Else",
] as const;
