"use client"

import React, { SetStateAction, Dispatch } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { Sketch, color } from '@uiw/react-color'
import { colord } from 'colord'

export type RGBColor = {
  red: number,
  blue: number,
  green: number,
}

type ColorPickProps = {
  color: RGBColor,
  setColor: Dispatch<SetStateAction<RGBColor>>,
}

export const ColorPick: React.FC<ColorPickProps> = ({ color, setColor}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">انتخاب رنگ</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Sketch
          color={colord(`rgb(${color.red}, ${color.green}, ${color.blue})`).toHex()}
          onChange={(color) => {
            const R = colord(color.hex).toRgb().r
            const G = colord(color.hex).toRgb().g
            const B = colord(color.hex).toRgb().b
            setColor({
              red: R,
              green: G,
              blue: B,
            })
          }}
        />
      </PopoverContent>
    </Popover>
  )
}