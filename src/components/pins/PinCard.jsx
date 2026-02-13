import { useState, useRef, useEffect } from 'react'
import html2canvas from 'html2canvas'
import { 
  RefreshCw, 
  Clock, 
  Download, 
  Edit3, 
  Trash2, 
  Copy, 
  Lock, 
  Settings,
  Share2
} from 'lucide-react'

// Draggable Pin Card with inline editing
const PinCard = ({ pin, onDelete, onShuffle, onEdit, onUpdatePin }) => {
  // Title state
  const [titleSelected, setTitleSelected] = useState(false)
  const [titleDragging, setTitleDragging] = useState(false)
  const [titleEditing, setTitleEditing] = useState(false)
  const [titleText, setTitleText] = useState(pin.title || '{TITLE}')
  const [titlePos, setTitlePos] = useState({ 
    x: pin.titleX ?? 50,
    y: pin.titleY ?? 40
  })
  const [titleFontSize, setTitleFontSize] = useState(pin.titleFontSize ?? 18)
  
  // Description state
  const [descSelected, setDescSelected] = useState(false)
  const [descDragging, setDescDragging] = useState(false)
  const [descEditing, setDescEditing] = useState(false)
  const [descText, setDescText] = useState(pin.description || 'Read More')
  const [descPos, setDescPos] = useState({ 
    x: pin.descX ?? 50,
    y: pin.descY ?? 60
  })
  const [descFontSize, setDescFontSize] = useState(pin.descFontSize ?? 14)
  
  // Resize state
  const [resizing, setResizing] = useState(null) // 'title' or 'desc'
  const [isExporting, setIsExporting] = useState(false)
  
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const titleInputRef = useRef(null)
  const descRef = useRef(null)
  const descInputRef = useRef(null)
  const dragStartRef = useRef({ x: 0, y: 0, startX: 0, startY: 0, element: null })

  // Update local state when pin changes
  useEffect(() => {
    setTitlePos({ x: pin.titleX ?? 50, y: pin.titleY ?? 40 })
    setTitleText(pin.title || '{TITLE}')
    setTitleFontSize(pin.titleFontSize ?? 18)
    setDescPos({ x: pin.descX ?? 50, y: pin.descY ?? 60 })
    setDescText(pin.description || 'Read More')
    setDescFontSize(pin.descFontSize ?? 14)
  }, [pin.titleX, pin.titleY, pin.title, pin.titleFontSize, pin.descX, pin.descY, pin.description, pin.descFontSize])

  // Focus input when editing starts
  useEffect(() => {
    if (titleEditing && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [titleEditing])
  
  useEffect(() => {
    if (descEditing && descInputRef.current) {
      descInputRef.current.focus()
      descInputRef.current.select()
    }
  }, [descEditing])

  // Generic drag handler factory
  const createDragHandlers = (element, setPos, setDragging, setSelected, currentPos) => {
    const handleMouseDown = (e) => {
      if ((element === 'title' && titleEditing) || (element === 'desc' && descEditing)) return
      e.stopPropagation()
      setSelected(true)
      setDragging(true)
      
      // Deselect the other element
      if (element === 'title') {
        setDescSelected(false)
        if (descEditing) finishDescEditing()
      } else {
        setTitleSelected(false)
        if (titleEditing) finishTitleEditing()
      }
      
      const rect = containerRef.current.getBoundingClientRect()
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        startX: currentPos.x,
        startY: currentPos.y,
        width: rect.width,
        height: rect.height,
        element
      }

      const handleMove = (e) => {
        const dx = e.clientX - dragStartRef.current.x
        const dy = e.clientY - dragStartRef.current.y
        const pxToPercentX = (dx / dragStartRef.current.width) * 100
        const pxToPercentY = (dy / dragStartRef.current.height) * 100
        let newX = Math.max(10, Math.min(90, dragStartRef.current.startX + pxToPercentX))
        let newY = Math.max(10, Math.min(90, dragStartRef.current.startY + pxToPercentY))
        setPos({ x: newX, y: newY })
      }

      const handleUp = () => {
        setDragging(false)
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleUp)
      }

      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleUp)
    }
    return handleMouseDown
  }

  // Title drag handler
  const handleTitleMouseDown = createDragHandlers('title', setTitlePos, setTitleDragging, setTitleSelected, titlePos)
  
  // Description drag handler  
  const handleDescMouseDown = createDragHandlers('desc', setDescPos, setDescDragging, setDescSelected, descPos)

  // Resize handler for corner handles
  const createResizeHandler = (element, setFontSize, currentFontSize) => (e) => {
    e.stopPropagation()
    e.preventDefault()
    setResizing(element)
    
    const startY = e.clientY
    const startFontSize = currentFontSize
    
    const handleMove = (moveEvent) => {
      const dy = startY - moveEvent.clientY // Negative dy = dragging up = increase size
      const newSize = Math.max(10, Math.min(48, startFontSize + dy * 0.3))
      setFontSize(newSize)
    }
    
    const handleUp = () => {
      setResizing(null)
      saveAll()
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
    }
    
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
  }
  
  // Resize handlers
  const handleTitleResize = createResizeHandler('title', setTitleFontSize, titleFontSize)
  const handleDescResize = createResizeHandler('desc', setDescFontSize, descFontSize)

  // Title double click to edit
  const handleTitleDoubleClick = (e) => {
    e.stopPropagation()
    setTitleEditing(true)
    setTitleSelected(true)
  }
  
  // Description double click to edit
  const handleDescDoubleClick = (e) => {
    e.stopPropagation()
    setDescEditing(true)
    setDescSelected(true)
  }

  // Finish title editing
  const finishTitleEditing = () => {
    setTitleEditing(false)
    saveAll()
  }
  
  // Finish description editing
  const finishDescEditing = () => {
    setDescEditing(false)
    saveAll()
  }
  
  // Save all changes
  const saveAll = () => {
    onUpdatePin?.({
      ...pin,
      title: titleText,
      titleX: titlePos.x,
      titleY: titlePos.y,
      titleFontSize: titleFontSize,
      description: descText,
      descX: descPos.x,
      descY: descPos.y,
      descFontSize: descFontSize
    })
  }

  // Handle key down in title input
  const handleTitleKeyDown = (e) => {
    if (e.key === 'Enter') finishTitleEditing()
    else if (e.key === 'Escape') {
      setTitleText(pin.title || '{TITLE}')
      setTitleEditing(false)
    }
  }
  
  // Handle key down in desc input
  const handleDescKeyDown = (e) => {
    if (e.key === 'Enter') finishDescEditing()
    else if (e.key === 'Escape') {
      setDescText(pin.description || 'Read More')
      setDescEditing(false)
    }
  }

  // Click outside to deselect
  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target.closest('.pin-image-area')) {
      if (!e.target.closest('.draggable-element')) {
        setTitleSelected(false)
        setDescSelected(false)
        if (titleEditing) finishTitleEditing()
        if (descEditing) finishDescEditing()
      }
    }
  }

  const renderFallbackCanvas = async () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const width = 400
    const height = 600
    canvas.width = width
    canvas.height = height

    // Header color
    const colorMap = {
      pink: '#F472B6',
      orange: '#FB923C',
      peach: '#FDBA74',
      coral: '#F87171',
      green: '#A3E635',
      sage: '#84CC16',
    }
    const headerBgColor = pin.color?.startsWith('#') ? pin.color : (colorMap[pin.color] || '#4B5563')

    // Font
    const canvasFontMap = {
      'carter-one': "'Carter One', cursive",
      'roboto': "'Roboto', sans-serif",
      'open-sans': "'Open Sans', sans-serif",
      'lato': "'Lato', sans-serif",
      'montserrat': "'Montserrat', sans-serif",
      'serif': 'Georgia, serif',
      'sans-serif': 'Arial, sans-serif',
    }
    const canvasFont = canvasFontMap[pin.fontType] || 'Georgia, serif'
    const downloadTitle = pin.useUpperCase ? (pin.title || '{TITLE}').toUpperCase() : (pin.title || '{TITLE}')

    // Try to load image first
    let img = null
    if (pin.image) {
      try {
        img = new Image()
        img.crossOrigin = 'anonymous'
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = pin.image
          setTimeout(reject, 3000)
        })
      } catch (e) {
        img = null
      }
    }

    // Draw image or background
    if (img) {
      ctx.drawImage(img, 0, 0, width, height)
    } else {
      ctx.fillStyle = '#E5E7EB'
      ctx.fillRect(0, 0, width, height)
    }

    // White border frame overlay (matches inset-3 border-2)
    const frameInset = 12
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'
    ctx.lineWidth = 2
    ctx.strokeRect(frameInset, frameInset, width - frameInset * 2, height - frameInset * 2)

    // Draw title at saved position with background
    const titleXPos = (titlePos.x / 100) * width
    const titleYPos = (titlePos.y / 100) * height

    const scaledTitleFontSize = Math.round(titleFontSize * 1.5)
    ctx.font = `bold ${scaledTitleFontSize}px ${canvasFont}`
    const textMetrics = ctx.measureText(downloadTitle)
    const textWidth = textMetrics.width + 40
    const textHeight = scaledTitleFontSize + 20

    ctx.fillStyle = headerBgColor
    ctx.fillRect(titleXPos - textWidth / 2, titleYPos - textHeight / 2, textWidth, textHeight)

    ctx.fillStyle = pin.fontColor || '#ffffff'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(downloadTitle, titleXPos, titleYPos)

    // Draw description at saved position
    const descXPos = (descPos.x / 100) * width
    const descYPos = (descPos.y / 100) * height
    const descriptionText = pin.description || 'Read More'

    const scaledDescFontSize = Math.round(descFontSize * 1.5)
    ctx.font = `${scaledDescFontSize}px ${canvasFont}`
    const descMetrics = ctx.measureText(descriptionText)
    const descWidth = descMetrics.width + 30
    const descHeight = scaledDescFontSize + 16

    ctx.fillStyle = '#1f2937'
    if (ctx.roundRect) {
      ctx.beginPath()
      ctx.roundRect(descXPos - descWidth / 2, descYPos - descHeight / 2, descWidth, descHeight, 6)
      ctx.fill()
    } else {
      ctx.fillRect(descXPos - descWidth / 2, descYPos - descHeight / 2, descWidth, descHeight)
    }

    ctx.fillStyle = '#ffffff'
    ctx.fillText(descriptionText, descXPos, descYPos)

    return canvas
  }

  const handleDownload = async () => {
    const imageArea = containerRef.current?.querySelector('.pin-image-area')
    if (!imageArea) return

    setIsExporting(true)
    await new Promise((resolve) => requestAnimationFrame(resolve))

    try {
      let canvas = null
      try {
        canvas = await html2canvas(imageArea, {
          useCORS: true,
          backgroundColor: null,
          scale: 2
        })
      } catch (e) {
        canvas = await renderFallbackCanvas()
      }

      const link = document.createElement('a')
      link.download = `pin-${pin.id}.png`
      link.href = canvas.toDataURL('image/png')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } finally {
      setIsExporting(false)
    }
  }

  // Check if color is hex
  const isHexColor = pin.color?.startsWith('#')
  
  const colorStyles = {
    pink: 'bg-pink-400',
    orange: 'bg-orange-400',
    peach: 'bg-orange-300',
    coral: 'bg-red-400',
    green: 'bg-lime-400',
    sage: 'bg-lime-500',
  }

  const headerColor = isHexColor ? '' : (colorStyles[pin.color] || 'bg-gray-600')
  const headerStyle = isHexColor ? { backgroundColor: pin.color } : { backgroundColor: '#4B5563' }
  const fontColorStyle = pin.fontColor ? { color: pin.fontColor } : { color: '#ffffff' }

  // Font type mapping
  const fontFamilyMap = {
    'carter-one': "'Carter One', cursive",
    'roboto': "'Roboto', sans-serif",
    'open-sans': "'Open Sans', sans-serif",
    'lato': "'Lato', sans-serif",
    'montserrat': "'Montserrat', sans-serif",
    'serif': 'Georgia, serif',
    'sans-serif': 'Arial, sans-serif',
  }

  const fontFamily = fontFamilyMap[pin.fontType] || 'Georgia, serif'
  const displayTitle = pin.useUpperCase ? titleText.toUpperCase() : titleText

  return (
    <div 
      ref={containerRef}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
      onClick={handleContainerClick}
    >
      {/* Pin Content - Full image with draggable title overlay */}
      <div className="relative pin-image-area aspect-2/3 bg-gray-600 overflow-hidden">
        {/* Background Image or Color */}
        {pin.image ? (
          <img 
            src={pin.image} 
            alt={pin.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full" style={headerStyle} />
        )}

        {/* White border frame overlay */}
        <div className="absolute inset-3 border-2 border-white/50 pointer-events-none" />

        {/* Draggable Title Element */}
        <div
          ref={titleRef}
          className={`title-element draggable-element absolute cursor-move select-none transition-shadow ${titleSelected && !isExporting ? 'z-20 ring-1 ring-blue-400' : 'z-10'}`}
          style={{
            left: `${titlePos.x}%`,
            top: `${titlePos.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseDown={handleTitleMouseDown}
          onDoubleClick={handleTitleDoubleClick}
        >
          {/* Selection handles */}
          {titleSelected && !isExporting && (
            <>
              {/* Corner handles - resizable */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-nwse-resize" onMouseDown={handleTitleResize} />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-nesw-resize" onMouseDown={handleTitleResize} />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-nesw-resize" onMouseDown={handleTitleResize} />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-nwse-resize" onMouseDown={handleTitleResize} />
              {/* Edge handles */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-ns-resize" onMouseDown={handleTitleResize} />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-ns-resize" onMouseDown={handleTitleResize} />
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
              {/* Selection border */}
              <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none" />
            </>
          )}

          {/* Title content */}
          <div 
            className={`px-4 py-2 ${isHexColor ? '' : headerColor}`}
            style={headerStyle}
          >
            {titleEditing ? (
              <input
                ref={titleInputRef}
                type="text"
                value={titleText}
                onChange={(e) => setTitleText(e.target.value)}
                onBlur={finishTitleEditing}
                onKeyDown={handleTitleKeyDown}
                className="bg-transparent border-none outline-none text-center font-bold min-w-[80px]"
                style={{ fontFamily, fontSize: `${titleFontSize}px`, ...fontColorStyle }}
              />
            ) : (
              <span 
                className="font-bold drop-shadow-md whitespace-nowrap"
                style={{ fontFamily, fontSize: `${titleFontSize}px`, ...fontColorStyle }}
              >
                {displayTitle}
              </span>
            )}
          </div>
        </div>

        {/* Draggable Description Element */}
        <div
          ref={descRef}
          className={`desc-element draggable-element absolute cursor-move select-none transition-shadow ${descSelected && !isExporting ? 'z-20 ring-1 ring-blue-400' : 'z-10'}`}
          style={{
            left: `${descPos.x}%`,
            top: `${descPos.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          onMouseDown={handleDescMouseDown}
          onDoubleClick={handleDescDoubleClick}
        >
          {/* Selection handles */}
          {descSelected && !isExporting && (
            <>
              {/* Corner handles - resizable */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-nwse-resize" onMouseDown={handleDescResize} />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-nesw-resize" onMouseDown={handleDescResize} />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-nesw-resize" onMouseDown={handleDescResize} />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-nwse-resize" onMouseDown={handleDescResize} />
              {/* Edge handles */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-ns-resize" onMouseDown={handleDescResize} />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white cursor-ns-resize" onMouseDown={handleDescResize} />
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
              {/* Selection border */}
              <div className="absolute inset-0 border-2 border-blue-500 pointer-events-none" />
            </>
          )}

          {/* Description content */}
          <div className="px-3 py-1.5 bg-gray-800 rounded">
            {descEditing ? (
              <input
                ref={descInputRef}
                type="text"
                value={descText}
                onChange={(e) => setDescText(e.target.value)}
                onBlur={finishDescEditing}
                onKeyDown={handleDescKeyDown}
                className="bg-transparent border-none outline-none text-center min-w-[60px] text-white"
                style={{ fontFamily, fontSize: `${descFontSize}px` }}
              />
            ) : (
              <span 
                className="text-white whitespace-nowrap"
                style={{ fontFamily, fontSize: `${descFontSize}px` }}
              >
                {descText}
              </span>
            )}
          </div>
        </div>

        {/* Delete overlay button */}
        <button
          className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow text-red-500 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto z-30"
          title="Delete"
          onClick={(e) => { e.stopPropagation(); onDelete?.(pin.id) }}
          aria-label="Delete pin"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* Action Icons */}
      <div className="p-2 border-t flex items-center justify-center gap-2">
        <button className="p-1.5 hover:bg-pink-100 rounded text-pink-500 transition-colors" title="Share to Pinterest">
          <Share2 className="h-4 w-4" />
        </button>
        <button className="p-1.5 hover:bg-primary/10 rounded text-primary transition-colors" title="Schedule">
          <Clock className="h-4 w-4" />
        </button>
        <button 
          className="p-1.5 hover:bg-primary/10 rounded text-primary transition-colors" 
          title="Download"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
        </button>
        <button 
          className="p-1.5 hover:bg-primary/10 rounded text-primary transition-colors" 
          title="Shuffle"
          onClick={() => onShuffle?.(pin.id)}
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <button className="p-1.5 hover:bg-primary/10 rounded text-primary transition-colors" title="Duplicate">
          <Copy className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default PinCard
