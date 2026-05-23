import { useEffect, useState } from "react";
import { Shield, KeyRound, LogOut, Lock, TriangleAlert } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PromotionAdmin } from "@/features/promotions/PromotionAdmin";
import { WaitTimeAdmin } from "@/features/wait-times/WaitTimeAdmin";
import { StatusAdmin } from "@/features/status/StatusAdmin";

const PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE?.trim();
const SESSION_KEY = "spaCarWashAdminAuthed";

type Panel = "status" | "promotions" | "wait" | null;

export function Admin() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [activePanel, setActivePanel] = useState<Panel>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === "true") {
      setIsAuthed(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!PASSCODE) {
      setError("Admin passcode is not configured. Please set VITE_ADMIN_PASSCODE in your .env file.");
      return;
    }
    if (passcode.trim() === PASSCODE) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setIsAuthed(true);
      setPasscode("");
      setError("");
    } else {
      setError("Incorrect passcode. Please try again or contact management.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
    setActivePanel(null);
  };

  const renderLogin = () => (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="max-w-md w-full bg-slate-900 border border-blue-500/30 p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-yellow-400" />
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-400">Staff Access</p>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          </div>
        </div>
        <p className="text-blue-200 text-sm mb-6">
          Authorized employees only. Enter the passcode provided by management to update business status, wait times, or promotions.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm text-blue-100 mb-2" htmlFor="admin-passcode">
              <KeyRound className="w-4 h-4" />
              Admin Passcode
            </label>
            <input
              id="admin-passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-slate-800 border border-blue-500/30 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
              placeholder="Enter passcode"
              required
            />
          </div>
          {error && (
            <div className="flex items-start gap-2 text-red-300 text-sm">
              <TriangleAlert className="w-4 h-4 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          <Button type="submit" className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 text-black font-bold py-3">
            Unlock Admin Tools
          </Button>
        </form>
      </Card>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-blue-400">Spa Car Wash</p>
            <h1 className="text-4xl font-bold">Admin Control Room</h1>
            <p className="text-blue-200 text-sm mt-2">
              Update the live site messaging below. Changes save to this device until a shared backend is added.
            </p>
          </div>
          <Button variant="outline" className="border-red-400 text-red-200 hover:bg-red-500/10" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-xs uppercase text-blue-400">Business Status</p>
                <h2 className="text-xl font-semibold">Open / Closed</h2>
              </div>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Update open/closed state, reasons, and reopening times. Visible in the header banner.
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-500" onClick={() => setActivePanel("status")}>Manage Status</Button>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-xs uppercase text-blue-400">Promotions</p>
                <h2 className="text-xl font-semibold">Banners & Popups</h2>
              </div>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Control hero promos, floating CTAs, and pop-up offers. Content persists locally.
            </p>
            <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-400" onClick={() => setActivePanel("promotions")}>
              Manage Promotions
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-xs uppercase text-blue-400">Wait Times</p>
                <h2 className="text-xl font-semibold">Service Estimates</h2>
              </div>
            </div>
            <p className="text-blue-200 text-sm mb-4">
              Adjust estimates for express, deluxe, ultimate, and detailing services.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-500" onClick={() => setActivePanel("wait")}>
              Update Wait Times
            </Button>
          </Card>
        </div>
      </div>

      {activePanel === "status" && (
        <StatusAdmin onClose={() => setActivePanel(null)} onUpdate={() => {}} />
      )}
      {activePanel === "promotions" && (
        <PromotionAdmin onClose={() => setActivePanel(null)} />
      )}
      {activePanel === "wait" && (
        <WaitTimeAdmin onClose={() => setActivePanel(null)} />
      )}
    </div>
  );

  if (!isAuthed) {
    return renderLogin();
  }

  return renderDashboard();
}
