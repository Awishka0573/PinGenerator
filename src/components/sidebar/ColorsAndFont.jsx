import { useState, useRef } from 'react'
import { Palette, ChevronDown, X, Check } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Checkbox, Label, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui'

// Full color palette matching the reference
const COLOR_PALETTE = [
  ['#5C1A1A', '#C41E3A', '#F5DEB3', '#1A4D4D', '#6B8E9E'],
  ['#E8967A', '#E57373', '#FFD54F', '#4DB6AC', '#81D4FA'],
  ['#D7CCC8', '#F8BBD9', '#E1BEE7', '#B2DFDB', '#C8E6C9'],
  ['#FFCCBC', '#F48FB1', '#CE93D8', '#80CBC4', '#A5D6A7'],
  ['#FFE0B2', '#FFCC80', '#FFECB3', '#E6EE9C', '#C5E1A5'],
  ['#D7CCC8', '#BCAAA4', '#D4C4A8', '#C9B896', '#E0D5C0'],
  ['#5D4037', '#4DB6AC', '#26A69A', '#FFB74D', '#E57373'],
  ['#7CB342', '#8BC34A', '#AED581', '#C5E1A5', '#DCEDC8'],
  ['#558B2F', '#689F38', '#7CB342', '#9CCC65', '#C5E1A5'],
  ['#00838F', '#00ACC1', '#26C6DA', '#4DD0E1', '#80DEEA'],
  ['#0277BD', '#0288D1', '#039BE5', '#29B6F6', '#4FC3F7'],
  ['#5D4037', '#6D4C41', '#795548', '#8D6E63', '#A1887F'],
  ['#00695C', '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7'],
  ['#1565C0', '#00897B', '#26A69A', '#FFAB91', '#FFCC80'],
]

const ALL_COLORS = COLOR_PALETTE.flat()
const DEFAULT_COLORS = COLOR_PALETTE[0] // First row as default

const ColorsAndFont = ({ 
  selectedColors = [], 
  onColorsChange, 
  fontColor = '#E53935', 
  onFontColorChange,
  fontType = 'carter-one',
  onFontTypeChange,
  useUpperCase = true,
  onUseUpperCaseChange
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showFontColorPicker, setShowFontColorPicker] = useState(false)
  
  // Remember the previous color collection before switching to "all colors"
  const previousColorsRef = useRef(selectedColors.length === ALL_COLORS.length ? DEFAULT_COLORS : selectedColors)

  // Display the currently selected colors (up to 5)
  const displayColors = selectedColors.length > 0 
    ? selectedColors.slice(0, 5) 
    : DEFAULT_COLORS

  // Check if a row is currently selected (all 5 colors match)
  const isRowSelected = (row) => {
    if (selectedColors.length !== 5) return false
    return row.every((color, idx) => selectedColors[idx] === color)
  }

  // Select an entire row of 5 colors
  const selectRow = (row) => {
    previousColorsRef.current = row // Remember this selection
    onColorsChange?.(row)
    setShowColorPicker(false)
  }

  const selectAllColors = () => {
    // Save current selection before switching to all
    if (selectedColors.length !== ALL_COLORS.length && selectedColors.length > 0) {
      previousColorsRef.current = selectedColors
    }
    onColorsChange?.(ALL_COLORS)
  }

  const restorePrevious = () => {
    // Restore the previous color collection
    const colorsToRestore = previousColorsRef.current.length > 0 ? previousColorsRef.current : DEFAULT_COLORS
    onColorsChange?.(colorsToRestore)
  }

  const handleFontColorSelect = (color) => {
    onFontColorChange?.(color)
    setShowFontColorPicker(false)
  }

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
            <div className="space-y-2 relative">
              <Label className="text-sm text-gray-600">Color Collection</Label>
              <p className="text-xs text-gray-400 mb-1">Click to choose a color set for pin backgrounds</p>
              <div className="flex items-center gap-2">
                {displayColors.map((color, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full border-2 border-teal-500"
                    style={{ backgroundColor: color }}
                  />
                ))}
                <button 
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full"
                  onClick={() => setShowColorPicker(!showColorPicker)}
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Color Palette Popover - Select entire row */}
              {showColorPicker && (
                <div className="absolute z-50 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-xl w-72">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-500">Select a color collection</span>
                    <button onClick={() => setShowColorPicker(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {COLOR_PALETTE.map((row, rowIdx) => (
                      <button
                        key={rowIdx}
                        className={`flex gap-1.5 p-1.5 w-full rounded-lg transition-all hover:bg-gray-50 ${isRowSelected(row) ? 'bg-teal-50 ring-2 ring-teal-400' : ''}`}
                        onClick={() => selectRow(row)}
                      >
                        {row.map((color, colIdx) => (
                          <div
                            key={colIdx}
                            className="w-8 h-8 rounded-full border border-gray-200"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        {isRowSelected(row) && (
                          <Check className="h-4 w-4 text-teal-600 ml-auto self-center" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Use All Colors checkbox */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="use-all-colors" 
                  checked={selectedColors.length === ALL_COLORS.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      selectAllColors()
                    } else {
                      restorePrevious()
                    }
                  }}
                />
                <Label htmlFor="use-all-colors" className="text-sm cursor-pointer">Use all colors (random from all)</Label>
              </div>
            </div>

            {/* Font Color */}
            <div className="space-y-2 relative">
              <Label className="text-sm text-gray-600">Font color</Label>
              <p className="text-xs text-gray-400 mb-1">Color for title text on pins</p>
              <div className="flex items-center gap-2">
                <button 
                  className="w-10 h-10 rounded-full border-2 border-teal-500 ring-2 ring-offset-1 ring-teal-300 relative"
                  style={{ backgroundColor: fontColor }}
                  onClick={() => setShowFontColorPicker(!showFontColorPicker)}
                >
                  <Check className="h-4 w-4 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md" />
                </button>
                <span className="text-xs text-gray-500">{fontColor}</span>
              </div>

              {/* Font Color Popover */}
              {showFontColorPicker && (
                <div className="absolute z-50 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-xl w-72">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-gray-500">Select font color (single)</span>
                    <button onClick={() => setShowFontColorPicker(false)} className="text-gray-400 hover:text-gray-600">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto">
                    {COLOR_PALETTE.map((row, rowIdx) => (
                      <div key={rowIdx} className="flex gap-1.5">
                        {row.map((color, colIdx) => (
                          <button
                            key={colIdx}
                            className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 relative ${fontColor === color ? 'border-teal-500 ring-1 ring-teal-300' : 'border-transparent'}`}
                            style={{ backgroundColor: color }}
                            onClick={() => handleFontColorSelect(color)}
                          >
                            {fontColor === color && (
                              <Check className="h-3 w-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md" />
                            )}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Font Type */}
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Font type</Label>
              <Select value={fontType} onValueChange={onFontTypeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="carter-one">Carter One</SelectItem>
                  <SelectItem value="roboto">Roboto</SelectItem>
                  <SelectItem value="open-sans">Open Sans</SelectItem>
                  <SelectItem value="lato">Lato</SelectItem>
                  <SelectItem value="montserrat">Montserrat</SelectItem>
                  <SelectItem value="serif">Serif (default)</SelectItem>
                  <SelectItem value="sans-serif">Sans Serif</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Use Uppercase */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="use-uppercase" 
                checked={useUpperCase}
                onCheckedChange={onUseUpperCaseChange}
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
