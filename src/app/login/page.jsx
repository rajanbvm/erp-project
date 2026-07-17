"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import loginImg from "@/images/login-img.jpg";
import eyeClose from "@/images/EyeClose.svg";
import eyeOpen from "@/images/eyeOpen.svg";
import Logo from "@/images/logo.svg";
import { BsArrowRight } from "react-icons/bs";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      form.email === "admin@gmail.com" &&
      form.password === "123456"
    ) {
      // Save login info
      localStorage.setItem(
        "adminUser",
        JSON.stringify({
          id: 1,
          name: "Admin",
          email: "admin@gmail.com",
          role: "admin",
          isLoggedIn: true,
        })
      );

      alert("Login Successful");

      router.push("/dashboard");
    } else {
      alert("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="main-section login-page">
      <section className="login-section position-relative">
        <div className="row m-0">
          {/* Left Side */}
          <div className="col-lg-6 col-login-form">
            <div className="signup-form">

            <Link href="/" className="navbar-brand">
                <Image
                  src={Logo}
                  alt="Logo"
                  className="main-logo"
                  priority
                />
              </Link>

              <h2>Welcome Back</h2>

              <p className="form-desc">
                Login to access the Dashboard.
              </p>

              <div className="form-div">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group pwd">
                    <label htmlFor="password">Password</label>

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control pwd-input"
                      placeholder="Enter your password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />

                    <span
                      type="button"
                      className="eye-btn"
                      onClick={togglePassword}
                    >
                      <Image
                        src={showPassword ? eyeClose : eyeOpen}
                        alt="Toggle Password"
                        width={20}
                        height={20}
                      />
                    </span>
                  </div>

                  <div className="form-action">
                    <button
                      type="submit"
                      className="btn-primary w-100"
                      disabled={loading}
                    >
                      <span>
                        {loading ? "Logging in..." : "SIGN IN"}
                      </span>

                    <BsArrowRight size={20} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="col-lg-6 px-0 col-login-img">
            <div className="signup-img">

              <Image
                src={loginImg}
                alt="Login"
                className="login-img"
                width={800}
                height={800}
                priority
              />
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}