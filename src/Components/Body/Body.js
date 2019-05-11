import React from 'react'
import { PalettePicker } from '../../Containers/PalettePicker/PalettePicker'
import  Projects  from '../../Containers/Projects/Projects'
import { Control} from '../../Containers/Control/Control'

export const Body = () => {
  return(
    <div className='body'>
      <div className='palette-picker-container'><PalettePicker /></div>
      <div className='projects-container'><Projects /></div>
      <div className='control-container'><Control /></div>
    </div>
  )
}