/**
 * ProfileCard Component
 * Displays a contact's profile information in a card format
 * Matches the existing design system with gradient borders and hover effects
 */

import { Profile } from "@/lib/networkingTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Building2, Briefcase, Trash2, Calendar } from "lucide-react";

interface ProfileCardProps {
  profile: Profile;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  variant?: 'default' | 'compact';
}

const ProfileCard = ({ profile, onDelete, showActions = true, variant = 'default' }: ProfileCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-all border-l-4 border-l-primary">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <h3 className="font-bold text-lg">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.role}</p>
              <p className="text-sm font-medium text-primary">{profile.company}</p>
            </div>
            {showActions && onDelete && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onDelete(profile.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all border-l-4 border-l-accent bg-gradient-to-br from-accent/5 to-transparent">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-2xl">{profile.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {profile.scannedAt && (
                <>
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Connected on {formatDate(profile.scannedAt)}
                </>
              )}
            </p>
          </div>
          {showActions && onDelete && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => onDelete(profile.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-3 text-foreground">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium">{profile.role}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-foreground">
          <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
            <Building2 className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Company</p>
            <p className="font-medium">{profile.company}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-foreground">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <Mail className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground">Email</p>
            <a 
              href={`mailto:${profile.email}`}
              className="font-medium hover:text-accent transition-colors truncate block"
            >
              {profile.email}
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-foreground">
          <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
            <Phone className="h-5 w-5 text-gold" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <a 
              href={`tel:${profile.phone}`}
              className="font-medium hover:text-gold transition-colors"
            >
              {profile.phone}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;

