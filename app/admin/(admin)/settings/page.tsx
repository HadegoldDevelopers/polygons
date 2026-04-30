import SettingsClient from "./SettingsClient";

export const metadata = {
  title: "Admin Settings",
  description: "Configure payment provider keys and global settings.",
};

export default function Page() {
  return <SettingsClient />;
}
