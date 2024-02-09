'use client'

import React, { ReactElement, useState } from 'react'
import ChartCard, { ChartCardProps } from './ChartCard'
import ChartModal from '../modals/chartModal'

type ChartCardContainerProps = {
  children: ReactElement | ReactElement[]
}

const ChartCardContainer: React.FC<ChartCardContainerProps> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [selectedComp, setSelectedComp] = useState(0)
  const arrayChildren = Array.isArray(children) ? children : [children]

  return (
    <div className='relative w-full h-full overflow-auto'>
      <ChartModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={false}
      >
        <ChartCard
          modalMode={false}
        >
          {arrayChildren[selectedComp]}
        </ChartCard>
      </ChartModal>
      <div className="flex flex-wrap justify-center gap-4">
        {arrayChildren.map((child, index) => (
          <ChartCard
            key={index}
            modalMode={true}
            onModalOpen={() => {
              setSelectedComp(index)
              setOpen(true)
            }}
          >
            {child}
          </ChartCard>
        ))}
      </div>
    </div>
  )
}

export default ChartCardContainer