"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function EmployeeDirectory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employee Directory</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Employee data loading...</p>
      </CardContent>
    </Card>
  )
}
