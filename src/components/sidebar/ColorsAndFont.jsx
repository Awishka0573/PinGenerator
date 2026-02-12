import { useState } from 'react'
import { Palette } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Checkbox, Label, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui'

const ColorsAndFont = () => {
  const [useAllColors, setUseAllColors] = useState(true)
  const [fixLowContrast, setFixLowContrast] = useState(false)
  const [activateFontOverrides, setActivateFontOverrides] = useState(false)
  const [useUpperCase, setUseUpperCase] = useState(true)
  const [fontType, setFontType] = useState('carter-one')

  const colors = [
    { id: 'orange', color: '#F8A978', selected: true },
    { id: 'coral', color: '#F77B6B', selected: false },
    { id: 'sage', color: '#B5C99A', selected: false },
    { id: 'teal', color: '#5BB5B0', selected: false },
    { id: 'peach', color: '#F5CBA7', selected: false },
  ]

  return (
    <Accordion type="single" collapsible className="border-0">
      <AccordionItem value="colors-font" className="border-b">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-primary" />
            <span className="font-medium">Colors and Font</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {/* Color Picker */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Colors</Label>
              <div className="flex items-center gap-2">
                {colors.map((c) => (
                  <button
                    key={c.id}
                    className={`w-8 h-8 rounded-full border-2 ${c.selected ? 'border-gray-400 ring-2 ring-offset-2 ring-gray-300' : 'border-transparent'}`}
                    style={{ backgroundColor: c.color }}
                  />
                ))}
                <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600">
                  ▼
                </button>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="use-all-colors" 
                  checked={useAllColors}
                  onCheckedChange={setUseAllColors}
                />
                <Label htmlFor="use-all-colors" className="text-sm cursor-pointer">Use all colors</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="fix-low-contrast" 
                  checked={fixLowContrast}
                  onCheckedChange={setFixLowContrast}
                />
                <Label htmlFor="fix-low-contrast" className="text-sm cursor-pointer">Fix low contrast text</Label>
                <Button size="sm" className="h-6 text-xs bg-primary hover:bg-primary/90">
                  FIX NOW
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="font-overrides" 
                  checked={activateFontOverrides}
                  onCheckedChange={setActivateFontOverrides}
                />
                <Label htmlFor="font-overrides" className="text-sm cursor-pointer">Activate font overrides below</Label>
              </div>
            </div>

            {/* Font Color */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Font color</Label>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full bg-orange-200 border-2 border-gray-300" />
              </div>
            </div>

            {/* Font Type */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Font type</Label>
              <Select value={fontType} onValueChange={setFontType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carter-one">Carter One</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="open-sans">Open Sans</SelectItem>
                  <SelectItem value="lato">Lato</SelectItem>
                  <SelectItem value="montserrat">Montserrat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Use Uppercase */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="use-uppercase" 
                checked={useUpperCase}
                onCheckedChange={setUseUpperCase}
              />
              <Label htmlFor="use-uppercase" className="text-sm cursor-pointer">Use UPPER CASE font</Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default ColorsAndFont
