"use client"

interface DailyTaskFormProps {
  employeeId?: string
  onSuccess?: () => void
}

export function DailyTaskForm({ employeeId, onSuccess }: DailyTaskFormProps) {
  return <div className="p-4 text-center text-slate-600">Daily Task Form component</div>
}
