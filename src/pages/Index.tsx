import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Briefcase } from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground">
        <div className="container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              NASSCOM NTC 2025: The Era of Intelligent Progress
            </h1>
            <p className="text-xl lg:text-2xl font-medium opacity-90">
              21 Days. 10 Dynamic Cities. The Blueprint for the AI-First Enterprise.
            </p>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Join global leaders and visionary minds from November 5 to 25 at India's largest technology and leadership gathering. NTC 2025 is the definitive platform for moving AI from conceptual models to measurable, high-impact capabilities. This is where deep conversations, brilliant ideas, and exciting partnerships shape India's intelligent future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8">
                Secure Your Early Bird Access
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20 text-lg px-8">
                View 10-City Program
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold text-primary">21</div>
                <div className="text-sm text-muted-foreground">Days of Innovation</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold text-primary">10</div>
                <div className="text-sm text-muted-foreground">Dynamic Cities</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Global Speakers</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Industry Leaders</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Focus Areas */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Four Strategic Pillars</h2>
            <p className="text-lg text-muted-foreground">
              Explore transformative themes shaping the AI-first enterprise
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-accent">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">AI Imperatives</h3>
                <p className="text-muted-foreground">
                  Deep dives on Agentic AI, robust AI Governance Platforms, and transforming operational costs into innovation opportunities.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">New Computing Frontiers</h3>
                <p className="text-muted-foreground">
                  Quantum computing, edge AI, and next-generation infrastructure powering intelligent systems.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-gold">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">The Reinvented Enterprise</h3>
                <p className="text-muted-foreground">
                  Building adaptive, purpose-led organizations fit for constant change and digital transformation.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">Talent & Innovation</h3>
                <p className="text-muted-foreground">
                  Future-ready workforce development, digital skills training, and fostering innovation ecosystems.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Shape India's Intelligent Future?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join CXOs, innovators, and thought leaders at Asia's largest technology leadership gathering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registration">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Register Now
              </Button>
            </Link>
            <Link to="/program">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
                Explore Program
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
