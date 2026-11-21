import { useState } from "react";
import "./App.css";
import Form from "./components/Form.jsx";
import Result from "./components/Result.jsx";

function App() {
  const [url, setUrl] = useState("");
  const [colorDark, setColorDark] = useState("#000000");
  const [colorLight, setColorLight] = useState("#ffffff");
  const [logoFile, setLogoFile] = useState(null);
  const [qrCode, setQrCode] = useState("");

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
      const response = await fetch("http://api.codepractice.cn/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("生成失败：" + response.status);
      }

      const blob = await response.blob();
      setQrCode(URL.createObjectURL(blob));
    } catch (err) {
      console.error(err);
      alert("生成失败");
    }
  }

  return (
    <div id="app">
      <h1>二维码生成器</h1>
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
    </div>
  );
}

export default App;
