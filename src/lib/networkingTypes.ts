/**
 * TypeScript interfaces for the Networking Mini-App
 * Defines the data structures for profiles and contacts
 */

export interface Profile {
  id: string;              // Unique identifier (UUID)
  name: string;            // Full name
  role: string;            // Job title/role
  company: string;         // Company/organization name
  phone: string;           // Phone number
  email: string;           // Email address
  createdAt: string;       // ISO date string when profile was created
  scannedAt?: string;      // ISO date string when profile was scanned (for imported contacts)
}

export interface NetworkingStats {
  totalContacts: number;
  recentScans: number;      // Last 7 days
  companiesRepresented: number;
}

// Form validation schema types
export interface ProfileFormData {
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
}

