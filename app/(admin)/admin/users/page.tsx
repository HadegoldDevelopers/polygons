import UsersPage from "./UsersPage";

export const metadata = {
  title: "Admin - User Management",
  description: "View and manage all users registered on the platform.",
};
export default function AdminUsers() {
  return <UsersPage />;
}