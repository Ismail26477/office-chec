"use client"

import { useState } from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"
import { OverviewSection } from "@/components/dashboard/overview-section"
import { AttendanceSection } from "@/components/dashboard/attendance-section"
import { TasksSection } from "@/components/dashboard/tasks-section"
import { EditorSheetManager } from "@/components/editor/editor-sheet-manager"
import { useAuth } from "@/contexts/auth-context"

export default function EmployeeDashboard() {
  const [activeTab, setActiveTab] = useState<"attendance" | "tasks" | "overview" | "editor-sheets">("overview")
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container max-w-7xl mx-auto px-4 py-8">
        {activeTab === "overview" && <OverviewSection />}
        {activeTab === "attendance" && <AttendanceSection />}
        {activeTab === "tasks" && <TasksSection />}
        {activeTab === "editor-sheets" && <EditorSheetManager />}
      </main>
    </div>
  )
}
