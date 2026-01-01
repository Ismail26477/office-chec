"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PerformanceMetrics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Performance data loading...</p>
      </CardContent>
    </Card>
  )
}
