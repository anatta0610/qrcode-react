import { useEffect, useState } from "react";
import "./HistoryList.css";

const API_BASE = "https://api.codepractice.cn";

export default function HistoryList({ refresh, token }) {
  const [items, setItems] = useState([]);

  // refresh 变化时重新拉取历史记录（第一次上屏也会执行一次）
  useEffect(() => {
    if (!token) return; // 没登录不发请求
    fetch(`${API_BASE}/history`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setItems(Array.isArray(data) ? data : [])); // 白屏保险
  }, [refresh, token]); // token 也是依赖：登录后要自动拉一次

  return (
    <div className="history">
      <h2>历史记录</h2>
      <div className="history-head">
        <span className="history-dark">前景</span>
        <span className="history-light">背景</span>
        <span className="history-text">网址</span>
        <span className="history-logo">Logo</span>
        <span className="history-time">时间</span>
      </div>
      {items.length === 0 ? (
        <p className="history-empty">暂无记录</p>
      ) : (
        <ul className="history-list">
          {items.map((item) => (
            <li key={item.id} className="history-item">
              <span className="history-dark">
                <i style={{ background: item.color_dark }}></i>
              </span>
              <span className="history-light">
                <i style={{ background: item.color_light }}></i>
              </span>
              <span className="history-text" title={item.url}>
                {item.url}
              </span>
              <span className="history-logo">
                {item.has_logo ? "有" : "无"}
              </span>
              <span className="history-time">
                {item.created_at.slice(0, 19).replace("T", " ")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
