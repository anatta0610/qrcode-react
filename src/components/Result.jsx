import "./Result.css";

function Result({ qrCode }) {
  if (!qrCode) return null;

  return (
    <div className="result">
      <img src={qrCode} alt="二维码" />
      <br />
      <a href={qrCode} download="qrcode.png">
        下载
      </a>
    </div>
  );
}

export default Result;
