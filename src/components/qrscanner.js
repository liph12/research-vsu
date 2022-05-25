import QrReader from 'react-qr-scanner';
import { useState } from 'react';
import { Typography } from '@mui/material';
import ToolBar from './toolbar';

const QRScanner = () => {
    const [result, setResult] = useState('');
    const previewStyle = {
        height: 240,
        width: 320,
    }

    const handleScan = (data) => {
        setResult(data)
    }    

    const handleError = (err) => {
        console.error(err)
    }

    const QRScannerData = () => (
        <>
        <QrReader
          delay={100}
          style={previewStyle}
          onError={handleError}
          onScan={handleScan}
          />
        <Typography component="p">{result}</Typography>
      </>
    )

    return(
        <ToolBar Main={ QRScannerData } Title={'Enrolls'} />
    )
}

export default QRScanner;