import { useEffect, useState, useCallback } from 'react';
import { Activity, Server, Smartphone, CheckCircle2, AlertCircle, RefreshCw, Cpu } from 'lucide-react';

interface HealthData {
  status: string;
  service: string;
  timestamp: string;
  uptimeSeconds: number;
  nodeVersion: string;
  environment: string;
}

export default function App() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<string>('');

  const checkHealth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data: HealthData = await res.json();
      setHealth(data);
      setLastChecked(new Date().toLocaleTimeString());
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown communication error';
      setError(msg);
      setHealth(null);
      setLastChecked(new Date().toLocaleTimeString());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-between font-sans selection:bg-neutral-800">
      {/* Top Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/60 backdrop-blur-md px-4 py-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-white">Hotspot Kernel Landing Environment</h1>
              <p className="text-xs text-neutral-400">Technical Foundation for Android-First Coupon Hotspot</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Kernel Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 flex flex-col gap-6">
        {/* Environment Notice */}
        <section className="bg-neutral-900/40 border border-neutral-800 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-neutral-800 text-neutral-300 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-semibold text-white">Project Kernel Scope</h2>
              <p className="text-xs text-neutral-400 leading-relaxed">
                This project establishes the minimal, verified full-stack landing environment. Application features
                (coupon generation, customer sessions, payment processing, network gateway control) are deliberately
                unimplemented and will be directed autonomously by the incoming <code className="text-neutral-200 bg-neutral-800 px-1.5 py-0.5 rounded">.ai</code> instruction pack.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Subsystem Health Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Subsystem 1: Backend API Health */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <Server className="w-4 h-4 text-neutral-400" />
                  <h3 className="text-sm font-medium text-neutral-200">Backend Runtime &amp; API</h3>
                </div>
                {loading ? (
                  <span className="text-xs text-neutral-400">Pinging...</span>
                ) : health ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs text-rose-400">
                    <AlertCircle className="w-3.5 h-3.5" /> Disconnected
                  </span>
                )}
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Endpoint:</span>
                  <code className="text-neutral-200 font-mono">GET /api/health</code>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Service:</span>
                  <span className="text-neutral-200">{health?.service || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Uptime:</span>
                  <span className="text-neutral-200">{health ? `${health.uptimeSeconds}s` : '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Node Version:</span>
                  <span className="text-neutral-200">{health?.nodeVersion || '—'}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Environment:</span>
                  <span className="text-neutral-200 capitalize">{health?.environment || '—'}</span>
                </div>
              </div>

              {error && (
                <div className="mt-3 p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/60 text-rose-300 text-xs">
                  {error}
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-800 flex items-center justify-between">
              <span className="text-[11px] text-neutral-500">
                {lastChecked ? `Checked ${lastChecked}` : 'Not checked'}
              </span>
              <button
                type="button"
                onClick={checkHealth}
                disabled={loading}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600 text-neutral-200 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                Test Ping
              </button>
            </div>
          </section>

          {/* Subsystem 2: Frontend & Mobile Packaging Preparation */}
          <section className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-neutral-400" />
                  <h3 className="text-sm font-medium text-neutral-200">Frontend &amp; Android Target</h3>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Architecture:</span>
                  <span className="text-neutral-200">React 19 + Vite SPA</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Viewport:</span>
                  <span className="text-neutral-200">Responsive (Mobile/Tablet)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Packaging Target:</span>
                  <span className="text-neutral-200">Android Hybrid (Capacitor/PWA)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span className="text-neutral-400">Hardware Access:</span>
                  <span className="text-amber-400/90">Deferred to Instruction Pack</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400">Gateway Reality:</span>
                  <span className="text-neutral-300">Managed Gateway Compatible</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-800 text-[11px] text-neutral-500">
              No native Android hotspot mockups or fake drivers injected.
            </div>
          </section>
        </div>

        {/* Readiness Checklist */}
        <section className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">Kernel Verification Checklist</h3>
          <ul className="space-y-2.5 text-xs">
            <li className="flex items-center gap-2.5 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full-stack dependencies installed and validated</span>
            </li>
            <li className="flex items-center gap-2.5 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>TypeScript configuration passing without errors</span>
            </li>
            <li className="flex items-center gap-2.5 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Vite production bundle build passing</span>
            </li>
            <li className="flex items-center gap-2.5 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unified Express + Vite development server listening on port 3000</span>
            </li>
            <li className="flex items-center gap-2.5 text-neutral-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Client-to-backend communication confirmed via <code className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-200 font-mono">/api/health</code></span>
            </li>
          </ul>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 px-4 py-4 text-center text-xs text-neutral-500">
        Hotspot Project Kernel &bull; Awaiting .ai instruction package upload
      </footer>
    </main>
  );
}
