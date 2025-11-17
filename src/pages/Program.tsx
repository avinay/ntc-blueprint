import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock } from "lucide-react";

const Program = () => {
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedTrack, setSelectedTrack] = useState("all");

  const cities = [
    "Mumbai", "Bengaluru", "Delhi NCR", "Hyderabad", "Chennai",
    "Pune", "Kolkata", "Ahmedabad", "Kochi", "Jaipur"
  ];

  const tracks = [
    { id: "ai-imperatives", name: "AI Imperatives", color: "bg-accent" },
    { id: "computing-frontiers", name: "New Computing Frontiers", color: "bg-primary" },
    { id: "reinvented-enterprise", name: "The Reinvented Enterprise", color: "bg-gold" },
    { id: "talent-innovation", name: "Talent & Innovation", color: "bg-secondary" }
  ];

  const sessions = [
    {
      id: 1,
      title: "Keynote: The AI-First Enterprise Imperative",
      speaker: "Dr. Priya Sharma",
      role: "Chief AI Officer, TechCorp Global",
      date: "Nov 5, 2025",
      time: "09:00 - 10:30",
      city: "Mumbai",
      track: "ai-imperatives",
      type: "Keynote"
    },
    {
      id: 2,
      title: "Workshop: Implementing Agentic AI Systems",
      speaker: "Rajesh Kumar",
      role: "VP Engineering, AI Solutions Inc",
      date: "Nov 6, 2025",
      time: "14:00 - 17:00",
      city: "Mumbai",
      track: "ai-imperatives",
      type: "Workshop"
    },
    {
      id: 3,
      title: "Panel: Quantum Computing for Enterprise",
      speaker: "Multiple Speakers",
      role: "Industry Leaders",
      date: "Nov 8, 2025",
      time: "11:00 - 12:30",
      city: "Bengaluru",
      track: "computing-frontiers",
      type: "Panel"
    },
    {
      id: 4,
      title: "Fireside Chat: Building Adaptive Organizations",
      speaker: "Anita Desai",
      role: "CEO, Enterprise Transformation Ltd",
      date: "Nov 12, 2025",
      time: "15:00 - 16:00",
      city: "Delhi NCR",
      track: "reinvented-enterprise",
      type: "Fireside Chat"
    },
    {
      id: 5,
      title: "Tech Pathshala: Digital Skills for the AI Era",
      speaker: "Vikram Singh",
      role: "Director of Learning, SkillsHub",
      date: "Nov 15, 2025",
      time: "10:00 - 13:00",
      city: "Hyderabad",
      track: "talent-innovation",
      type: "Tech Pathshala"
    }
  ];

  const filteredSessions = sessions.filter(session => {
    if (selectedCity !== "all" && session.city !== selectedCity) return false;
    if (selectedTrack !== "all" && session.track !== selectedTrack) return false;
    return true;
  });

  const getTrackColor = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    return track?.color || "bg-muted";
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Conference Program
            </h1>
            <p className="text-xl opacity-90">
              21 days of innovation across 10 dynamic cities
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-muted/30 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="flex-1">
              <label htmlFor="city-filter" className="block text-sm font-medium mb-2">
                Filter by City
              </label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger id="city-filter">
                  <SelectValue placeholder="All Cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cities</SelectItem>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label htmlFor="track-filter" className="block text-sm font-medium mb-2">
                Filter by Track
              </label>
              <Select value={selectedTrack} onValueChange={setSelectedTrack}>
                <SelectTrigger id="track-filter">
                  <SelectValue placeholder="All Tracks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tracks</SelectItem>
                  {tracks.map(track => (
                    <SelectItem key={track.id} value={track.id}>{track.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Track Legend */}
      <section className="py-6 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {tracks.map(track => (
              <div key={track.id} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded ${track.color}`} />
                <span className="text-sm">{track.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sessions List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-4">
            {filteredSessions.length > 0 ? (
              filteredSessions.map(session => (
                <Card key={session.id} className={`border-l-4 ${getTrackColor(session.track)}`}>
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary">{session.type}</Badge>
                      <Badge variant="outline">{session.city}</Badge>
                    </div>
                    <CardTitle className="text-xl">{session.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold">{session.speaker}</p>
                        <p className="text-sm text-muted-foreground">{session.role}</p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{session.city}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No sessions found matching your filters.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSelectedCity("all");
                      setSelectedTrack("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Program;
