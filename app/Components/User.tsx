"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserData {
  name: string
  email: string
  bio: string
  avatar: string
}

export default function UserProfile() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    bio: "",
    avatar: "",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<UserData>(userData)

  useEffect(() => {
    // Simulating an API call to fetch user data
    const fetchUserData = async () => {
      // In a real app, this would be an API call
      const mockUserData: UserData = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        bio: "Frontend developer passionate about creating beautiful and functional user interfaces.",
        avatar: "/placeholder.svg?height=100&width=100",
      }
      setUserData(mockUserData)
      setEditedData(mockUserData)
    }

    fetchUserData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be an API call to update the user data
    setUserData(editedData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-background rounded-lg shadow-lg">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{userData.name}</h1>
          <p className="text-muted-foreground">{userData.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={editedData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" value={userData.email} disabled />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            name="bio"
            value={editedData.bio}
            onChange={handleInputChange}
            disabled={!isEditing}
            rows={4}
          />
        </div>

        {isEditing ? (
          <div className="flex justify-end space-x-2">
            <Button type="submit" variant="default">
              Save Changes
            </Button>
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </form>
    </div>
  )
}

