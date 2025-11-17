import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Users, Megaphone, Building } from "lucide-react";

const Partnership = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Partnership Opportunities
            </h1>
            <p className="text-xl opacity-90">
              Amplify your brand across India's largest technology leadership platform
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              NTC 2025 offers unparalleled visibility and engagement opportunities across 10 dynamic cities over 21 days. Partner with us to connect with 10,000+ CXOs, innovators, and decision-makers shaping India's AI-first future.
            </p>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Sponsorship Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-gold-foreground" />
                </div>
                <CardTitle className="text-2xl">Diamond</CardTitle>
                <CardDescription>Premier Partner</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Exclusive category rights</li>
                  <li>✓ Prime booth location (all cities)</li>
                  <li>✓ 8 keynote speaking slots</li>
                  <li>✓ VIP networking events</li>
                  <li>✓ Maximum brand visibility</li>
                  <li>✓ Custom activation opportunities</li>
                </ul>
                <Button className="w-full mt-6 bg-gradient-gold">Contact Us</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl">Platinum</CardTitle>
                <CardDescription>Strategic Partner</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Category leadership</li>
                  <li>✓ Premium booth (5 cities)</li>
                  <li>✓ 5 speaking opportunities</li>
                  <li>✓ Networking events access</li>
                  <li>✓ Enhanced branding</li>
                  <li>✓ PR & media exposure</li>
                </ul>
                <Button className="w-full mt-6 bg-gradient-accent">Contact Us</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Gold</CardTitle>
                <CardDescription>Innovation Partner</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Exhibit space (3 cities)</li>
                  <li>✓ 3 speaking slots</li>
                  <li>✓ Brand visibility</li>
                  <li>✓ Networking access</li>
                  <li>✓ Digital promotion</li>
                  <li>✓ Lead generation tools</li>
                </ul>
                <Button className="w-full mt-6" variant="default">Contact Us</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                  <Award className="h-8 w-8 text-secondary-foreground" />
                </div>
                <CardTitle className="text-2xl">Silver</CardTitle>
                <CardDescription>Associate Partner</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Exhibit booth (2 cities)</li>
                  <li>✓ 1 speaking opportunity</li>
                  <li>✓ Logo placement</li>
                  <li>✓ Event access passes</li>
                  <li>✓ Digital listing</li>
                  <li>✓ Marketing materials</li>
                </ul>
                <Button className="w-full mt-6" variant="outline">Contact Us</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Opportunities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Additional Partnership Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <Building className="h-10 w-10 mb-3 text-primary" />
                <CardTitle>Exhibitor Program</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Showcase your products and solutions across multiple cities with dedicated booth space and promotional support.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Megaphone className="h-10 w-10 mb-3 text-accent" />
                <CardTitle>Media Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Amplify your media presence with exclusive access, press releases, and comprehensive coverage opportunities.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 mb-3 text-gold" />
                <CardTitle>Community Partner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Engage with specific tech communities and innovation ecosystems through targeted partnership programs.
                </p>
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Partner with NTC 2025?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Connect with our partnerships team to explore customized opportunities for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Schedule a Consultation
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
              Download Partnership Deck
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Partnership;
