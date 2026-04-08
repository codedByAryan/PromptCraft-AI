import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await API.post("/auth/register", form);
      login(data);
      navigate("/chat");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#020617] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#111827] p-8 shadow-xl"
      >
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Register
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-600 bg-[#020617] px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-600 bg-[#020617] px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-600 bg-[#020617] px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-sky-400 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-300 disabled:opacity-70"
        >
          {loading ? "Please wait..." : "Register"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-sky-400 hover:text-sky-300"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;