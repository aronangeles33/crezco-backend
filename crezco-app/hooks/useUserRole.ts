'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'

interface UserData {
  _id: string
  email: string
  name: string
  avatar: string
  role: 'creator' | 'supporter' | 'admin' | 'credcamer'
  credcamerPoints?: number
  credcamerLevel?: string
  totalCaptured?: number
}

export function useUserRole() {
  const { getToken, userId } = useAuth()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        const token = await getToken()
        if (!token) {
          setLoading(false)
          return
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        })

        if (res.ok) {
          const data = await res.json()
          setUserData(data)
        }
      } catch (err) {
        console.error('Error fetching user role:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [userId])

  return {
    userData,
    loading,
    isCredcamer: userData?.role === 'credcamer' || userData?.role === 'admin',
    isAdmin: userData?.role === 'admin',
  }
}
