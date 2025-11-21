/**
 * MyProfile Page
 * Displays user's profile and QR code
 * Allows editing and deletion of profile
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Edit, Trash2, ArrowLeft, Share2 } from 'lucide-react';
import { getMyProfile, deleteMyProfile } from '@/lib/networking';
import { Profile } from '@/lib/networkingTypes';
import ProfileCard from '@/components/networking/ProfileCard';
import QRCodeDisplay from '@/components/networking/QRCodeDisplay';
import EmptyState from '@/components/networking/EmptyState';
import { toast } from 'sonner';

const MyProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const myProfile = getMyProfile();
    setProfile(myProfile);
  }, []);

  const handleDelete = () => {
    const success = deleteMyProfile();
    if (success) {
      toast.success('Profile deleted successfully');
      navigate('/networking');
    } else {
      toast.error('Failed to delete profile');
    }
  };

  const handleShare = async () => {
    if (!profile) return;

    const shareText = `Connect with me at NASSCOM NTC 2025!\n\n${profile.name}\n${profile.role} at ${profile.company}\n${profile.email}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} - NTC 2025`,
          text: shareText,
        });
        toast.success('Shared successfully! 📤');
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(shareText);
        toast.success('Contact info copied to clipboard! 📋');
      } catch (error) {
        toast.error('Failed to share');
      }
    }
  };

  if (!profile) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <EmptyState
                icon={Edit}
                title="No Profile Found"
                description="You haven't created your networking profile yet. Create one now to start networking!"
                actionLabel="Create Profile"
                onAction={() => navigate('/networking/create-profile')}
              />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
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
                My Profile & QR Code 🎫
              </h1>
              <p className="text-lg opacity-90">
                Share your QR code with others or update your information
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={() => navigate('/networking/create-profile')}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                <Edit className="mr-2 h-5 w-5" />
                Edit Profile
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-white"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share Contact
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                  >
                    <Trash2 className="mr-2 h-5 w-5" />
                    Delete Profile
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete your networking profile. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Grid Layout: Profile + QR Code */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Card */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
                <ProfileCard profile={profile} showActions={false} />
              </div>

              {/* QR Code */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Your QR Code</h2>
                <QRCodeDisplay profile={profile} />
              </div>
            </div>

            {/* Instructions Card */}
            <Card className="bg-gradient-to-br from-gold/5 to-transparent border-l-4 border-l-gold">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span>💡</span>
                  How to Use Your QR Code
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="font-bold text-gold shrink-0">1.</span>
                    <span>Download your QR code or save a screenshot</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-gold shrink-0">2.</span>
                    <span>Show it to people you meet at the event</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-gold shrink-0">3.</span>
                    <span>They can scan it with their camera or the networking app</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-gold shrink-0">4.</span>
                    <span>Your contact info is instantly added to their list! 🎉</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MyProfile;

