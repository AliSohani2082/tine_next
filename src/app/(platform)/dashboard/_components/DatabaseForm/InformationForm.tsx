'use client'

import { forwardRef, useImperativeHandle } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import { CreateDatabase as createDatabaseValidation } from '@/lib/validation'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import InformationBox from '@/components/shared/InformationBox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Info } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hovercard'

const InformationForm = forwardRef(
  (
    {
      onSubmit,
    }: { onSubmit: (values: z.infer<typeof createDatabaseValidation>) => void },
    ref: React.Ref<{ submitCreateForm: () => void }>
  ) => {
    const form = useForm<z.infer<typeof createDatabaseValidation>>({
      resolver: zodResolver(createDatabaseValidation),
      defaultValues: {
        name: '',
      },
    })

    useImperativeHandle(ref, () => ({
      submitCreateForm: () => form.handleSubmit(onSubmit)(),
    }))

    return (
      <div className=" flex flex-row justify-around items-stretch space-y-4 h-full">
        <div className="w-full p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col items-stretch justify-start gap-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-end">
                    <FormLabel>نام</FormLabel>
                    <FormControl>
                      <Input
                        // disabled={loading}
                        placeholder="Database"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-end">
                    <div className="flex flex-row justify-center items-center gap-2">
                      <FormLabel>کوئری</FormLabel>
                      <HoverCard>
                        <HoverCardTrigger>
                          <Info className="text-muted-foreground w-6 h-6" />
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className="w-[100px] h-[100px] flex flex-row justify-center items-start">
                            توضیحات مربوط به این بخش...
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <FormControl>
                      <Textarea
                        // disabled={loading}
                        placeholder="Database"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        {/* <div className="w-[300px] h-full">
          <InformationBox classname="h-full"> توضیحات مربوط به این بخش... </InformationBox>
        </div> */}
      </div>
    )
  }
)

InformationForm.displayName = 'InformationForm'

export default InformationForm
