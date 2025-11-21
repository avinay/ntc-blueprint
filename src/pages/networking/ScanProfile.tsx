/**
 * ScanProfile Page
 * Scans QR codes and imports contact profiles
 * Uses camera or file upload
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { saveContact, validateProfileData, generateId } from '@/lib/networking';
import { Profile } from '@/lib/networkingTypes';
import QRScanner from '@/components/networking/QRScanner';
import ProfileCard from '@/components/networking/ProfileCard';
import { toast } from 'sonner';

const ScanProfile = () => {
  const navigate = useNavigate();
  const [scannedProfile, setScannedProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  /**
   * Handle successful QR code scan
   */
  const handleScanSuccess = (decodedText: string) => {
    try {
      setError(null);
      
      // Parse JSON from QR code
      const data = JSON.parse(decodedText);
      
      // Validate profile data
      const profile = validateProfileData(data);
      
      // Add scannedAt timestamp
      profile.scannedAt = new Date().toISOString();
      
      setScannedProfile(profile);
      toast.success('QR code scanned successfully! 📸');
    } catch (err: any) {
      console.error('Scan parsing error:', err);
      const errorMsg = err.message || 'Invalid QR code format';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  /**
   * Handle scan error
   */
  const handleScanError = (errorMsg: string) => {
    setError(errorMsg);
  };

  /**
   * Save the scanned profile to contacts
   */
  const handleSaveContact = () => {
    if (!scannedProfile) return;

    try {
      saveContact(scannedProfile);
      setIsSuccess(true);
      toast.success(`${scannedProfile.name} added to your contacts! 🎉`);
      
      // Navigate to contacts after 2 seconds
      setTimeout(() => {
        navigate('/networking/contacts');
      }, 2000);
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to save contact';
      toast.error(errorMsg);
      setError(errorMsg);
    }
  };

  /**
   * Scan another QR code
   */
  const handleScanAnother = () => {
    setScannedProfile(null);
    setError(null);
    setIsSuccess(false);
  };

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/networking')}
              className="mb-4 text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Hub
            </Button>
            <div className="text-center">
              <h1 className="text-3xl lg:text-5xl font-black mb-4">
                Scan QR Code 📷
              </h1>
              <p className="text-lg opacity-90">
                Use your camera or upload an image to scan someone's profile
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scanner Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Success State */}
            {isSuccess && scannedProfile && (
              <Alert className="border-2 border-accent bg-accent/10">
                <CheckCircle className="h-5 w-5 text-accent" />
                <AlertDescription className="text-base font-medium">
                  Contact saved successfully! Redirecting to your contacts...
                </AlertDescription>
              </Alert>
            )}

            {/* Error State */}
            {error && !isSuccess && (
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Scanned Profile Preview */}
            {scannedProfile && !isSuccess && (
              <Card className="border-2 border-accent">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-accent" />
                    Profile Scanned Successfully!
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ProfileCard profile={scannedProfile} showActions={false} variant="compact" />
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleSaveContact}
                      className="flex-1 bg-gradient-hero"
                      size="lg"
                    >
                      Save to Contacts
                    </Button>
                    <Button
                      onClick={handleScanAnother}
                      variant="outline"
                      className="flex-1"
                      size="lg"
                    >
                      Scan Another
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* QR Scanner */}
            {!scannedProfile && !isSuccess && (
              <QRScanner
                onScanSuccess={handleScanSuccess}
                onScanError={handleScanError}
              />
            )}

            {/* Tips Card */}
            {!scannedProfile && !isSuccess && (
              <Card className="bg-gradient-to-br from-primary/5 to-transparent border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <h3 className="font-bold mb-3 text-lg">🎯 Scanning Tips</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Make sure the QR code is well-lit and in focus</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>Hold your device steady for 2-3 seconds</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>The QR code should fill most of the frame</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>If camera doesn't work, try the upload option</span>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <span>On iOS Safari, you may need to grant camera permissions in Settings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ScanProfile;

