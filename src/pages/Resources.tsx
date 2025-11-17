import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Newspaper, BookOpen, Download } from "lucide-react";

const Resources = () => {
  const reports = [
    {
      title: "Strategic Review 2025: AI in Indian Enterprises",
      description: "Comprehensive analysis of AI adoption trends and strategic imperatives for CXOs",
      date: "September 2025",
      type: "Research Report"
    },
    {
      title: "The AI Governance Framework",
      description: "Best practices for implementing robust AI governance and compliance systems",
      date: "August 2025",
      type: "White Paper"
    },
    {
      title: "Tech Industry Outlook 2025-26",
      description: "Market insights, growth projections, and emerging technology trends",
      date: "July 2025",
      type: "Industry Report"
    }
  ];

  const news = [
    {
      title: "NTC 2025 Announces Keynote Speakers",
      date: "October 10, 2025",
      excerpt: "Global technology leaders confirmed for flagship sessions across 10 cities..."
    },
    {
      title: "Partnership with Leading AI Research Labs",
      date: "October 5, 2025",
      excerpt: "Exclusive R&D demonstrations and innovation showcases announced..."
    },
    {
      title: "Early Bird Registration Extended",
      date: "September 28, 2025",
      excerpt: "Due to popular demand, early bird pricing extended through October 15..."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Resources & Publications
            </h1>
            <p className="text-xl opacity-90">
              Access insights, reports, and news from NASSCOM
            </p>
          </div>
        </div>
      </section>

      {/* NASSCOM Reports */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">NASSCOM Reports</h2>
            </div>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{report.title}</CardTitle>
                        <CardDescription className="text-base">{report.description}</CardDescription>
                      </div>
                      <div className="text-sm text-muted-foreground whitespace-nowrap">
                        <div className="font-semibold">{report.type}</div>
                        <div>{report.date}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News & Press Releases */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Newspaper className="h-8 w-8 text-accent" />
              <h2 className="text-3xl font-bold">Latest News</h2>
            </div>
            <div className="space-y-4">
              {news.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="text-sm text-muted-foreground mb-2">{item.date}</div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                    <Button variant="link" className="px-0">Read More →</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">View All News</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Media Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <BookOpen className="h-8 w-8 text-gold" />
              <h2 className="text-3xl font-bold">Media & Press Resources</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media Kit</CardTitle>
                  <CardDescription>
                    Logos, brand guidelines, and event imagery for media use
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Download Media Kit</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Press Contact</CardTitle>
                  <CardDescription>
                    For media inquiries, interviews, and press accreditation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>Email: press@nasscom.in</p>
                    <p>Phone: +91 11 4051 1050</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Speaker Bios & Photos</CardTitle>
                  <CardDescription>
                    High-resolution images and detailed speaker profiles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Access Speaker Resources</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Fact Sheet</CardTitle>
                  <CardDescription>
                    Key statistics, dates, and essential event information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Download Fact Sheet</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Subscribe to our newsletter for the latest updates, speaker announcements, and exclusive insights.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Subscribe to Newsletter
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Resources;
