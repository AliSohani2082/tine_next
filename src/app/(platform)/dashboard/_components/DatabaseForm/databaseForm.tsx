'use client'

import React, { SetStateAction, useRef, Dispatch, useState } from 'react'
import * as z from 'zod'

import {
  Query,
  CreateDatabase as createDatabaseValidation,
} from '@/lib/validation'
import StepperComponent from '../Stepper'
import InformationForm from './InformationForm'
import Finder from './Finder'

export interface FinderRef {
  progress: number
  setProgress: Dispatch<SetStateAction<number>>
  submitUpdateForm: () => void
  scan: () => void
}

const DummyComponent = () => {
  return <div>placeholder</div>
}

const DatabaseForm = () => {
  const [progress, setProgress] = useState(33)
  const done = progress === 100
  const createFormRef = useRef<{ submitCreateForm: () => void } | null>(null)
  const finderRef = useRef<FinderRef | null>(null)

  const onSubmitCreate = async (
    values: z.infer<typeof createDatabaseValidation>
  ) => {
    console.log(values)
  }

  const onScan = async (values: z.infer<typeof Query>) => {
    console.log(values)
  }

  const onSubmitFinder = async () => {
    console.log('done!!')
  }

  return (
    <StepperComponent
      steps={[
        {
          stepNum: 0,
          title: 'مشخصات اولیه',
          description: 'description...',
          isOptional: false,
          content: (
            <InformationForm ref={createFormRef} onSubmit={onSubmitCreate} />
          ),
          onSubmit: () => {
            const result = createFormRef.current?.submitCreateForm()
            console.log('result: ', result)
          },
          isNextActivated: true,
        },
        {
          stepNum: 1,
          title: 'سرچ مقالات',
          description: 'idk...',
          isOptional: false,
          content: (
            <Finder
              ref={finderRef}
              onSubmit={onSubmitFinder}
              onScan={onScan}
              progress={progress}
              setProgress={setProgress}
            />
          ),
          onSubmit: () => {
            console.log('step2')
          },
          additionalActions: [
            {
              title: 'اسکن مجد',
              isActive: done,
              action: () => {
                const result = finderRef.current?.scan()
                console.log('result: ', result)
              },
            },
          ],
          isNextActivated: true,
        },
        {
          stepNum: 2,
          title: 'تایید نهایی',
          description: 'idk...2',
          isOptional: false,
          content: <DummyComponent />,
          onSubmit: () => {
            console.log('step3')
          },
          isNextActivated: true,
        },
      ]}
    />
  )
}

export default DatabaseForm
