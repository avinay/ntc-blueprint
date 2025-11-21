/**
 * ContactList Page
 * Displays all saved contacts with search and filter
 * Allows export and deletion of contacts
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Search, Download, Users, Trash2 } from 'lucide-react';
import { getContacts, deleteContact, sortContacts, searchContacts, exportContactsAsJSON } from '@/lib/networking';
import { Profile } from '@/lib/networkingTypes';
import ProfileCard from '@/components/networking/ProfileCard';
import EmptyState from '@/components/networking/EmptyState';
import { toast } from 'sonner';

const ContactList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Profile[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'company' | 'date'>('date');

  // Load contacts on mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Apply search and sort when query or sort changes
  useEffect(() => {
    let result = searchQuery ? searchContacts(searchQuery) : contacts;
    result = sortContacts(result, sortBy);
    setFilteredContacts(result);
  }, [contacts, searchQuery, sortBy]);

  const loadContacts = () => {
    const allContacts = getContacts();
    setContacts(allContacts);
  };

  const handleDelete = (contactId: string) => {
    const success = deleteContact(contactId);
    if (success) {
      toast.success('Contact deleted successfully');
      loadContacts();
    } else {
      toast.error('Failed to delete contact');
    }
  };

  const handleExportJSON = () => {
    try {
      const json = exportContactsAsJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ntc-contacts-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Contacts exported successfully! 📥');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export contacts');
    }
  };

  const handleDeleteAll = () => {
    localStorage.removeItem('ntc-contacts');
    setContacts([]);
    toast.success('All contacts deleted');
  };

  if (contacts.length === 0) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/networking')}
                className="mb-6"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Hub
              </Button>
              <EmptyState
                icon={Users}
                title="No Contacts Yet"
                description="Start networking by scanning QR codes at the event! Your contacts will appear here."
                actionLabel="Scan QR Code"
                onAction={() => navigate('/networking/scan')}
                iconColor="text-accent"
              />
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/networking')}
              className="mb-4 text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Hub
            </Button>
            <div className="text-center">
              <h1 className="text-3xl lg:text-5xl font-black mb-4">
                My Contacts 📇
              </h1>
              <p className="text-lg opacity-90">
                {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'} collected
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-8 border-b bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, company, role, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Most Recent</SelectItem>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="company">Company (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleExportJSON}
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Export as JSON
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete All Contacts
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete All Contacts?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all {contacts.length} contacts from your list. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAll} className="bg-destructive hover:bg-destructive/90">
                      Delete All
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            {/* Results Count */}
            {searchQuery && (
              <p className="text-sm text-muted-foreground">
                Found {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Contacts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {filteredContacts.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No Contacts Found"
                description={`No contacts match "${searchQuery}". Try a different search term.`}
                iconColor="text-muted-foreground"
              />
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredContacts.map((contact) => (
                  <ProfileCard
                    key={contact.id}
                    profile={contact}
                    onDelete={handleDelete}
                    showActions={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactList;

