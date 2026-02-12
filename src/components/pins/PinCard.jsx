import { useState } from 'react'
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

const PinCard = ({ pin, onDelete, onShuffle, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleDownload = async () => {
    // Create canvas manually for more reliable download
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    // Pin dimensions
    const width = 400
    const height = 600
    canvas.width = width
    canvas.height = height

    // Background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    // Header color mapping
    const colorMap = {
      pink: '#F472B6',
      orange: '#FB923C',
      peach: '#FDBA74',
      coral: '#F87171',
      green: '#A3E635',
      sage: '#84CC16',
    }

    // Draw colored header
    ctx.fillStyle = colorMap[pin.color] || '#F472B6'
    ctx.fillRect(0, 0, width, 80)

    // Draw title text
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 28px serif'
    ctx.textAlign = 'center'
    ctx.fillText(pin.title || '{TITLE}', width / 2, 50)

    // Draw shorturl band
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 80, width, 40)
    ctx.fillStyle = '#9CA3AF'
    ctx.font = '12px sans-serif'
    ctx.fillText(pin.shortUrl || '[SHORTURL]', width / 2, 105)

    // Draw image area background
    ctx.fillStyle = '#E5E7EB'
    ctx.fillRect(0, 120, width, height - 120)

    // Try to load and draw the image
    if (pin.image) {
      try {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          // Use a proxy or direct URL
          img.src = pin.image
          setTimeout(reject, 3000) // 3s timeout
        })

        // Draw image to fill the area
        const imgY = 120
        const imgHeight = height - imgY
        ctx.drawImage(img, 0, imgY, width, imgHeight)
      } catch (e) {
        // Image failed to load, show placeholder
        ctx.fillStyle = '#9CA3AF'
        ctx.font = '16px sans-serif'
        ctx.fillText('Image', width / 2, height / 2 + 60)
      }
    }

    // Download
    const link = document.createElement('a')
    link.download = `pin-${pin.id}.png`
    link.href = canvas.toDataURL('image/png')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const colorStyles = {
    pink: 'bg-pink-400',
    orange: 'bg-orange-400',
    peach: 'bg-orange-300',
    coral: 'bg-red-400',
    green: 'bg-lime-400',
    sage: 'bg-lime-500',
  }

  const headerColor = colorStyles[pin.color] || 'bg-pink-400'

  return (
    <div 
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Pin Content */}
      <div className="relative">
        {/* Colored Header with Title */}
        <div className={`${headerColor} p-4 text-center`}>
          <h3 className="text-white font-bold text-xl tracking-wide" style={{ fontFamily: 'serif' }}>
            {pin.title || '{TITLE}'}
          </h3>
        </div>

        {/* White band with shorturl */}
        <div className="bg-white py-2 px-4 text-center border-b">
          <span className="text-gray-400 text-xs uppercase tracking-wider">
            {pin.shortUrl || '[SHORTURL]'}
          </span>
        </div>

        {/* Image Area */}
        <div className="relative aspect-3/4 bg-gray-100 flex items-center justify-center overflow-hidden">
          {pin.image ? (
            <img 
              src={pin.image} 
              alt={pin.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-b from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No Image</span>
            </div>
          )}

          {/* Delete overlay button shown on/after image */}
          <button
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow text-red-500 opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100 group-hover:pointer-events-auto"
            title="Delete"
            onClick={() => onDelete?.(pin.id)}
            aria-label="Delete pin"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Action Icons - Row 1 */}
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
          title="Edit"
          onClick={() => onEdit?.(pin)}
        >
          <Edit3 className="h-4 w-4" />
        </button>
      </div>

      {/* Action Icons - Row 2 */}
      <div className="px-2 pb-2 flex items-center justify-center gap-2">
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
        <button className="p-1.5 hover:bg-primary/10 rounded text-primary transition-colors" title="Lock">
          <Lock className="h-4 w-4" />
        </button>
        <button className="p-1.5 hover:bg-primary/10 rounded text-primary transition-colors" title="Settings">
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default PinCard
