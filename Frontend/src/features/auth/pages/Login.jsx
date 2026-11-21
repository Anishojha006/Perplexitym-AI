import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';


export default function Login() {
  const [form, setForm] = useState({ identifier: '', password: '' })
  const [formError, setFormError] = useState('');

  const user = useSelector(state => state.auth.user);
  const loading = useSelector(state => state.auth.loading);

  const [loginMethod, setLoginMethod] = useState('email');
  const { handlelogin } = useAuth();
  const navigate = useNavigate();


  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
    setFormError('');
  }
  
  if(!loading && user){

    return <Navigate  to="/" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');
    try {
      await handlelogin(form);
      navigate("/");
    } catch (err) {
      setFormError(err.response?.data?.message || 'Login failed. Please check your credentials and try again.');
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 rounded-2xl border border-[#31b8c6]/40 bg-zinc-950/80 p-8 shadow-2xl shadow-[#31b8c6]/20">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-zinc-400">Sign in to continue.</p>
        {formError && <p role="alert" className="text-sm text-red-400">{formError}</p>}

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-zinc-200">Sign in with</legend>
          <div className="grid grid-cols-2 rounded-lg border border-zinc-700 bg-zinc-900 p-1">
            {['email', 'username'].map((method) => (
              <button
                key={method}
                type="button"
                aria-pressed={loginMethod === method}
                onClick={() => setLoginMethod(method)}
                className={`rounded-md px-4 py-2 text-sm font-medium capitalize transition-colors ${loginMethod === method
                  ? 'bg-[#31b8c6] text-zinc-950'
                  : 'text-zinc-400 hover:text-white'
                  }`}
              >
                {method}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="block space-y-2 text-sm">
          {loginMethod === 'email' ? 'Email address' : 'Username'}
          <input
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none transition-colors focus:border-[#31b8c6]"
            type={loginMethod === 'email' ? 'email' : 'text'}
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            autoComplete={loginMethod === 'email' ? 'email' : 'username'}
            placeholder={loginMethod === 'email' ? 'you@example.com' : 'Your username'}
            required
          />
        </label>

        <label className="block space-y-2 text-sm">
          Password
          <input
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-[#31b8c6]"
            type="password" name="password" value={form.password}
            onChange={handleChange} autoComplete="current-password" required
          />
        </label>

        <button className="w-full rounded-lg bg-[#31b8c6] px-4 py-3 font-semibold text-zinc-950 hover:brightness-110" type="submit">
          Sign in
        </button>
        <p className="text-center text-sm text-zinc-400">
          New here?{' '}
          <Link
            className="text-[#31b8c6] hover:brightness-125"
            to="/register"
          >
            Create an account
          </Link>
        </p>
      </form>
    </main>
  )
}