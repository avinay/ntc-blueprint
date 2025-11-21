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
  const isScanningRef = useRef(false); // Track scanning state

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupScanner();
    };
  }, []);

  /**
   * Cleanup scanner instance
   */
  const cleanupScanner = async () => {
    if (scannerRef.current) {
      try {
        const isCurrentlyScanning = await scannerRef.current.getState();
        if (isCurrentlyScanning === 2) { // 2 = SCANNING state
          await scannerRef.current.stop();
        }
        await scannerRef.current.clear();
      } catch (err) {
        console.debug('Scanner cleanup error (this is normal):', err);
      }
      scannerRef.current = null;
    }
    isScanningRef.current = false;
  };

  /**
   * Check if camera access is supported
   */
  const checkCameraSupport = () => {
    // Check if running in secure context (HTTPS or localhost)
    if (!window.isSecureContext) {
      throw new Error('Camera access requires HTTPS. Please use a secure connection.');
    }

    // Check if getUserMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Camera access is not supported in this browser. Please try Chrome, Safari, or Firefox.');
    }
  };

  /**
   * Request camera permissions explicitly
   */
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      // Stop the stream immediately - we just needed to request permission
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        throw new Error('Camera permission denied. Please allow camera access in your browser settings and try again.');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        throw new Error('No camera found on this device.');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        throw new Error('Camera is already in use by another application.');
      } else {
        throw new Error(`Camera access error: ${err.message || 'Unknown error'}`);
      }
    }
  };

  /**
   * Start camera scanning
   */
  const startCameraScanning = async () => {
    try {
      setError(null);
      
      // Prevent multiple simultaneous scans
      if (isScanningRef.current) {
        console.log('Already scanning, stopping previous scan...');
        await cleanupScanner();
        // Wait a bit for cleanup
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      setIsScanning(true);
      setScanMode('camera');

      // Check camera support
      checkCameraSupport();

      // Request camera permission first
      await requestCameraPermission();

      // Clean up any existing scanner
      await cleanupScanner();

      // Initialize new scanner
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;
      isScanningRef.current = true;

      // Get camera devices
      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        throw new Error('No cameras found on this device');
      }

      // Prefer back camera on mobile
      const cameraId = devices.find(d => d.label.toLowerCase().includes('back'))?.id || devices[0].id;

      // Start scanning with better config
      await scanner.start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        async (decodedText) => {
          // Success callback
          console.log('QR Code detected:', decodedText);
          await stopScanning();
          onScanSuccess(decodedText);
        },
        (errorMessage) => {
          // Error callback (not always a real error, just no QR detected)
          // We don't show these as they're too frequent
          console.debug('QR scan attempt:', errorMessage);
        }
      );
      
      console.log('Camera scanner started successfully');
    } catch (err: any) {
      console.error('Camera scanning error:', err);
      const errorMsg = err.message || 'Failed to access camera';
      setError(errorMsg);
      setIsScanning(false);
      setScanMode(null);
      isScanningRef.current = false;
      await cleanupScanner();
      if (onScanError) onScanError(errorMsg);
    }
  };

  /**
   * Stop camera scanning
   */
  const stopScanning = async () => {
    try {
      console.log('Stopping scanner...');
      await cleanupScanner();
      setIsScanning(false);
      setScanMode(null);
      console.log('Scanner stopped successfully');
    } catch (err) {
      console.error('Error stopping scanner:', err);
      // Force reset state even if cleanup fails
      setIsScanning(false);
      setScanMode(null);
      isScanningRef.current = false;
    }
  };

  /**
   * Handle file upload
   */
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    let fileScanner: Html5Qrcode | null = null;

    try {
      setError(null);
      setScanMode('upload');

      console.log('Scanning file:', file.name);
      fileScanner = new Html5Qrcode('qr-reader-file');
      const decodedText = await fileScanner.scanFile(file, true);
      
      console.log('File scan successful:', decodedText);
      onScanSuccess(decodedText);
      setScanMode(null);
    } catch (err: any) {
      console.error('File scan error:', err);
      const errorMsg = 'No valid QR code found in the image. Please try a clearer image.';
      setError(errorMsg);
      setScanMode(null);
      if (onScanError) onScanError(errorMsg);
    } finally {
      // Cleanup file scanner
      if (fileScanner) {
        try {
          await fileScanner.clear();
        } catch (e) {
          console.debug('File scanner cleanup (normal):', e);
        }
      }
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <p className="text-sm font-medium text-center text-primary">📷 Camera Active - Point at QR Code</p>
              <div 
                id="qr-reader" 
                className="rounded-lg overflow-hidden border-2 border-primary shadow-lg"
                style={{ minHeight: '300px' }}
              ></div>
            </div>
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
        
        {/* Upload Processing */}
        {scanMode === 'upload' && (
          <div className="bg-muted/30 p-6 rounded-lg text-center">
            <div className="animate-pulse text-primary text-sm font-medium">
              Processing image...
            </div>
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

        {/* Troubleshooting Guide */}
        <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800 space-y-3">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">🔧 Camera Not Working?</p>
          <div className="text-xs text-blue-800 dark:text-blue-200 space-y-2">
            <p className="font-medium">For Chrome/Edge:</p>
            <ol className="ml-4 space-y-1 list-decimal">
              <li>Click the 🔒 or ⓘ icon in the address bar</li>
              <li>Find "Camera" and set to "Allow"</li>
              <li>Refresh the page and try again</li>
            </ol>
            
            <p className="font-medium mt-2">For Safari (iPhone/iPad):</p>
            <ol className="ml-4 space-y-1 list-decimal">
              <li>Go to Settings → Safari → Camera</li>
              <li>Select "Ask" or "Allow"</li>
              <li>Return to the website and try again</li>
            </ol>
            
            <p className="font-medium mt-2">Still not working?</p>
            <ul className="ml-4 space-y-1 list-disc">
              <li>Make sure you're using HTTPS (secure connection)</li>
              <li>Close other apps using the camera</li>
              <li>Try a different browser</li>
              <li>Use the "Upload QR Code Image" option instead</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;

