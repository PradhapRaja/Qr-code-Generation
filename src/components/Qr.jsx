import React, { useState } from 'react';

function Qr() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setQrdata] = useState("");
  const [size, setsize] = useState("150");

  const generateQR = () => {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
    } catch (err) {
      console.log("Error generating QR code", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadQR = () => {
    if (img) {
      const link = document.createElement('a');
      link.href = img;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alert("successfully Downloaded...")
    } else {
      alert("Please generate a QR code first.");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded shadow-md'>
        <h1 className='text-center font-bold text-2xl text-blue-400'>QR Code Generator</h1>
        <div className='flex justify-center my-4'>
          {loading && <p>Please Wait...</p>}
          {img && (
            <img 
              src={img}
              className='w-40 h-40 rounded mx-auto'
              alt="Generated QR Code"
            />
          )}
        </div>
        <label htmlFor="dataInput" className='block text-sm font-medium text-gray-700 mb-2'>
          Data For QR Code:
        </label>
        <input
          type="text"
          id='dataInput'
          value={qrdata}
          onChange={(e) => setQrdata(e.target.value)}
          placeholder='Enter data for QR Code'
          className='block w-full p-2 border border-gray-300 rounded mb-4'
        />
        
        <label htmlFor="sizeInput" className='block text-sm font-medium text-gray-700 mb-2'>
          Image size (e.g., 150):
        </label>
        <input
          type="text"
          id='sizeInput'
          value={size}
          onChange={(e) => setsize(e.target.value)}
          placeholder='Enter size for QR Code'
          className='block w-full p-2 border border-gray-300 rounded mb-4'
        />
        
        <div className='flex space-x-4'>
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            onClick={generateQR}
          >
            Generate QR Code
          </button>
          <button
            className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'
            onClick={downloadQR}
          >
            Download QR Code
          </button>
        </div>
      </div>  
    </div>
  );
}

export default Qr;
