"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TaskApprovalDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Task Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Task data loading...</p>
      </CardContent>
    </Card>
  )
}
