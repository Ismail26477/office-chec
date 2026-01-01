"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AnalyticsDashboard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Analytics data loading...</p>
      </CardContent>
    </Card>
  )
}
