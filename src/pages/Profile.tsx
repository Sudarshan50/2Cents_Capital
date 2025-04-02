
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ChevronRight } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button 
            onClick={handleLogout}
            variant="destructive"
          >
            Logout
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Account</p>
                <p className="font-medium">{user.account || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                <span>Account Settings</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                <span>Notifications</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                <span>Security</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                <span>Preferences</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                <span>API Access</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center">
                <span>Help Center</span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
