"use client"

interface TaskListProps {
  employeeId?: string
}

export function TaskList({ employeeId }: TaskListProps) {
  return <div className="p-4 text-center text-slate-600">Task List component</div>
}
