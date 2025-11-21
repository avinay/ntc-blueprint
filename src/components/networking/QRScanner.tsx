/**
 * QRScanner Component
 * Scans QR codes using device camera or file upload
 * Mobile-friendly with excellent browser compatibility
 */

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload, X, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
}

const QRScanner = ({ onScanSuccess, onScanError }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [scanMode, setScanMode] = useState<'camera' | 'upload' | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  /**
   * Start camera scanning
   */
  const startCameraScanning = async () => {
    try {
      setError(null);
      setIsScanning(true);
      setScanMode('camera');

      // Initialize scanner
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      // Get camera devices
      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        throw new Error('No cameras found on this device');
      }

      // Prefer back camera on mobile
      const cameraId = devices.find(d => d.label.toLowerCase().includes('back'))?.id || devices[0].id;

      // Start scanning
      await scanner.start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          // Success callback
          stopScanning();
          onScanSuccess(decodedText);
        },
        (errorMessage) => {
          // Error callback (not always a real error, just no QR detected)
          // We don't show these as they're too frequent
          console.debug('QR scan error:', errorMessage);
        }
      );
    } catch (err: any) {
      console.error('Camera scanning error:', err);
      const errorMsg = err.message || 'Failed to access camera';
      setError(errorMsg);
      setIsScanning(false);
      setScanMode(null);
      if (onScanError) onScanError(errorMsg);
    }
  };

  /**
   * Stop camera scanning
   */
  const stopScanning = async () => {
    try {
      if (scannerRef.current && scannerRef.current.isScanning) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      }
      setIsScanning(false);
      setScanMode(null);
    } catch (err) {
      console.error('Error stopping scanner:', err);
    }
  };

  /**
   * Handle file upload
   */
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      setScanMode('upload');

      const scanner = new Html5Qrcode('qr-reader-file');
      const decodedText = await scanner.scanFile(file, true);
      
      onScanSuccess(decodedText);
      setScanMode(null);
    } catch (err: any) {
      console.error('File scan error:', err);
      const errorMsg = 'No valid QR code found in the image';
      setError(errorMsg);
      setScanMode(null);
      if (onScanError) onScanError(errorMsg);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="border-2 border-accent/20">
      <CardHeader>
        <CardTitle className="text-xl">Scan QR Code</CardTitle>
        <CardDescription>
          Use your camera or upload an image to scan someone's QR code
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Scanner Container */}
        {!isScanning && (
          <div className="space-y-3">
            {/* Camera Scan Button */}
            <Button
              onClick={startCameraScanning}
              className="w-full bg-gradient-hero"
              size="lg"
            >
              <Camera className="mr-2 h-5 w-5" />
              Scan with Camera
            </Button>

            {/* Upload Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="qr-upload"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Upload className="mr-2 h-5 w-5" />
                Upload QR Code Image
              </Button>
            </div>
          </div>
        )}

        {/* Camera Preview */}
        {isScanning && scanMode === 'camera' && (
          <div className="space-y-3">
            <div 
              id="qr-reader" 
              className="rounded-lg overflow-hidden border-2 border-primary"
            ></div>
            <Button
              onClick={stopScanning}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              <X className="mr-2 h-5 w-5" />
              Stop Scanning
            </Button>
          </div>
        )}

        {/* Hidden element for file scanning */}
        <div id="qr-reader-file" className="hidden"></div>

        {/* Instructions */}
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <p className="text-sm font-medium">📱 Tips for scanning:</p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4 list-disc">
            <li>Allow camera permissions when prompted</li>
            <li>Hold the QR code steady within the frame</li>
            <li>Ensure good lighting for best results</li>
            <li>Use upload option if camera doesn't work</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;

