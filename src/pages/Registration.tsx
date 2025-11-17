import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Registration = () => {
  const tiers = [
    {
      name: "Deluxe Conference Pass",
      memberPrice: "₹75,000",
      nonMemberPrice: "₹95,000",
      description: "Recommended for executives and those seeking maximum immersion",
      features: [
        "Full access to all 21 days of conference tracks",
        "All Keynote sessions",
        "Interactive Workshops",
        "Networking Events",
        "Exhibits Plus Hall access",
        "Tech Pathshala virtual platform",
        "Conference materials and recordings"
      ],
      highlighted: true
    },
    {
      name: "Exhibits Plus Pass",
      memberPrice: "₹35,000",
      nonMemberPrice: "₹45,000",
      description: "Ideal for focused networking and exploration",
      features: [
        "Access to Exhibits Hall",
        "All Keynote sessions",
        "Selected sponsor tracks (limited seats)",
        "Networking events access",
        "Innovation showcase visits",
        "First-come, first-served seating"
      ],
      highlighted: false
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Registration & Pricing
            </h1>
            <p className="text-xl opacity-90">
              Secure your seat at India's largest technology leadership gathering
            </p>
          </div>
        </div>
      </section>

      {/* Early Bird Alert */}
      <section className="py-6 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold">
            🎯 Early Bird Discount Available! Register before October 15, 2025 and save 15%
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tiers.map((tier) => (
                <Card 
                  key={tier.name} 
                  className={tier.highlighted ? "border-primary border-2 shadow-lg" : ""}
                >
                  {tier.highlighted && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                      RECOMMENDED
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-base">{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{tier.memberPrice}</span>
                        <span className="text-muted-foreground">NASSCOM Member</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{tier.nonMemberPrice}</span>
                        <span className="text-muted-foreground">Non-Member</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={tier.highlighted ? "w-full bg-gradient-hero" : "w-full"}
                      size="lg"
                    >
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Group Registration */}
            <Card className="mt-8 bg-muted/50">
              <CardHeader>
                <CardTitle>Group Registration</CardTitle>
                <CardDescription>
                  Planning to bring your team? We offer customized corporate packages with special discounts for groups.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="lg">Request Group Quote</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms & Policies */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold mb-6">Registration Policies</h2>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cancellation & Refund Policy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Full refund for cancellations made 30+ days before the event</p>
                <p>• 50% refund for cancellations made 15-29 days before the event</p>
                <p>• No refund for cancellations made less than 15 days before the event</p>
                <p>• All refunds are subject to a 5% processing fee</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Transfer Policy</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>Registrations may be transferred to another attendee from the same organization up to 7 days before the event. Please contact our registration team for assistance.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Important Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• All prices are in Indian Rupees (INR) and include applicable taxes</p>
                <p>• Registration confirmation will be sent via email within 24 hours</p>
                <p>• Photo ID is required for event entry</p>
                <p>• Session seats are subject to availability and first-come, first-served</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Registration;
