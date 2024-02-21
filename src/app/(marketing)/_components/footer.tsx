import { Logo } from '@/components/shared/Logo'
import { Button } from '@/components/ui/button'

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full p -4 border-t bg-slate-100">
      <div className="md:max-w-screen-2xl mx-auto flex w-full items-center justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            سیاست حفظ حریم خصوصی
          </Button>
          <Button size="sm" variant="ghost">
            شرایط استفاده از خدمات
          </Button>
        </div>
      </div>
    </div>
  )
}
