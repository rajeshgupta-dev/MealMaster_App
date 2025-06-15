import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import "../styles/auth.css";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLogin, setLogin] = useState(location.pathname === "/login");
  const [email, setEmail] = useState("rajesh@gmail.com");
  const [password, setPassword] = useState("123456");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLogin(location.pathname === "/login");
  }, [location]);

  const toggleAuthMode = () => {
    const newMode = !isLogin;
    setEmail("");
    setPassword("");
    setName("");
    navigate(newMode ? "/login" : "/signUp", { replace: true });
  };

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedName = name.trim();

    if (!trimmedEmail || !trimmedPassword || (!isLogin && !trimmedName)) {
      return alert("Please fill all required fields.");
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPassword);
        alert("Logged in successfully!");
        navigate("/MealMaster/dashboard", { replace: true });
      } else {
        await createUserWithEmailAndPassword(
          auth,
          trimmedEmail,
          trimmedPassword
        );
        await updateProfile(auth.currentUser, { displayName: trimmedName });
        alert("Account created successfully!");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      navigate("/MealMaster/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
      alert(`Google login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail)
      return alert("Please enter your email to reset password.");

    try {
      await sendPasswordResetEmail(auth, trimmedEmail);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{isLogin ? "Login" : "Register"}</h1>

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {isLogin && (
          <p className="forgot-password" onClick={handleForgotPassword}>
            Forgot Password?
          </p>
        )}

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>

        <div className="or-line">OR</div>
        <button
          className="google-button"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          Continue with Google
        </button>

        <p className="switch-auth">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <span onClick={toggleAuthMode}>Create new Account</span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span onClick={toggleAuthMode}>Login here</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Auth;
