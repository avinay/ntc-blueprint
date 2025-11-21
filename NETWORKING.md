# 🤝 Networking Mini-App Documentation

## Overview

The Networking Mini-App is a smart contact exchange system integrated into the NASSCOM NTC 2025 event website. It allows attendees to create digital profiles, generate QR codes, and scan others' QR codes to instantly exchange contact information.

## Features

### ✨ Core Features

1. **Profile Creation**
   - Create and edit personal networking profile
   - Store locally in browser (no server required)
   - Fields: Name, Role, Company, Phone, Email
   - Full form validation with error messages

2. **QR Code Generation**
   - Automatic QR code generation from profile
   - Downloadable as PNG image
   - Share functionality (native mobile sharing)
   - High error correction level for reliability

3. **QR Code Scanning**
   - **Camera Scanning**: Real-time camera access for live scanning
   - **Upload Fallback**: Upload QR code image if camera unavailable
   - Mobile-optimized with excellent browser support
   - Works on iOS Safari, Chrome, Firefox, Edge

4. **Contact Management**
   - View all scanned contacts in a list
   - Search by name, company, role, or email
   - Sort by name, company, or date
   - Export contacts as JSON
   - Delete individual contacts or all at once

5. **Statistics Dashboard**
   - Total contacts count
   - Recent scans (last 7 days)
   - Companies represented

## Technical Stack

### Dependencies
- **qrcode.react**: QR code generation
- **html5-qrcode**: QR code scanning with camera support
- **React 18**: UI framework
- **TypeScript**: Type safety
- **React Hook Form + Zod**: Form validation
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components
- **LocalStorage**: Data persistence

### Architecture

```
/src/
├── lib/
│   ├── networkingTypes.ts      # TypeScript interfaces
│   └── networking.ts            # Business logic & localStorage utils
├── components/networking/
│   ├── ProfileCard.tsx          # Contact card display
│   ├── QRCodeDisplay.tsx        # QR code generator
│   ├── QRScanner.tsx            # Camera/upload scanner
│   └── EmptyState.tsx           # Empty state displays
└── pages/
    ├── Networking.tsx           # Main hub/dashboard
    └── networking/
        ├── CreateProfile.tsx    # Profile creation form
        ├── MyProfile.tsx        # View/edit profile + QR
        ├── ScanProfile.tsx      # QR scanning page
        └── ContactList.tsx      # Contact management
```

## Data Structure

### Profile Interface
```typescript
interface Profile {
  id: string;              // UUID v4
  name: string;            // Full name
  role: string;            // Job title
  company: string;         // Company name
  phone: string;           // Phone number
  email: string;           // Email address
  createdAt: string;       // ISO date string
  scannedAt?: string;      // ISO date (for contacts)
}
```

### LocalStorage Keys
- `ntc-my-profile`: User's personal profile (Profile object)
- `ntc-contacts`: Array of scanned contacts (Profile[])

## Mobile Compatibility

### Camera Access
- **iOS Safari**: Works with user permission
- **Chrome Mobile**: Full support
- **Firefox Mobile**: Full support
- **Edge Mobile**: Full support

### Fallback Support
- Upload QR code image if camera unavailable
- Responsive design for all screen sizes
- Touch-friendly buttons (44px minimum)
- Mobile-first layout

### Camera Permissions
1. Browser will prompt for camera access
2. User must grant permission
3. If denied, upload option is available
4. Instructions provided in UI

## User Flow

### First-Time User
1. Visit `/networking`
2. Click "Create Profile"
3. Fill in personal information
4. Profile saved to localStorage
5. QR code automatically generated
6. Share QR code with others

### Scanning Contacts
1. Visit `/networking/scan`
2. Click "Scan with Camera"
3. Grant camera permissions
4. Point camera at QR code
5. Profile parsed and displayed
6. Save to contacts
7. View in contact list

### Managing Contacts
1. Visit `/networking/contacts`
2. Search/filter contacts
3. Sort by name, company, or date
4. Export as JSON
5. Delete individual or all contacts

## Design System Integration

The networking app fully integrates with the existing NASSCOM NTC 2025 design system:

- **Colors**: Primary (purple), Secondary (blue), Accent (cyan), Gold (orange)
- **Gradients**: `bg-gradient-hero`, `bg-gradient-accent`, `bg-gradient-gold`
- **Typography**: Bold headlines, energetic style
- **Components**: shadcn/ui Card, Button, Input, etc.
- **Layout**: Consistent with existing pages

## Deployment

### Vercel Deployment
```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

### Configuration
- `vercel.json` included for SPA routing
- All routes redirect to index.html
- Static assets cached
- Optimized for performance

### Environment Variables
None required! All data stored locally in browser.

## Browser Storage

### Data Persistence
- Uses `localStorage` for all data
- No server-side storage
- Data persists across sessions
- User can clear data anytime

### Privacy
- No data sent to servers
- QR code sharing is peer-to-peer
- User has full control over data
- GDPR compliant (local storage only)

## Security Considerations

1. **Data Validation**
   - Email format validation
   - Phone number format validation
   - Required field validation
   - QR code data validation

2. **Error Handling**
   - Try-catch blocks for all localStorage operations
   - User-friendly error messages
   - Graceful fallbacks

3. **XSS Protection**
   - All user inputs sanitized
   - React's built-in XSS protection
   - No dangerouslySetInnerHTML used

## Testing

### Manual Testing Checklist
- [ ] Create profile with valid data
- [ ] Edit existing profile
- [ ] Generate QR code
- [ ] Download QR code
- [ ] Scan QR code with camera
- [ ] Upload QR code image
- [ ] Save contact to list
- [ ] Search contacts
- [ ] Sort contacts
- [ ] Export contacts as JSON
- [ ] Delete individual contact
- [ ] Delete all contacts
- [ ] Test on mobile (iOS/Android)
- [ ] Test camera permissions

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ iOS Safari 14+
- ✅ Chrome Mobile
- ✅ Firefox Mobile

## Troubleshooting

### Camera Not Working
1. Check browser permissions
2. Use HTTPS (required for camera)
3. Try upload fallback
4. Check console for errors

### QR Code Not Scanning
1. Ensure good lighting
2. Hold camera steady
3. QR code should fill frame
4. Try upload option

### Data Not Saving
1. Check localStorage enabled
2. Clear browser cache
3. Check console for errors
4. Try incognito mode

## Future Enhancements

### Potential Features
- Export contacts as vCard
- Bulk QR code scanning
- Contact groups/tags
- Share multiple profiles
- Dark mode support
- PWA offline support
- Analytics dashboard
- Contact notes
- Follow-up reminders
- LinkedIn integration

## Support

For issues or questions:
1. Check console for errors
2. Review this documentation
3. Test in different browser
4. Contact development team

---

**Built with ❤️ for NASSCOM NTC 2025**

