import { useState } from "react";
import "./App.css";
import Form from "./components/Form.jsx";
import Result from "./components/Result.jsx";
import HistoryList from "./components/HistoryList";
import Auth from "./components/Auth.jsx";

function App() {
  const [url, setUrl] = useState("");
  const [colorDark, setColorDark] = useState("#000000");
  const [colorLight, setColorLight] = useState("#ffffff");
  const [logoFile, setLogoFile] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  async function generate() {
    if (!url) {
      alert("请输入链接");
      return;
    }

    const formData = new FormData();
    formData.append("url", url);
    formData.append("width", "256");
    formData.append("error_correction", "H");
    formData.append("color_dark", colorDark);
    formData.append("color_light", colorLight);
    if (logoFile) {
      formData.append("logo", logoFile);
    }

    try {
      const response = await fetch("https://api.codepractice.cn/generate", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("生成失败：" + response.status);
      }

      const blob = await response.blob();
      if (qrCode) {
        URL.revokeObjectURL(qrCode);
      }
      setQrCode(URL.createObjectURL(blob));
      setRefresh(refresh + 1);
    } catch (err) {
      console.error(err);
      alert("生成失败");
    }
  }

  if (!token) {
    return <Auth onLogin={setToken} />;
  }

  return (
    <div id="app">
      <h1>二维码生成器</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          setToken("");
        }}
      >
        退出
      </button>
      <Form
        url={url}
        setUrl={setUrl}
        colorDark={colorDark}
        setColorDark={setColorDark}
        colorLight={colorLight}
        setColorLight={setColorLight}
        setLogoFile={setLogoFile}
        onGenerate={generate}
      />
      <Result qrCode={qrCode} />
      <HistoryList refresh={refresh} token={token} />
    </div>
  );
}

export default App;
