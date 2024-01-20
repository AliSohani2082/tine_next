import React, { useState, forwardRef, ForwardedRef, useImperativeHandle } from 'react'
import Lottie from 'react-lottie';
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { Book, Globe2, User, Info } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hovercard';
import { Textarea } from '@/components/ui/textarea';
import { Query } from "@/lib/validation";
import { Progress } from '@/components/ui/progress'
import search from 'public/assets/animation/search.json'
import tick from 'public/assets/animation/tick.json'
import { Card } from '@/components/ui/card';
import { Command, CommandInput, CommandGroup } from '@/components/ui/command';
import { FilterType } from '@/types/items';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CommandItem } from 'cmdk';
import { ScrollArea } from '@/components/ui/scroll-area';
import FoundItem from './FoundItem';
import { FinderRef } from './databaseForm';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs_routeless';

const results: {
  type: FilterType,
  label: string,
}[] = [
  {
    type: "author",
    label: "AliSohani",
  },
  {
    type: "document",
    label: "ResearchPaper123",
  },
  {
    type: "country",
    label: "United States",
  },
  {
    type: "author",
    label: "MariaGomez",
  },
  {
    type: "document",
    label: "Article456",
  },
  {
    type: "country",
    label: "Canada",
  },
  {
    type: "author",
    label: "JohnSmith",
  },
  // {
  //   type: "document",
  //   label: "Thesis789",
  // },
  // {
  //   type: "country",
  //   label: "United Kingdom",
  // },
  // {
  //   type: "country",
  //   label: "United Kingdom",
  // },
  // {
  //   type: "author",
  //   label: "SophiaMiller",
  // },
  // {
  //   type: "document",
  //   label: "Book101",
  // },
  // {
  //   type: "country",
  //   label: "Australia",
  // },
  // {
  //   type: "author",
  //   label: "AhmedKhan",
  // },
  // {
  //   type: "document",
  //   label: "WhitePaper202",
  // },
  // {
  //   type: "country",
  //   label: "India",
  // },
];


interface FinderProps {
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  onScan: SubmitHandler<z.infer<typeof Query>>;
  onSubmit: () => void;
}

const Finder = forwardRef<FinderRef | null, FinderProps>(
  ( { onScan, onSubmit, progress, setProgress }, ref ) => {

    const [iprogress, setIprogress] = useState(progress)
    const done = iprogress === 100
    const [categories, setCategories] = useState<string[]>(["author", "document", "country"])

    const form = useForm<z.infer<typeof Query>>({
      resolver: zodResolver(Query),
      defaultValues: {
        query: "",
      },
    });

    useImperativeHandle(
      ref as ForwardedRef<FinderRef | null>,
      () =>
        done
          ? {
              submitUpdateForm: onSubmit,
              scan: form.handleSubmit(onScan),
              progress: iprogress,
              setProgress: setIprogress,
            }
          : {
              submitUpdateForm: () => {},
              scan: () => {},
              progress: iprogress,
              setProgress: setIprogress,
            },
      [done, onScan, onSubmit, form, iprogress, setIprogress]
    );
    results.sort((a, b) => {
      const categoryA = categories.indexOf(a.type);
      const categoryB = categories.indexOf(b.type);
    
      return categoryA - categoryB;
    })  

    const filters: Record<FilterType, number> = {
      "author": 12,
      "document": 33,
      "country": 45,
    }

    React.useEffect(() => {
      const timer1 = setTimeout(() => setIprogress(66), 1000)
      const timer2 = setTimeout(() => setIprogress(95), 2000)
      const timer3 = setTimeout(() => setIprogress(100), 4000)
      return () => { 
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }, [])

    return (
      <div className='flex flex-row justify-stretch items-stretch w-full h-full'>
        <div className='flex flex-col justify-start items-stretch w-[50%] h-full'>
          <Card className='h-full'>
            <Command className='overflow-auto'>
              <CommandInput placeholder='search...' className='w-full' />
              <div className='flex flex-row justify-between items-center w-full px-2'>
                <div className="flex flex-row justify-end items-center gap-2 mt-2 mr-2">
                  {Object.entries(filters).map(([key, value]) => (
                    <Button
                      key={key}
                      className={cn(
                        "rounded-full px-4 py-2 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-mds focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground border hover:opacity-80",
                        categories.includes(key)
                          ? "bg-primary"
                          : "bg-primary-foreground text-muted-foreground border-muted-foreground"
                      )}
                      onClick={() => {
                        if (categories.includes(key)) {
                          setCategories(categories.filter((category) => category!== key));
                        } else {
                          setCategories([...categories, key]);
                        }
                      }}
                    >
                      {key}: {value}
                    </Button>
                  ))}
                </div>
                <span>تعداد نتایج کل: ۱۲۳</span>
              </div>
              <CommandGroup>
                <ScrollArea>
                  {results.filter((res) => categories.includes(res.type)).map((result, index) => {
                    var data: {
                      icon: React.ReactNode | null,
                      title: string
                    } = {
                      icon: null,
                      title: result.label,
                    };
                    if(result.type === "author") {
                      data.icon = <User/>
                    } else if(result.type === "document") {
                      data.icon = <Book/>
                    } else if(result.type === "country") {
                      data.icon = <Globe2/>
                    }
                    return (
                      <FoundItem
                        key={index}
                        data={data}
                      />
                    );
                  })}
                </ScrollArea>
              </CommandGroup>
            </Command>
          </Card>
        </div>
        {iprogress === 100 ? (
          <div className='flex flex-col justify-center items-center w-[50%]'>
            <div className='flex flex-col justify-center items-end w-[80%]'>
              <div className='w-full flex justify-center items-center'>
                <Lottie options={{ animationData:tick, loop:false }} width={100} height={100}/>
              </div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col items-stretch justify-start gap-2 w-full"
                >
                  <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-end w-full">
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
          </div>
        ) : (
          <div className='flex flex-col px-5 justify-center items-center w-[50%}'>
            <Lottie options={{ animationData: search, loop:true }} width={272} height={272}/>
            <Progress value={iprogress} className='w-[600px]'/>
            <span className='mt-2'>searching through datas....</span>
          </div>
        )}
      </div>
    )
  }
)

Finder.displayName = 'Finder';

export default Finder