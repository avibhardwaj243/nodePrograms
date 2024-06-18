
import './App.css';
import {useState} from "react";

function App() {

  const BACKEND_SERVER = "http://localhost:5000";

  const [image, setImage] = useState({preview: '', data: ''});
  const [status, setStatus] = useState('');

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }

    setImage(img);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const filePath = image.data;
    
    let formData = new FormData();
    formData.append('file', filePath);

    const response = await fetch(`${BACKEND_SERVER}/uploadImage`, {
      method: "POST",
      body: formData
    });

    if (response) setStatus(response.statusText)
  }

  return (
    <div className="App">
      <h1>Upload to Server</h1>
      {
        image.preview && <img src={image.preview} width="100" height="100" />
      }
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange}></input>
        <button type="submit">Submit</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
  );
}

export default App;
