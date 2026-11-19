import { useState } from 'react'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  function handleSubmit(event) {
    event.preventDefault()
    console.log('Login submitted:', form)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-950 via-neutral-950 to-red-950 p-6 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5 rounded-2xl border border-red-900/40 bg-zinc-950/80 p-8 shadow-2xl shadow-red-950/40">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-zinc-400">Sign in to continue.</p>

        <label className="block space-y-2 text-sm">
          Email
          <input
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
            type="email" name="email" value={form.email}
            onChange={handleChange} autoComplete="email" required
          />
        </label>

        <label className="block space-y-2 text-sm">
          Password
          <input
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-red-500"
            type="password" name="password" value={form.password}
            onChange={handleChange} autoComplete="current-password" required
          />
        </label>

        <button className="w-full rounded-lg bg-gradient-to-r from-red-700 to-rose-500 px-4 py-3 font-semibold hover:brightness-110" type="submit">
          Sign in
        </button>
        <p className="text-center text-sm text-zinc-400">
          New here? <a className="text-rose-400 hover:text-rose-300" href="/register">Create an account</a>
        </p>
      </form>
    </main>
  )
}