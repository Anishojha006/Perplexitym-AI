import { useState } from 'react';
import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const { handleregister } = useAuth();

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
    setFormError('');
    setFormSuccess('');
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError('');
    setFormSuccess('');
    try {
      const result = await handleregister(form);
      setFormSuccess(result.message || 'Check your email for a verification link.');
    } catch (err) {
      setFormError(
        err.response?.status === 409
          ? 'An account with this email or username already exists. Please log in or use different details.'
          : err.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 p-6 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 rounded-2xl border border-[#31b8c6]/40 bg-zinc-950/80 p-8 shadow-2xl shadow-[#31b8c6]/20">
        <h1 className="text-3xl font-bold">Create your account</h1>
        <p className="text-zinc-400">Get started by registering.</p>
        {formError && <p role="alert" className="text-sm text-red-400">{formError}</p>}
        {formSuccess && <p role="status" className="text-sm text-emerald-400">{formSuccess}</p>}

        <label className="block space-y-2 text-sm">
          Username
          <input
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-[#31b8c6]"
            type="text" name="username" value={form.username}
            onChange={handleChange} autoComplete="username" required
          />
        </label>

        <label className="block space-y-2 text-sm">
          Email
          <input
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-[#31b8c6]"
            type="email" name="email" value={form.email}
            onChange={handleChange} autoComplete="email" required
          />
        </label>

        <label className="block space-y-2 text-sm">
          Password
          <input
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-[#31b8c6]"
            type="password" name="password" value={form.password}
            onChange={handleChange} autoComplete="new-password" required
          />
        </label>

        <button className="w-full rounded-lg bg-[#31b8c6] px-4 py-3 font-semibold text-zinc-950 hover:brightness-110" type="submit">
          Register
        </button>
        <p className="text-center text-sm text-zinc-400">

          Already registered?  <Link to="/login" className="text-[#31b8c6] hover:brightness-125">Log In</Link>
        </p>
      </form>
    </main>
  )
}
