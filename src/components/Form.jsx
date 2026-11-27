import "./Form.css";

function Form({
  url,
  setUrl,
  colorDark,
  setColorDark,
  colorLight,
  setColorLight,
  setLogoFile,
  width,
  setWidth,
  errorCorrection,
  setErrorCorrection,
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
      <div className="params">
        <label>
          尺寸
          <select value={width} onChange={(e) => setWidth(e.target.value)}>
            <option value="128">128</option>
            <option value="256">256</option>
            <option value="512">512</option>
            <option value="1024">1024</option>
          </select>
        </label>
        <label>
          容错
          <select
            value={errorCorrection}
            onChange={(e) => setErrorCorrection(e.target.value)}
          >
            <option value="L">L 7%</option>
            <option value="M">M 15%</option>
            <option value="Q">Q 25%</option>
            <option value="H">H 30%</option>
          </select>
        </label>
      </div>
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
