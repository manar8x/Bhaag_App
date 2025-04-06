'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Camera, User, Bell, Moon, Sun, Shield } from 'lucide-react'
import ProtectedRoute from '@/components/protected-route'
import Image from 'next/image'

export default function ProfilePage() {
  const { user, updateProfile, changePassword, isLoading, error } = useAuth()
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    workoutReminders: true,
  })
  const [theme, setTheme] = useState('system')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateProfile({ name, email })
      setIsEditing(false)
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      // TODO: Add proper error handling
      return
    }
    try {
      await changePassword(oldPassword, newPassword)
      setIsChangingPassword(false)
      setOldPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      // Error is handled by the auth context
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      // TODO: Implement image upload to storage service
      // const photoURL = await uploadImage(file)
      // await updateProfile({ photoURL })
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <Tabs defaultValue="profile" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your profile information and photo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative group">
                        <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-primary/50 group-hover:border-primary transition-all duration-300">
                          {user?.photoURL ? (
                            <Image
                              src={user.photoURL}
                              alt="Profile"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-primary/10 flex items-center justify-center">
                              <User className="h-16 w-16 text-primary" />
                            </div>
                          )}
                        </div>
                        <button
                          onClick={handleImageClick}
                          className="absolute bottom-0 right-0 bg-primary/90 text-white p-2 rounded-full transform translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-all duration-300"
                        >
                          <Camera className="h-4 w-4" />
                        </button>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <p className="text-sm text-gray-400">Click to change photo</p>
                    </div>

                    <div className="flex-1">
                      {isEditing ? (
                        <form onSubmit={handleProfileUpdate} className="space-y-4">
                          <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              className="mt-1"
                            />
                          </div>

                          <div className="flex justify-end space-x-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsEditing(false)}
                              disabled={isLoading}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                              {isLoading ? 'Saving...' : 'Save Changes'}
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <Label>Full Name</Label>
                            <p className="mt-1">{user?.name}</p>
                          </div>

                          <div>
                            <Label>Email</Label>
                            <p className="mt-1">{user?.email}</p>
                            {!user?.isEmailVerified && (
                              <p className="text-yellow-500 text-sm mt-1">
                                Email not verified. Please check your inbox for verification link.
                              </p>
                            )}
                          </div>

                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              onClick={() => setIsEditing(true)}
                              disabled={isLoading}
                            >
                              Edit Profile
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <Switch />
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Change Password</h3>
                        {!isChangingPassword && (
                          <Button
                            variant="outline"
                            onClick={() => setIsChangingPassword(true)}
                            disabled={isLoading}
                          >
                            Change Password
                          </Button>
                        )}
                      </div>

                      {isChangingPassword ? (
                        <form onSubmit={handlePasswordChange} className="space-y-4">
                          <div>
                            <Label htmlFor="oldPassword">Current Password</Label>
                            <Input
                              id="oldPassword"
                              type="password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              required
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              required
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                              className="mt-1"
                            />
                          </div>

                          <div className="flex justify-end space-x-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setIsChangingPassword(false)}
                              disabled={isLoading}
                            >
                              Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                              {isLoading ? 'Changing...' : 'Change Password'}
                            </Button>
                          </div>
                        </form>
                      ) : (
                        <p className="text-gray-400">
                          For security reasons, you should change your password regularly.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notifications
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Email Notifications</Label>
                            <p className="text-sm text-gray-400">Receive updates via email</p>
                          </div>
                          <Switch
                            checked={notifications.email}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Push Notifications</Label>
                            <p className="text-sm text-gray-400">Receive push notifications</p>
                          </div>
                          <Switch
                            checked={notifications.push}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Workout Reminders</Label>
                            <p className="text-sm text-gray-400">Get reminders for your workouts</p>
                          </div>
                          <Switch
                            checked={notifications.workoutReminders}
                            onCheckedChange={(checked) => setNotifications({ ...notifications, workoutReminders: checked })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Moon className="h-5 w-5" />
                        Theme
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Theme Preference</Label>
                          <p className="text-sm text-gray-400">Choose your preferred theme</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant={theme === 'light' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTheme('light')}
                          >
                            <Sun className="h-4 w-4 mr-2" />
                            Light
                          </Button>
                          <Button
                            variant={theme === 'dark' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTheme('dark')}
                          >
                            <Moon className="h-4 w-4 mr-2" />
                            Dark
                          </Button>
                          <Button
                            variant={theme === 'system' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTheme('system')}
                          >
                            System
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </ProtectedRoute>
  )
} 