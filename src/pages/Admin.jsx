import { useState, useEffect } from 'react';
import { PageMeta } from '../hooks/usePageMeta';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('admin_token', token);
      fetchStats();
      const int = setInterval(fetchStats, 8000);
      return () => clearInterval(int);
    } else {
      localStorage.removeItem('admin_token');
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      setToken(data.token);
    } catch (err) {
      setLoginError(err.message);
    }
  };

  const fetchStats = async () => {
    try {
      setLoadingStats(true);
      const res = await fetch('/api/admin', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.status === 401) {
        setToken(null);
        return;
      }
      const data = await res.json();
      if (res.ok) setStats(data);
    } catch (e) {
      // ignore
    } finally {
      setLoadingStats(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin', { method: 'DELETE' });
    } catch (e) {}
    setToken(null);
    setStats(null);
  };

  const formatDate = (ts) => {
    if (!ts) return 'N/A';
    return new Date(ts).toLocaleTimeString();
  };

  const ToolCard = ({ name, data }) => {
    if (!data) return null;
    const total = data.total || 0;
    const success = data.success || 0;
    const fail = data.fail || 0;
    const pct = total > 0 ? Math.round((success / total) * 100) : 0;
    
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-['Fraunces'] text-2xl text-[rgba(255,220,180,0.85)] mb-4 capitalize">{name.replace('-', ' ')}</h3>
        <div className="grid grid-cols-2 gap-4 text-sm font-['Outfit'] text-white/80 mb-6">
          <div>Total: <span className="text-white font-medium">{total}</span></div>
          <div>Avg ms: <span className="text-white font-medium">{data.avgMs}ms</span></div>
          <div>Today: <span className="text-white font-medium">{data.today}</span></div>
          <div>This Hour: <span className="text-white font-medium">{data.hour}</span></div>
          <div>Success: <span className="text-green-400 font-medium">{success}</span></div>
          <div>Fail: <span className="text-red-400 font-medium">{fail}</span></div>
        </div>
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden flex">
          <div className="h-full bg-green-500/80" style={{ width: `${pct}%` }} />
          <div className="h-full bg-red-500/80" style={{ width: `${100 - pct}%` }} />
        </div>
        <div className="text-xs text-white/50 mt-2 text-right">{pct}% Success</div>
      </div>
    );
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0608] text-white flex flex-col items-center justify-center p-4">
        <PageMeta title="Admin Login" />
        <Link to="/" className="absolute top-6 left-6 text-white/50 hover:text-white font-['Outfit'] text-sm">
          ← Back to Site
        </Link>
        <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
          <h1 className="text-3xl font-['Fraunces'] text-center mb-6 text-[rgba(255,220,180,0.85)]">Admin Login</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-black/50 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[rgba(255,220,180,0.85)] font-['Outfit'] transition-colors"
            />
            {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
            <button
              type="submit"
              className="bg-[rgba(255,220,180,0.85)] text-black font-semibold rounded-xl py-3 font-['Outfit'] hover:bg-white transition-colors"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0608] text-white font-['Outfit'] p-4 md:p-8">
      <PageMeta title="Admin Dashboard" />
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-['Fraunces'] text-[rgba(255,220,180,0.85)]">ADMIN DASHBOARD</h1>
            <p className="text-white/50 text-sm mt-1">Live monitoring and analytics</p>
          </div>
          <button
            onClick={handleLogout}
            className="border border-white/20 px-6 py-2 rounded-full hover:bg-white/10 transition-colors text-sm"
          >
            Logout
          </button>
        </header>

        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-200/80 rounded-xl p-4 mb-8 text-sm flex items-start gap-3">
          <span className="text-lg leading-none">⚠️</span>
          <p>{stats?.error
            ? `DB not connected — ${stats.error}. Set WEB_DB_URL (Supabase) to see live user/usage data.`
            : 'Live data from the web Postgres database. Auto-refreshes every 8 seconds.'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
            <h2 className="text-white/60 text-sm mb-2 uppercase tracking-wider">Users Online</h2>
            <div className="text-6xl font-['Fraunces'] text-[rgba(255,220,180,0.85)]">
              {stats?.usersOnline ?? '-'}
            </div>
            <div className="flex gap-6 mt-4 text-sm text-white/60">
              <div>
                <div className="text-2xl font-['Fraunces'] text-white/90">{stats?.usersToday ?? '-'}</div>
                <div className="text-xs uppercase tracking-wider">Today</div>
              </div>
              <div>
                <div className="text-2xl font-['Fraunces'] text-white/90">{stats?.usersTotal ?? '-'}</div>
                <div className="text-xs uppercase tracking-wider">All Time</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ToolCard name="bg-remove" data={stats?.tools?.['bg-remove']} />
            <ToolCard name="upscale" data={stats?.tools?.['upscale']} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-['Fraunces'] text-white/90 mb-4 border-b border-white/10 pb-2">Tool Health</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['bg-remove', 'upscale'].map(tool => (
                <div key={tool} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-sm text-white/60 capitalize mb-1">{tool.replace('-', ' ')}</div>
                  <div className="text-sm">
                    Last req: <span className="text-white/90">{formatDate(stats?.tools?.[tool]?.lastRequest)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="text-lg font-['Fraunces'] text-white/90 mb-4 border-b border-white/10 pb-2">Poll Votes</h2>
            {!stats?.poll?.length ? (
              <p className="text-white/40 text-sm">No votes yet</p>
            ) : (
              <ul className="space-y-3">
                {stats.poll.map(v => (
                  <li key={v.option_key} className="flex justify-between text-sm">
                    <span className="text-white/80 capitalize">{v.option_key}</span>
                    <span className="text-[rgba(255,220,180,0.85)] font-medium">{v.n}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-['Fraunces'] text-white/90 mb-4 border-b border-white/10 pb-2">Recent Activity</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-white/50 bg-black/20">
                      <th className="p-4 font-normal">Time</th>
                      <th className="p-4 font-normal">Tool</th>
                      <th className="p-4 font-normal">Status</th>
                      <th className="p-4 font-normal">IP</th>
                      <th className="p-4 font-normal">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!stats?.recentActivity?.length ? (
                      <tr>
                        <td colSpan="5" className="p-8 text-center text-white/40">No recent activity</td>
                      </tr>
                    ) : (
                      stats.recentActivity.map((log, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
                          <td className="p-4 text-white/70">{formatDate(log.ts)}</td>
                          <td className="p-4 capitalize text-[rgba(255,220,180,0.85)]">{log.tool.replace('-', ' ')}</td>
                          <td className="p-4">
                            {log.ok ? (
                              <span className="text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs">OK</span>
                            ) : (
                              <span className="text-red-400 bg-red-400/10 px-2 py-1 rounded text-xs" title={`Code: ${log.errCode}`}>FAIL {log.errCode ? `(${log.errCode})` : ''}</span>
                            )}
                          </td>
                          <td className="p-4 text-white/60 font-mono text-xs">{log.ip}</td>
                          <td className="p-4 text-white/70">{log.ms}ms</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
