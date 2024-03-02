import React from 'react'
import { CardContent } from '@/components/ui/card'
import Finder from '../../dashboard/_components/DatabaseForm/Finder'

const CreatePage = () => {
  return (
    <>
      <CardContent className="flex flex-col justify-center items-center h-full p-4">
        <Finder />
      </CardContent>
    </>
  )
}

export default CreatePage
