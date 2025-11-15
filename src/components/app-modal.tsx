import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ElementType, ReactElement, ReactNode } from 'react'

export function AppModal({
  children,
  title,
  submit,
  cancel,
  submitDisabled,
  submitLabel,
  open,
  onOpenChange,
  triggerElement,
}: {
  children: ReactNode
  title: string
  submit?: () => void
  cancel?: () => void
  submitDisabled?: boolean
  submitLabel?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  triggerElement?: ReactElement
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerElement ?? title}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button onClick={cancel} variant="outline">
              Cancel
            </Button>
          </DialogTrigger>
          {submit ? (
            <Button type="submit" onClick={submit} disabled={submitDisabled}>
              {submitLabel || 'Save'}
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
