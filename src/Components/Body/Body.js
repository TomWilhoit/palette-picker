import React from 'react'
import { PalettePicker } from '../../Containers/PalettePicker/PalettePicker'
import { Projects } from '../../Containers/Projects/Projects'
import { Control} from '../../Containers/Control/Control'

export const Body = () => {
  return(
    <div className='body'>
      <div className='palette-picker'><PalettePicker /></div>
      <div className='projects'><Projects /></div>
      <div className='control'><Control /></div>
    </div>
  )
}