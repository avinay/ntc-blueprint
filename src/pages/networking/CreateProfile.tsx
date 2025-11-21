/**
 * CreateProfile Page
 * Form to create user's networking profile
 * Uses react-hook-form with zod validation
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UserPlus, Sparkles, AlertCircle } from 'lucide-react';
import { generateId, saveMyProfile, getMyProfile } from '@/lib/networking';
import { Profile } from '@/lib/networkingTypes';
import { toast } from 'sonner';

// Form validation schema
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  role: z.string().min(2, 'Role must be at least 2 characters').max(100, 'Role is too long'),
  company: z.string().min(2, 'Company name must be at least 2 characters').max(100, 'Company name is too long'),
  phone: z.string().regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format').min(10, 'Phone number is too short'),
  email: z.string().email('Invalid email address'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const CreateProfile = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const existingProfile = getMyProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: existingProfile ? {
      name: existingProfile.name,
      role: existingProfile.role,
      company: existingProfile.company,
      phone: existingProfile.phone,
      email: existingProfile.email,
    } : undefined,
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsSubmitting(true);

      const profile: Profile = {
        id: existingProfile?.id || generateId(),
        ...data,
        createdAt: existingProfile?.createdAt || new Date().toISOString(),
      };

      const success = saveMyProfile(profile);

      if (success) {
        toast.success(existingProfile ? 'Profile updated successfully! 🎉' : 'Profile created successfully! 🎉');
        navigate('/networking/my-profile');
      } else {
        throw new Error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to save profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
              <UserPlus className="h-4 w-4" />
              {existingProfile ? 'Update Profile' : 'New Profile'}
            </div>
            <h1 className="text-3xl lg:text-5xl font-black mb-4">
              {existingProfile ? 'Update Your Profile ✏️' : 'Create Your Profile 👤'}
            </h1>
            <p className="text-lg opacity-90">
              {existingProfile 
                ? 'Update your information to keep your QR code current'
                : 'Fill in your details to generate your networking QR code'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Personal Information</CardTitle>
                <CardDescription>
                  This information will be encoded in your QR code and shared when scanned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-semibold">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      {...register('name')}
                      placeholder="John Doe"
                      className={errors.name ? 'border-destructive' : ''}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Role Field */}
                  <div className="space-y-2">
                    <Label htmlFor="role" className="text-base font-semibold">
                      Role / Job Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="role"
                      {...register('role')}
                      placeholder="Senior Software Engineer"
                      className={errors.role ? 'border-destructive' : ''}
                    />
                    {errors.role && (
                      <p className="text-sm text-destructive">{errors.role.message}</p>
                    )}
                  </div>

                  {/* Company Field */}
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-base font-semibold">
                      Company / Organization <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="company"
                      {...register('company')}
                      placeholder="Tech Corp Inc."
                      className={errors.company ? 'border-destructive' : ''}
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive">{errors.company.message}</p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-semibold">
                      Phone Number <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="+91 98765 43210"
                      className={errors.phone ? 'border-destructive' : ''}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-semibold">
                      Email Address <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email')}
                      placeholder="john.doe@example.com"
                      className={errors.email ? 'border-destructive' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Info Alert */}
                  <Alert className="bg-accent/10 border-accent/20">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <AlertDescription>
                      Your information is stored locally on your device and never sent to any server. 
                      It's only shared when someone scans your QR code.
                    </AlertDescription>
                  </Alert>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="submit"
                      className="flex-1 bg-gradient-hero"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : existingProfile ? 'Update Profile' : 'Create Profile'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => navigate('/networking')}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>🔒 Your data is stored securely in your browser's local storage</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CreateProfile;

