"use client"

import * as React from "react"
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner"

export type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
  duration?: number
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export type ToastActionElement = React.ReactElement

export const Toaster = SonnerToaster

function toast(props: ToastProps) {
  const { title, description, action, variant, duration = 5000, ...restProps } = props

  const id = sonnerToast(title as string, {
    description: description,
    action: action
      ? {
          label: React.isValidElement(action) ? action : "Action",
          onClick: () => {},
        }
      : undefined,
    duration: duration,
    className: variant === "destructive" ? "sonner-toast-destructive" : undefined,
  })

  return {
    id: id.toString(),
    dismiss: () => sonnerToast.dismiss(id),
    update: (props: ToastProps) => {
      sonnerToast.dismiss(id)
      toast(props)
    },
  }
}

function useToast() {
  return {
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(Number.parseInt(toastId))
      } else {
        sonnerToast.dismiss()
      }
    },
  }
}

export { useToast, toast }

