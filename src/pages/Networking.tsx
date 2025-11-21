/**
 * Networking Hub Page
 * Main landing page for the networking mini-app
 * Provides navigation to all networking features
 */

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, QrCode, Users, Scan, Network, TrendingUp } from 'lucide-react';
import { getMyProfile, getNetworkingStats } from '@/lib/networking';
import { NetworkingStats } from '@/lib/networkingTypes';

const Networking = () => {
  const navigate = useNavigate();
  const [hasProfile, setHasProfile] = useState(false);
  const [stats, setStats] = useState<NetworkingStats>({
    totalContacts: 0,
    recentScans: 0,
    companiesRepresented: 0,
  });

  useEffect(() => {
    // Check if user has a profile
    const profile = getMyProfile();
    setHasProfile(!!profile);

    // Load stats
    const networkingStats = getNetworkingStats();
    setStats(networkingStats);
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              <Network className="h-4 w-4" />
              Smart Networking Tool
            </div>
            <h1 className="text-4xl lg:text-6xl font-black leading-tight">
              Network Like a Pro 🤝
            </h1>
            <p className="text-xl lg:text-2xl font-bold">
              Exchange contacts instantly with QR codes
            </p>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Create your profile, generate a QR code, and scan others to build your network at NASSCOM NTC 2025!
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {hasProfile && stats.totalContacts > 0 && (
        <section className="py-8 bg-muted/30 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <div className="text-4xl font-black text-primary mb-2">{stats.totalContacts}</div>
                  <div className="text-sm text-muted-foreground">Total Contacts</div>
                </CardContent>
              </Card>
              <Card className="text-center border-l-4 border-l-accent">
                <CardContent className="pt-6">
                  <div className="text-4xl font-black text-accent mb-2">{stats.recentScans}</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </CardContent>
              </Card>
              <Card className="text-center border-l-4 border-l-gold">
                <CardContent className="pt-6">
                  <div className="text-4xl font-black text-gold mb-2">{stats.companiesRepresented}</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Main Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {/* Create/View Profile */}
              <Card className="border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-transparent hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {hasProfile ? <QrCode className="h-6 w-6 text-primary" /> : <UserPlus className="h-6 w-6 text-primary" />}
                  </div>
                  <CardTitle className="text-2xl">
                    {hasProfile ? 'My Profile & QR Code' : 'Create Your Profile'}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {hasProfile 
                      ? 'View your profile and share your QR code with others'
                      : 'Set up your profile to start networking'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate(hasProfile ? '/networking/my-profile' : '/networking/create-profile')}
                    className="w-full bg-gradient-hero"
                    size="lg"
                  >
                    {hasProfile ? 'View My Profile' : 'Create Profile'}
                  </Button>
                </CardContent>
              </Card>

              {/* Scan QR Code */}
              <Card className="border-l-4 border-l-accent bg-gradient-to-br from-accent/5 to-transparent hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Scan className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-2xl">Scan QR Code</CardTitle>
                  <CardDescription className="text-base">
                    Use your camera to scan someone's QR code and add them to your contacts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/networking/scan')}
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent hover:text-white"
                    size="lg"
                  >
                    Start Scanning
                  </Button>
                </CardContent>
              </Card>

              {/* View Contacts */}
              <Card className="border-l-4 border-l-secondary bg-gradient-to-br from-secondary/5 to-transparent hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl">My Contacts</CardTitle>
                  <CardDescription className="text-base">
                    View and manage all the contacts you've collected
                    {stats.totalContacts > 0 && ` (${stats.totalContacts})`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => navigate('/networking/contacts')}
                    variant="outline"
                    className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white"
                    size="lg"
                  >
                    View Contacts
                  </Button>
                </CardContent>
              </Card>

              {/* Getting Started */}
              <Card className="border-l-4 border-l-gold bg-gradient-to-br from-gold/5 to-transparent hover:shadow-xl transition-all">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-gold" />
                  </div>
                  <CardTitle className="text-2xl">Quick Start Guide</CardTitle>
                  <CardDescription className="text-base">
                    New to smart networking? Here's how it works
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="font-bold text-gold">1.</span>
                      <span>Create your profile with contact details</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-gold">2.</span>
                      <span>Generate your unique QR code</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-gold">3.</span>
                      <span>Scan others' QR codes at the event</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-bold text-gold">4.</span>
                      <span>Build your network automatically! 🎉</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-black mb-4">
            Ready to Network? 🚀
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {hasProfile 
              ? "You're all set! Start scanning QR codes and growing your network."
              : "Create your profile now and start making meaningful connections at NTC 2025."
            }
          </p>
          <Button 
            onClick={() => navigate(hasProfile ? '/networking/scan' : '/networking/create-profile')}
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-black text-lg px-10"
          >
            {hasProfile ? 'Start Scanning' : 'Create My Profile'}
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Networking;

