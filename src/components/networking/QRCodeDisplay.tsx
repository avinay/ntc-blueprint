/**
 * QRCodeDisplay Component
 * Generates and displays a QR code from profile data
 * Includes download functionality
 */

import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Profile } from '@/lib/networkingTypes';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface QRCodeDisplayProps {
  profile: Profile;
  size?: number;
  showDownload?: boolean;
}

const QRCodeDisplay = ({ profile, size = 256, showDownload = true }: QRCodeDisplayProps) => {
  const qrRef = useRef<HTMLDivElement>(null);

  // Convert profile to JSON string for QR code
  const profileData = JSON.stringify(profile);

  /**
   * Download QR code as PNG image
   */
  const handleDownload = () => {
    try {
      const canvas = qrRef.current?.querySelector('canvas');
      if (!canvas) {
        toast.error('QR code not found');
        return;
      }

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error('Failed to generate QR code image');
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${profile.name.replace(/\s+/g, '-')}-QR-Code.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast.success('QR code downloaded successfully! 📥');
      });
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast.error('Failed to download QR code');
    }
  };

  /**
   * Share QR code (if Web Share API is available)
   */
  const handleShare = async () => {
    try {
      const canvas = qrRef.current?.querySelector('canvas');
      if (!canvas) {
        toast.error('QR code not found');
        return;
      }

      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error('Failed to generate QR code image');
          return;
        }

        const file = new File([blob], `${profile.name}-QR-Code.png`, { type: 'image/png' });
        
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `${profile.name}'s Contact`,
            text: `Connect with ${profile.name} at NASSCOM NTC 2025`,
          });
          toast.success('QR code shared successfully! 📤');
        } else {
          // Fallback: just download
          handleDownload();
        }
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
      toast.error('Failed to share QR code');
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl">Your QR Code</CardTitle>
        <CardDescription>
          Share this QR code with others to instantly exchange contact information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* QR Code Display */}
        <div ref={qrRef} className="flex justify-center p-6 bg-white rounded-lg">
          <QRCodeCanvas
            value={profileData}
            size={size}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: '/favicon.ico',
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>

        {/* Action Buttons */}
        {showDownload && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={handleDownload}
              className="flex-1 bg-gradient-hero"
              size="lg"
            >
              <Download className="mr-2 h-5 w-5" />
              Download QR Code
            </Button>
            <Button 
              onClick={handleShare}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share
            </Button>
          </div>
        )}

        <p className="text-sm text-muted-foreground text-center">
          💡 Tip: Save this QR code to your phone's gallery for quick access
        </p>
      </CardContent>
    </Card>
  );
};

export default QRCodeDisplay;

