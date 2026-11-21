import { useState } from 'react'
import './App.css'

function App(){
  const [url, setUrl] = useState('')
  const [colorDark, setColorDark] = useState('#000000')
  const [colorLight, setColorLight] = useState('#ffffff')
  const [logoFile, setLogoFile] = useState(null)
  const [qrCode, setQrCode] = useState('')

  async function generate(){
    if(!url) {
      alert('请输入链接')
      return 
    }

    const formData = new FormData()
    formData.append('url', url)
    formData.append('width', '256')
    formData.append('error_correction', 'H')
    formData.append('color_dark', colorDark)
    formData.append('color_light', colorLight)
    if(logoFile){
      formData.append('logo', logoFile)
    }
    
    try{
      const response = await fetch(
        'http://api.codepractice.cn/generate',
        {
          method: 'POST',
          body: formData,
        })
      if(!response.ok){
        throw new Error('生成失败' + response.status)
      }
      const blob = await response.blob()
      setQrCode(URL.createObjectURL(blob))
    } catch (err){
      console.error(err)
      alert('生成失败')
    }
  }

  return(
    <div id="app">
      <h1>二维码生成器</h1>
      <div className="form">
        <input
          type="text"
          value={url}
          onChange={e=>setUrl(e.target.value)}
          placeholder="请输入链接"
        />
        <div className="colors">
            <label>
              前景
              <input 
                type="color"
                value={colorDark}
                onChange={e=>setColorDark(e.target.value)}
              />
            </label>
            <label>
              背景
              <input 
                type="color"
                value={colorLight}
                onChange={e=>setColorLight(e.target.value)}
              />
            </label>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={e=>setLogoFile(e.target.files[0])}
        />
        <button onClick={generate}>生成</button>
      </div>
      {qrCode && (
        <div className="result">
          <img src={qrCode} alt="二维码" />
          <br />
          <a href={qrCode} download="qrcode.png">下载</a>
        </div>
      )}
    </div>
  )
}
export default App