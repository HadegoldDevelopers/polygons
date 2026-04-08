"use client";

import { useEffect, useState } from "react";
import { Toggle } from "@/components/ui";
import { useToast } from "@/context/ToastContext";

export default function NotificationSettings() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);

  const [notif, setNotif] = useState({
    deposits: true,
    withdrawals: true,
    staking_rewards: true,
    price_alerts: false,
    security_alerts: true,
    newsletter: false,
  });

  const toggle = (key: string) => (val: boolean) =>
    setNotif((n) => ({ ...n, [key]: val }));

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/settings/notifications");
      const data = await res.json();
      setNotif(data);
      setLoading(false);
    };
    load();
  }, []);

  const save = async () => {
    const res = await fetch("/api/settings/notifications", {
      method: "POST",
      body: JSON.stringify(notif),
    });

    const data = await res.json();
    if (!res.ok) return showToast(data.error, "error");

    showToast("Notification settings saved!", "success");
  };

  if (loading) return <p className="text-white/40">Loading…</p>;

  return (
    <div>
      <h3 className="text-lg font-black mb-1">Notifications</h3>
      <p className="text-sm text-white/40 mb-6">Choose what you're notified about</p>

      <div className="divide-y divide-white/8">
        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold">Deposits</p>
            <p className="text-xs text-white/40">When funds arrive in your wallet</p>
          </div>
          <Toggle defaultOn={notif.deposits} onChange={toggle("deposits")} />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold">Withdrawals</p>
            <p className="text-xs text-white/40">Confirmation of outgoing transfers</p>
          </div>
          <Toggle defaultOn={notif.withdrawals} onChange={toggle("withdrawals")} />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold">Staking Rewards</p>
            <p className="text-xs text-white/40">Daily reward notifications</p>
          </div>
          <Toggle defaultOn={notif.staking_rewards} onChange={toggle("staking_rewards")} />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold">Price Alerts</p>
            <p className="text-xs text-white/40">POLYC price movement alerts</p>
          </div>
          <Toggle defaultOn={notif.price_alerts} onChange={toggle("price_alerts")} />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold">Security Alerts</p>
            <p className="text-xs text-white/40">New device logins, suspicious activity</p>
          </div>
          <Toggle defaultOn={notif.security_alerts} onChange={toggle("security_alerts")} />
        </div>

        <div className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-bold">Newsletter</p>
            <p className="text-xs text-white/40">PlutoChain updates and news</p>
          </div>
          <Toggle defaultOn={notif.newsletter} onChange={toggle("newsletter")} />
        </div>
      </div>

      <button className="btn-primary max-w-[140px] mt-5" onClick={save}>
        Save
      </button>
    </div>
  );
}
