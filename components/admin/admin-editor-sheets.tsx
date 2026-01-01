"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminEditorSheets() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Editor Sheets</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Editor sheets data loading...</p>
      </CardContent>
    </Card>
  )
}
