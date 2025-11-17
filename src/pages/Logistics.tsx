import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Hotel, Train, Calendar } from "lucide-react";

const Logistics = () => {
  const cities = [
    { name: "Mumbai", dates: "Nov 5-7", venue: "Jio World Convention Centre", hotels: "Multiple 5-star options nearby" },
    { name: "Bengaluru", dates: "Nov 8-9", venue: "Bangalore International Exhibition Centre", hotels: "Tech Park area accommodations" },
    { name: "Delhi NCR", dates: "Nov 10-12", venue: "India Expo Centre & Mart", hotels: "Aerocity & CBD options" },
    { name: "Hyderabad", dates: "Nov 13-15", venue: "HICC Novotel", hotels: "HITEC City accommodations" },
    { name: "Chennai", dates: "Nov 16-17", venue: "Chennai Trade Centre", hotels: "City center & OMR options" },
    { name: "Pune", dates: "Nov 18-19", venue: "Auto Cluster Exhibition Centre", hotels: "Hinjewadi & Viman Nagar" },
    { name: "Kolkata", dates: "Nov 20-21", venue: "Biswa Bangla Convention Centre", hotels: "New Town & Park Street" },
    { name: "Ahmedabad", dates: "Nov 22-23", venue: "The Grand Bhagwati", hotels: "SG Highway corridor" },
    { name: "Kochi", dates: "Nov 24", venue: "Le Méridien", hotels: "Marine Drive & Kakkanad" },
    { name: "Jaipur", dates: "Nov 25", venue: "Jaipur Exhibition & Convention Centre", hotels: "Multiple heritage properties" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Event Logistics
            </h1>
            <p className="text-xl opacity-90">
              Your comprehensive guide to venues, travel, and accommodations across 10 cities
            </p>
          </div>
        </div>
      </section>

      {/* City Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">10 Dynamic Cities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {cities.map((city, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{city.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{city.dates}</span>
                      </div>
                    </div>
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Venue
                    </h4>
                    <p className="text-sm text-muted-foreground">{city.venue}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1 flex items-center gap-2">
                      <Hotel className="h-4 w-4" />
                      Accommodation
                    </h4>
                    <p className="text-sm text-muted-foreground">{city.hotels}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">View City Guide</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Information */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Travel & Transportation</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Train className="h-10 w-10 mb-3 text-primary" />
                  <CardTitle>Airport Transfers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Complimentary shuttle services available from major airports to event venues for Deluxe Pass holders.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <MapPin className="h-10 w-10 mb-3 text-accent" />
                  <CardTitle>Local Transport</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Dedicated event shuttles between partner hotels and venues. Cab service partnerships for convenient travel.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Hotel className="h-10 w-10 mb-3 text-gold" />
                  <CardTitle>Hotel Partnerships</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Special discounted rates at 50+ partner hotels across all event cities. Book through our portal.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visa Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  International attendees can request official invitation letters for visa applications. We provide comprehensive support for business visa processing and can expedite requests when needed.
                </p>
                <Button variant="outline">Request Invitation Letter</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  All venues are wheelchair accessible with dedicated facilities. We provide sign language interpretation, assistive listening devices, and accessible transportation upon request.
                </p>
                <Button variant="outline">Request Accessibility Support</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General FAQs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">What are the event hours?</h4>
                  <p className="text-sm text-muted-foreground">Daily from 9:00 AM to 6:00 PM, with select evening networking events until 9:00 PM.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Is food provided?</h4>
                  <p className="text-sm text-muted-foreground">Yes, lunch and refreshments are included for all pass holders. Special dietary requirements can be accommodated.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">What is the dress code?</h4>
                  <p className="text-sm text-muted-foreground">Business professional attire is recommended for all sessions and networking events.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Logistics;
