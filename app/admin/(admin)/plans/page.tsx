import AdminPlansClient from "./AdminPlansClient";

export const metadata = {
  title: "All User Plans",
  description: "View and manage all staking plan positions.",
};

export default function Page() {
  return <AdminPlansClient />;
}
