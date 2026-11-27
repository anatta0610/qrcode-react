import { useState } from "react";
import "./Auth.css";

const API_BASE = "https://api.codepractice.cn";

export default function Auth({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function submit(action) {
    if (!username || !password) {
      setMsg("用户名和密码不能为空");
      return;
    }
    const res = await fetch(`${API_BASE}/${action}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token); // 存保险柜
      onLogin(data.token);
    } else if (data.ok) {
      submit("login"); // 注册成功，顺手自动登录
    } else {
      // 422 时 detail 是数组，只认字符串，防白屏
      const errText = typeof data.detail === "string" ? data.detail : null;
      setMsg(errText || data.error || "操作失败");
    }
  }

  return (
    <div className="auth">
      <h2>登录 / 注册</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="用户名"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="密码"
      />
      <div className="auth-actions">
        <button onClick={() => submit("login")}>登录</button>
        <button onClick={() => submit("register")}>注册</button>
      </div>
      {msg && <p className="auth-msg">{msg}</p>}
    </div>
  );
}
