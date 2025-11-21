/**
 * Networking Mini-App Utility Functions
 * Handles localStorage operations, profile management, and business logic
 */

import { Profile, NetworkingStats } from './networkingTypes';

// LocalStorage keys
const MY_PROFILE_KEY = 'ntc-my-profile';
const CONTACTS_KEY = 'ntc-contacts';

/**
 * Generate a simple UUID v4
 */
export const generateId = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Get my profile from localStorage
 */
export const getMyProfile = (): Profile | null => {
  try {
    const data = localStorage.getItem(MY_PROFILE_KEY);
    if (!data) return null;
    return JSON.parse(data) as Profile;
  } catch (error) {
    console.error('Error reading my profile:', error);
    return null;
  }
};

/**
 * Save my profile to localStorage
 */
export const saveMyProfile = (profile: Profile): boolean => {
  try {
    localStorage.setItem(MY_PROFILE_KEY, JSON.stringify(profile));
    return true;
  } catch (error) {
    console.error('Error saving my profile:', error);
    return false;
  }
};

/**
 * Delete my profile from localStorage
 */
export const deleteMyProfile = (): boolean => {
  try {
    localStorage.removeItem(MY_PROFILE_KEY);
    return true;
  } catch (error) {
    console.error('Error deleting my profile:', error);
    return false;
  }
};

/**
 * Get all contacts from localStorage
 */
export const getContacts = (): Profile[] => {
  try {
    const data = localStorage.getItem(CONTACTS_KEY);
    if (!data) return [];
    return JSON.parse(data) as Profile[];
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
};

/**
 * Save a new contact to localStorage
 */
export const saveContact = (contact: Profile): boolean => {
  try {
    const contacts = getContacts();
    
    // Check if contact already exists (by email)
    const exists = contacts.some(c => c.email.toLowerCase() === contact.email.toLowerCase());
    if (exists) {
      throw new Error('Contact with this email already exists');
    }
    
    contacts.push(contact);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    return true;
  } catch (error) {
    console.error('Error saving contact:', error);
    throw error;
  }
};

/**
 * Delete a contact by ID
 */
export const deleteContact = (contactId: string): boolean => {
  try {
    const contacts = getContacts();
    const filtered = contacts.filter(c => c.id !== contactId);
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting contact:', error);
    return false;
  }
};

/**
 * Update an existing contact
 */
export const updateContact = (contactId: string, updatedData: Partial<Profile>): boolean => {
  try {
    const contacts = getContacts();
    const index = contacts.findIndex(c => c.id === contactId);
    
    if (index === -1) {
      throw new Error('Contact not found');
    }
    
    contacts[index] = { ...contacts[index], ...updatedData };
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
    return true;
  } catch (error) {
    console.error('Error updating contact:', error);
    return false;
  }
};

/**
 * Get networking statistics
 */
export const getNetworkingStats = (): NetworkingStats => {
  const contacts = getContacts();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentScans = contacts.filter(c => {
    if (!c.scannedAt) return false;
    return new Date(c.scannedAt) >= sevenDaysAgo;
  }).length;
  
  const uniqueCompanies = new Set(contacts.map(c => c.company.toLowerCase())).size;
  
  return {
    totalContacts: contacts.length,
    recentScans,
    companiesRepresented: uniqueCompanies,
  };
};

/**
 * Validate profile data from QR code
 */
export const validateProfileData = (data: any): Profile => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid profile data');
  }
  
  const requiredFields = ['id', 'name', 'role', 'company', 'phone', 'email', 'createdAt'];
  for (const field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    throw new Error('Invalid email format');
  }
  
  return data as Profile;
};

/**
 * Export contacts as JSON
 */
export const exportContactsAsJSON = (): string => {
  const contacts = getContacts();
  return JSON.stringify(contacts, null, 2);
};

/**
 * Export contact as vCard format
 */
export const exportContactAsVCard = (contact: Profile): string => {
  return `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
TEL:${contact.phone}
EMAIL:${contact.email}
ORG:${contact.company}
TITLE:${contact.role}
END:VCARD`;
};

/**
 * Search contacts by name, company, or role
 */
export const searchContacts = (query: string): Profile[] => {
  if (!query.trim()) return getContacts();
  
  const contacts = getContacts();
  const lowerQuery = query.toLowerCase();
  
  return contacts.filter(c => 
    c.name.toLowerCase().includes(lowerQuery) ||
    c.company.toLowerCase().includes(lowerQuery) ||
    c.role.toLowerCase().includes(lowerQuery) ||
    c.email.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Sort contacts by various criteria
 */
export const sortContacts = (contacts: Profile[], sortBy: 'name' | 'company' | 'date'): Profile[] => {
  const sorted = [...contacts];
  
  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'company':
      return sorted.sort((a, b) => a.company.localeCompare(b.company));
    case 'date':
      return sorted.sort((a, b) => {
        const dateA = new Date(a.scannedAt || a.createdAt);
        const dateB = new Date(b.scannedAt || b.createdAt);
        return dateB.getTime() - dateA.getTime(); // Most recent first
      });
    default:
      return sorted;
  }
};

