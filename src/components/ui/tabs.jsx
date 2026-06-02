import { useState } from "react"
import { cn } from "../../lib/utils"

export function Tabs({ defaultValue, className, children }) {
  const [active, setActive] = useState(defaultValue)
  return (
    <div className={cn("w-full", className)}>
      {typeof children === 'function' ? children({ active, setActive }) : children}
    </div>
  )
}

export function TabsList({ className, ...props }) {
  return <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)} {...props} />
}

export function TabsTrigger({ className, value, active, onClick, ...props }) {
  return (
    <button
      className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", active === value && "bg-background text-foreground shadow-sm", className)}
      onClick={() => onClick?.(value)}
      {...props}
    />
  )
}

export function TabsContent({ className, value, active, ...props }) {
  if (active !== value) return null
  return <div className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)} {...props} />
}
