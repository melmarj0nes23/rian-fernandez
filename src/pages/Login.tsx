import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user, isAdmin, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // Navigation is handled by the useEffect above
    } catch (err: any) {
      setError(err.message || 'Failed to login with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-8">
      <div className="w-full max-w-md">
        <h1
          className="text-center mb-10"
          style={{
            fontFamily: "'Bodoni Moda', serif",
            fontWeight: 300,
            fontSize: "2.5rem",
            color: "#0C0B09",
          }}
        >
          Welcome Back
        </h1>

        <form onSubmit={handleEmailLogin} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm" style={{ fontFamily: "Raleway, sans-serif" }}>
              {error}
            </div>
          )}
          
          <div>
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-0 py-3 bg-transparent outline-none border-0 border-b"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "0.87rem",
                color: "#0C0B09",
                borderBottomColor: "rgba(12,11,9,0.2)",
                borderBottomWidth: "1px",
              }}
            />
          </div>

          <div>
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-0 py-3 bg-transparent outline-none border-0 border-b"
              style={{
                fontFamily: "Raleway, sans-serif",
                fontWeight: 300,
                fontSize: "0.87rem",
                color: "#0C0B09",
                borderBottomColor: "rgba(12,11,9,0.2)",
                borderBottomWidth: "1px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading || authLoading}
            className="w-full py-5 text-xs tracking-[0.28em] uppercase transition-all duration-300 hover:bg-[#B8955A] disabled:opacity-50"
            style={{
              fontFamily: "Raleway, sans-serif",
              fontWeight: 400,
              backgroundColor: "#0C0B09",
              color: "#F7F4EE",
              border: "none",
              cursor: (loading || authLoading) ? "wait" : "pointer",
              marginTop: "2.5rem",
            }}
          >
            {loading ? "Authenticating..." : "Sign In with Email"}
          </button>
        </form>

        <div className="mt-8 relative text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full" style={{ borderTop: "1px solid rgba(12,11,9,0.1)" }}></div>
          </div>
          <span className="relative px-4 text-xs tracking-[0.2em] uppercase bg-[#F7F4EE]" style={{ fontFamily: "Raleway, sans-serif", color: "#7A7468" }}>
            Or
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading || authLoading}
          className="w-full py-5 text-xs tracking-[0.28em] uppercase transition-all duration-300 disabled:opacity-50 mt-8"
          style={{
            fontFamily: "Raleway, sans-serif",
            fontWeight: 400,
            backgroundColor: "transparent",
            color: "#0C0B09",
            border: "1px solid #0C0B09",
            cursor: (loading || authLoading) ? "wait" : "pointer",
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
