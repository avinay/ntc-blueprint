import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Users, Sparkles } from "lucide-react";

const Overview = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Why Attend NTC 2025
            </h1>
            <p className="text-xl opacity-90">
              The definitive platform for AI-first transformation
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Imperative */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              The Strategic Imperative: Why NTC 2025 is Essential for CXOs
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The digital to AI-first transformation is accelerating, with enterprises planning the highest jump in AI allocation for CY2025. NTC 2025 provides CXOs and business leaders with the strategic roadmaps to successfully pivot their operations. Expect deep dives on Agentic AI, robust AI Governance Platforms, and insights on transforming operational costs into opportunities for innovation. Learn how to build an adaptive, purpose-led organization fit for constant change.
            </p>
          </div>
        </div>
      </section>

      {/* Value Propositions by Persona */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Value for Every Stakeholder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <Card>
              <CardHeader>
                <TrendingUp className="h-10 w-10 mb-3 text-primary" />
                <CardTitle>CXO Leaders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Strategic roadmaps for AI-first transformation, governance frameworks, and operational excellence insights from global industry pioneers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Sparkles className="h-10 w-10 mb-3 text-accent" />
                <CardTitle>Innovators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access to cutting-edge research, innovation showcases, startup connects, and hands-on exploration of emerging technologies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 mb-3 text-gold" />
                <CardTitle>Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Unparalleled networking opportunities, partnership development, and visibility across 10 cities with India's tech leadership.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Target className="h-10 w-10 mb-3 text-secondary" />
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Exclusive access to thought leaders, breaking announcements, comprehensive press resources, and story opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Innovation Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Innovation Showcase</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Innovation Displays</h3>
                  <p className="text-muted-foreground">
                    Explore hands-on demonstrations of breakthrough technologies, AI solutions, and next-generation platforms from leading innovators and research institutions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Start-up Connects</h3>
                  <p className="text-muted-foreground">
                    Engage with India's most promising tech startups, discover partnership opportunities, and witness the future of enterprise innovation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">R&D Labs</h3>
                  <p className="text-muted-foreground">
                    Visit interactive research and development labs showcasing experimental technologies, quantum computing advancements, and AI research breakthroughs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Overview;
