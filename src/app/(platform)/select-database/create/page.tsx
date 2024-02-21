import React from 'react'
import DatabaseForm from '../../dashboard/_components/DatabaseForm/databaseForm'
import { CardContent } from '@/components/ui/card'

const CreatePage = () => {
  return (
    <>
      <CardContent className="flex flex-col justify-center items-center h-full p-4">
        <DatabaseForm />
      </CardContent>
    </>
  )
}

export default CreatePage
