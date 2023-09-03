import React, { useEffect, useState } from 'react';

function QRCode() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://qrcode-monkey.p.rapidapi.com/qr/custom", {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "qrcode-monkey.p.rapidapi.com",
        "x-rapidapi-key": '195a5a09f3mshd171a87f2ef92cap1ed528jsn39f50c5126b2'
    },
    'params':{
        'config':'{"bodyColor": "#0277BD", "body":"mosaic"}',
    }
})
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('An error occurred while fetching data:', error);
      });
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default QRCode;