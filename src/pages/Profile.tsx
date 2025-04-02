
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { User, Bell, Lock, CreditCard, Calendar, Settings } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-16 pb-8">
        <div className="container mx-auto px-4">
          <header className="mb-6 mt-8">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-500">Manage your account settings and preferences</p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - User profile */}
            <div className="lg:col-span-1">
              <Card className="shadow-sm border-gray-100">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">User Profile</CardTitle>
                  <Button variant="outline" size="sm" className="text-xs">
                    Edit
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center pt-4 pb-6">
                    <div className="w-24 h-24 rounded-full bg-quant-yellow flex items-center justify-center mb-4">
                      <span className="text-quant-navy font-bold text-3xl">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">{user?.name || 'User'}</h3>
                    <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Account ID</h4>
                      <p className="font-medium">{user?.account || 'PRO-12345'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Account Type</h4>
                      <p className="font-medium">Professional</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Member Since</h4>
                      <p className="font-medium">June 2023</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right column - Settings */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm border-gray-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-6">
                    <li className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Personal Information</h4>
                        <p className="text-sm text-gray-500">Manage your personal details and contact information</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </li>
                    
                    <li className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4">
                        <Bell className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Notifications</h4>
                        <p className="text-sm text-gray-500">Configure your notification preferences</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </li>
                    
                    <li className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                        <Lock className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Security</h4>
                        <p className="text-sm text-gray-500">Manage your password and two-factor authentication</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </li>
                    
                    <li className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                        <CreditCard className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Billing</h4>
                        <p className="text-sm text-gray-500">Manage your billing information and payment methods</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </li>
                    
                    <li className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                        <Calendar className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Preferences</h4>
                        <p className="text-sm text-gray-500">Configure your dashboard layout and preferences</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </li>
                    
                    <li className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                        <Settings className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">Advanced Settings</h4>
                        <p className="text-sm text-gray-500">Configure advanced settings and integrations</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
