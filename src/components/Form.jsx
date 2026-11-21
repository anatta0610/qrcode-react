import "./Form.css";

function Form({
  url,
  setUrl,
  colorDark,
  setColorDark,
  colorLight,
  setColorLight,
  setLogoFile,
  onGenerate,
}) {
  return (
    <div className="form">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="请输入链接"
      />

      <div className="colors">
        <label>
          前景
          <input
            type="color"
            value={colorDark}
            onChange={(e) => setColorDark(e.target.value)}
          />
        </label>
        <label>
          背景
          <input
            type="color"
            value={colorLight}
            onChange={(e) => setColorLight(e.target.value)}
          />
        </label>
      </div>

      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => setLogoFile(e.target.files[0])}
      />

      <button onClick={onGenerate}>生成</button>
    </div>
  );
}

export default Form;
