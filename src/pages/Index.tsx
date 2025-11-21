import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Users, Briefcase, Gift, Sparkles, Zap, Network } from "lucide-react";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAzMGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNNiAzMGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnpNNTQgMzBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="container mx-auto px-4 py-20 lg:py-28 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Nov 5-25 • 10 Cities
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
              Tech's Biggest<br />Party is Here! 🎉
            </h1>
            <p className="text-xl lg:text-3xl font-bold">
              Network. Demo. Freebie Hunt.
            </p>
            <p className="text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
              Join 10,000+ young professionals for India's most exciting tech event. Real connections, mind-blowing demos, and swag that's actually worth it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground text-lg px-8 font-bold shadow-xl">
                Grab Your Pass Now
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-lg px-8 backdrop-blur-sm">
                See What's Inside
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why You'll Love It */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-center mb-12">Why You'll Love NTC 2025</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Network className="h-8 w-8 text-primary" />
                </div>
                <div className="text-4xl font-black text-primary mb-2">10,000+</div>
                <div className="text-lg font-bold mb-2">People to Meet</div>
                <div className="text-sm text-muted-foreground">Real connections, not just LinkedIn adds</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-secondary/10 to-accent/10 border-2 border-secondary/20 hover:border-secondary/40 transition-all hover:scale-105">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <div className="text-4xl font-black text-secondary mb-2">100+</div>
                <div className="text-lg font-bold mb-2">Live Demos</div>
                <div className="text-sm text-muted-foreground">AI, robots, VR - touch everything!</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-accent/10 to-gold/10 border-2 border-accent/20 hover:border-accent/40 transition-all hover:scale-105">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                  <Gift className="h-8 w-8 text-accent" />
                </div>
                <div className="text-4xl font-black text-accent mb-2">₹50K+</div>
                <div className="text-lg font-bold mb-2">Free Swag</div>
                <div className="text-sm text-muted-foreground">Gadgets, merch, and premium gear</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-gold/10 to-primary/10 border-2 border-gold/20 hover:border-gold/40 transition-all hover:scale-105">
              <CardContent className="pt-8 pb-6">
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-gold" />
                </div>
                <div className="text-4xl font-black text-gold mb-2">10</div>
                <div className="text-lg font-bold mb-2">Epic Cities</div>
                <div className="text-sm text-muted-foreground">Mumbai, Delhi, Bangalore & more</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">What's Happening? 🔥</h2>
            <p className="text-lg text-muted-foreground">
              Pick your vibe and dive in!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-accent bg-gradient-to-br from-accent/5 to-transparent hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <Sparkles className="h-10 w-10 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-3">AI & Tech Demos</h3>
                <p className="text-muted-foreground text-base">
                  Play with robots, try VR gear, test new AI tools. Hands-on is the only way.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-transparent hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Networking Zones</h3>
                <p className="text-muted-foreground text-base">
                  Speed networking, coffee meetups, after-parties. Find your future team or co-founder.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-gold bg-gradient-to-br from-gold/5 to-transparent hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <Gift className="h-10 w-10 text-gold mb-4" />
                <h3 className="text-2xl font-bold mb-3">Swag & Giveaways</h3>
                <p className="text-muted-foreground text-base">
                  From tech gadgets to branded merch. Sponsors are going all out this year!
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary bg-gradient-to-br from-secondary/5 to-transparent hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <Briefcase className="h-10 w-10 text-secondary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Career Boost</h3>
                <p className="text-muted-foreground text-base">
                  Workshops on sales tech, personal branding, and closing deals like a pro.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjMiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold mb-6">
            <Zap className="h-4 w-4" />
            Early Bird Ends Soon!
          </div>
          <h2 className="text-4xl lg:text-6xl font-black mb-6">
            Don't Miss Out! 🎯
          </h2>
          <p className="text-xl lg:text-2xl mb-4 max-w-2xl mx-auto font-bold">
            Limited spots. Massive value. Your network awaits.
          </p>
          <p className="text-lg mb-10 max-w-xl mx-auto opacity-90">
            Join thousands of young professionals making moves in tech.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/registration">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-10 font-black shadow-2xl">
                Get Your Pass Now
              </Button>
            </Link>
            <Link to="/program">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/30 text-lg px-10 backdrop-blur-sm font-bold">
                Explore Cities & Dates
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
