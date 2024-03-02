'use client'

import React, {
  useState,
  forwardRef,
  ForwardedRef,
  useImperativeHandle,
} from 'react'
import Lottie from 'react-lottie'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { Book, Globe2, User, Info } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  CreateDatabase as CreateDatabaseValidation,
  Query,
} from '@/lib/validation'
import search from 'public/assets/animation/search.json'
import dots from 'public/assets/animation/dots.json'
import tick from 'public/assets/animation/tick.json'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { FilterType } from '@/types/items'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import FoundItem from './FoundItem'
import { documents } from '@/data/dataAdaptor'
import { Document } from '@/types/items'
import { TooltipProvider } from '@/components/ui/tooltip'

type State = 'starter' | 'loading' | 'done'

const results: Document[] = documents.slice(1, 3)
const filters = {
  authors: 30,
  documents: 20,
  countries: 12,
}

const description = `بهترین روش برای جستجو و بازیابی اطلاعات از یک دیتابیس، استفاده از کوئری‌های ساخته شده با زبان SQL است. SQL که مخفف Structured Query Language به معنای "زبان پرس و جوی ساختار یافته" است، اجازه می‌دهد تا با استفاده از دستورات متعدد، اطلاعات مورد نیاز را از دیتابیس بازیابی کرده و با آن‌ها برخورد کرد. این دستورات شامل دستور SELECT برای انتخاب اطلاعات، دستور INSERT برای درج اطلاعات جدید، دستور UPDATE برای به روزرسانی اطلاعات موجود، و دستور DELETE برای حذف اطلاعات می‌شوند. برای مثال:

SELECT نام، نام‌خانوادگی، ایمیل
FROM کاربران
WHERE شهر = 'تهران'

این دستور از جدول کاربران تمام ردیف‌هایی که شهر آن‌ها برابر با "تهران" است را بازیابی می‌کند و اطلاعات نام، نام خانوادگی و ایمیل آن‌ها را نمایش می‌دهد.`

const Finder = () => {
  const [state, setState] = useState<State>('starter')

  function startSearching() {
    setState('loading')
    const timer = setTimeout(() => setState('done'), 4000)
    return () => {
      clearTimeout(timer)
    }
  }
  const onScan = async (values: z.infer<typeof CreateDatabaseValidation>) => {
    console.log(values)
    startSearching()
  }

  const onSubmitFinder = async () => {
    console.log('done!!')
  }

  const form = useForm<z.infer<typeof CreateDatabaseValidation>>({
    resolver: zodResolver(Query),
    defaultValues: {
      query: '',
    },
  })

  return (
    <CardContent className="flex flex-row justify-stretch items-stretch w-full h-full ">
      <div className="flex flex-col justify-start items-stretch w-[50%] h-full">
        <Card className="h-full">
          {state !== 'starter' ? (
            <>
              <CardHeader className="text-xl py-2 flex justify-end w-full text-right">
                نتایج جستجو
              </CardHeader>
              <CardContent className="flex h-[500px] flex-row justify-between items-center w-full px-2">
                <div className="flex flex-col justify-stretch items-stretch w-full h-full overflow-hidden">
                  <div className="flex flex-row justify-center items-center gap-2 my-2 mr-2">
                    {Object.entries(filters).map(([key, value]) => (
                      <Button
                        key={key}
                        className="rounded-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-mds focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border hover:opacity-80 bg-primary-foreground text-muted-foreground border-muted-foreground"
                      >
                        {key}:{' '}
                        {state === 'done' ? (
                          value
                        ) : (
                          <Lottie
                            options={{ animationData: dots, loop: true }}
                            width={80}
                            height={820}
                          />
                        )}
                      </Button>
                    ))}
                  </div>
                  <div className="mb-4 flex-1 flex">
                    {state !== 'loading' && (
                      <TooltipProvider>
                        <ScrollArea className="flex-1 overflow-auto w-full h-full flex flex-col justify-between items-center">
                          {results.map((item, index) => (
                            <FoundItem key={index} data={item} />
                          ))}
                        </ScrollArea>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <div className="w-full p-5 h-full">
              <p className="flex flex-col justify-start items-end w-full text-right -indent-4">
                <Info size={25} className="opacity-50 mb-2" />
                <span>{description}</span>
              </p>
            </div>
          )}
        </Card>
      </div>
      {state === 'loading' ? (
        <div className="flex flex-col px-5 justify-center items-center w-[50%]">
          <Lottie
            options={{ animationData: search, loop: true }}
            width={272}
            height={272}
          />
          <span className="text-xl mt-2">درحال جست و جو مقالات</span>
          {/* <span className="mt-2">searching through datas....</span> */}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-[50%]">
          <div className="flex flex-col justify-center items-end w-[80%]">
            {state === 'done' && (
              <div className="w-full flex justify-center items-center">
                <Lottie
                  options={{ animationData: tick, loop: false }}
                  width={100}
                  height={100}
                />
              </div>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitFinder)}
                className="flex flex-col items-stretch justify-start gap-2 w-full"
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
                    <FormItem className="flex flex-col items-end w-full">
                      <FormLabel>کوئری</FormLabel>
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
                <div className="flex flex-row justify-end items-center gap-2 w-full">
                  <Button
                    variant="outline"
                    onClick={() => onScan(form.getValues())}
                  >
                    اسکن
                  </Button>
                  <Button
                    variant="default"
                    type="submit"
                    disabled={state !== 'done'}
                  >
                    ایجاد
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </CardContent>
  )
}

Finder.displayName = 'Finder'

export default Finder
