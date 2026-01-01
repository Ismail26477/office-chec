"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { AttendanceRecord, Location } from "@/types/attendance"
import { format } from "date-fns"
import { attendanceApi } from "@/lib/api"

interface AttendanceContextType {
  records: AttendanceRecord[]
  todayRecord: AttendanceRecord | null
  checkIn: (
    employeeId: string,
    employeeName: string,
    location: Location,
    photoData?: string,
  ) => Promise<AttendanceRecord>
  checkOut: (recordId: string, location: Location, photoData?: string) => Promise<AttendanceRecord>
  getEmployeeRecords: (employeeId: string) => Promise<AttendanceRecord[]>
  getTodayRecords: () => Promise<AttendanceRecord[]>
  getRecordsByDate: (date: string) => Promise<AttendanceRecord[]>
  getTodayRecordForEmployee: (employeeId: string) => AttendanceRecord | null
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined)

export function AttendanceProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getTodayRecordForEmployee = (employeeId: string): AttendanceRecord | null => {
    const today = format(new Date(), "yyyy-MM-dd")
    return records.find((r) => r.employeeId === employeeId && r.date === today) || null
  }

  const checkIn = async (
    employeeId: string,
    employeeName: string,
    location: Location,
    photoData?: string,
  ): Promise<AttendanceRecord> => {
    try {
      const response = await attendanceApi.checkIn({
        employeeId,
        employeeName,
        location,
        deviceInfo: {
          browser: navigator.userAgent.split(" ").pop() || "Unknown",
          userAgent: navigator.userAgent,
        },
        photoData,
      })

      if (response.success && response.record) {
        const newRecord: AttendanceRecord = {
          ...response.record,
          id: response.record._id || response.record.id,
          checkInTime: new Date(response.record.checkInTime),
          checkOutTime: response.record.checkOutTime ? new Date(response.record.checkOutTime) : null,
          photoData: response.record.photoData,
        }
        setRecords((prev) => [...prev, newRecord])
        return newRecord
      }

      throw new Error(response.error || "Failed to check in")
    } catch (error) {
      console.error("Check-in error:", error)
      throw error
    }
  }

  const checkOut = async (recordId: string, location: Location, photoData?: string): Promise<AttendanceRecord> => {
    try {
      const response = await attendanceApi.checkOut(recordId, location, photoData)

      if (response.success && response.record) {
        const updatedRecord: AttendanceRecord = {
          ...response.record,
          id: response.record._id || response.record.id,
          checkInTime: new Date(response.record.checkInTime),
          checkOutTime: response.record.checkOutTime ? new Date(response.record.checkOutTime) : null,
          photoData: response.record.photoData,
          checkOutPhotoData: response.record.checkOutPhotoData,
        }
        setRecords((prev) => prev.map((r) => (r.id === recordId ? updatedRecord : r)))
        return updatedRecord
      }

      throw new Error(response.error || "Failed to check out")
    } catch (error) {
      console.error("Check-out error:", error)
      throw error
    }
  }

  const getEmployeeRecords = async (employeeId: string): Promise<AttendanceRecord[]> => {
    try {
      if (!employeeId || employeeId === "undefined") {
        return []
      }

      const response = await attendanceApi.getEmployeeRecords(employeeId)
      if (response.success && response.records) {
        return response.records.map((r: any) => ({
          ...r,
          id: r._id || r.id,
          checkInTime: r.checkInTime ? new Date(r.checkInTime) : null,
          checkOutTime: r.checkOutTime ? new Date(r.checkOutTime) : null,
          photoData: r.photoData || null,
          checkOutPhotoData: r.checkOutPhotoData || null,
        }))
      }
      return []
    } catch (error) {
      console.error("Get employee records error:", error)
      return []
    }
  }

  const getTodayRecords = async (): Promise<AttendanceRecord[]> => {
    try {
      const response = await attendanceApi.getTodayRecords()
      if (response.success && response.records) {
        const todayRecords = response.records.map((r: any) => ({
          ...r,
          id: r._id || r.id,
          checkInTime: r.checkInTime ? new Date(r.checkInTime) : null,
          checkOutTime: r.checkOutTime ? new Date(r.checkOutTime) : null,
          photoData: r.photoData,
          checkOutPhotoData: r.checkOutPhotoData,
        }))
        setRecords(todayRecords)
        return todayRecords
      }
      return []
    } catch (error) {
      console.error("Get today records error:", error)
      return []
    }
  }

  const getRecordsByDate = async (date: string): Promise<AttendanceRecord[]> => {
    try {
      const response = await attendanceApi.getRecordsByDate(date)
      if (response.success && response.records) {
        return response.records.map((r: any) => ({
          ...r,
          id: r._id || r.id,
          checkInTime: r.checkInTime ? new Date(r.checkInTime) : null,
          checkOutTime: r.checkOutTime ? new Date(r.checkOutTime) : null,
          photoData: r.photoData,
          checkOutPhotoData: r.checkOutPhotoData,
        }))
      }
      return []
    } catch (error) {
      console.error("Get records by date error:", error)
      return []
    }
  }

  useEffect(() => {
    const fetchTodayRecords = async () => {
      setIsLoading(true)
      try {
        await getTodayRecords()
      } catch (error) {
        console.error("Error fetching today records:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTodayRecords()
  }, [])

  return (
    <AttendanceContext.Provider
      value={{
        records,
        todayRecord: null,
        checkIn,
        checkOut,
        getEmployeeRecords,
        getTodayRecords,
        getRecordsByDate,
        getTodayRecordForEmployee,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  )
}

export function useAttendance() {
  const context = useContext(AttendanceContext)
  if (context === undefined) {
    throw new Error("useAttendance must be used within an AttendanceProvider")
  }
  return context
}
