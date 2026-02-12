import { useState, useEffect } from 'react'
import { Bot, Plus } from 'lucide-react'
import { 
  Dialog, 
  DialogContent, 
  DialogFooter,
  Button, 
  Input, 
  Label 
} from '@/components/ui'

const PinEditModal = ({ pin, isOpen, onClose, onSave, onDownload }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    altText: '',
    outboundUrl: '',
    urlText: '',
    scheduledDate: '',
  })

  useEffect(() => {
    if (pin) {
      setFormData({
        title: pin.title || '{TITLE}',
        description: pin.description || '',
        altText: pin.altText || '',
        outboundUrl: pin.outboundUrl || '',
        urlText: pin.urlText || '',
        scheduledDate: pin.scheduledDate || '',
      })
    }
  }, [pin])

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave({ ...pin, ...formData })
    onClose()
  }

  const handleDownload = async () => {
    // Create canvas manually for reliable download
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    
    const width = 400
    const height = 550
    canvas.width = width
    canvas.height = height

    // Background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)

    // Draw title
    ctx.fillStyle = '#1a1a1a'
    ctx.font = 'bold 32px serif'
    ctx.textAlign = 'center'
    ctx.fillText(formData.title || '{TITLE}', width / 2, 50)

    // Draw READ MORE button
    ctx.strokeStyle = '#1a1a1a'
    ctx.lineWidth = 2
    ctx.strokeRect(140, 70, 120, 40)
    ctx.fillStyle = '#1a1a1a'
    ctx.font = 'bold 14px sans-serif'
    ctx.fillText('READ MORE', width / 2, 95)

    // Draw image area
    ctx.fillStyle = '#E5E7EB'
    ctx.fillRect(0, 130, width, height - 130)

    // Try to load image
    if (pin.image) {
      try {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = pin.image
          setTimeout(reject, 3000)
        })
        ctx.drawImage(img, 0, 130, width, height - 130)
      } catch (e) {
        ctx.fillStyle = '#9CA3AF'
        ctx.font = '16px sans-serif'
        ctx.fillText('Image', width / 2, height / 2 + 60)
      }
    }

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

  const headerColor = colorStyles[pin?.color] || 'bg-pink-400'

  if (!pin) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-4">
            {/* Pin Title */}
            <div className="space-y-2">
              <div className="relative">
                <Input
                  placeholder="Pin Title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="pr-10"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80">
                  <Bot className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Pin Description */}
            <div className="space-y-2">
              <div className="relative">
                <textarea
                  placeholder="Pin Description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  className="w-full min-h-24 px-3 py-2 border border-input rounded-md text-sm resize-none focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <button className="absolute right-2 top-2 text-primary hover:text-primary/80">
                  <Bot className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Image alt text */}
            <div className="space-y-1">
              <Input
                placeholder="Image alt text"
                value={formData.altText}
                onChange={(e) => handleChange('altText', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Generate this automatically. Turn on AI alt text in the sidebar.
              </p>
            </div>

            {/* Pin outbound link URL */}
            <div className="space-y-2">
              <Input
                placeholder="Pin outbound link URL"
                value={formData.outboundUrl}
                onChange={(e) => handleChange('outboundUrl', e.target.value)}
              />
            </div>

            {/* Pin URL text on Pin Image */}
            <div className="space-y-1">
              <Input
                placeholder="Pin URL text on Pin Image"
                value={formData.urlText}
                onChange={(e) => handleChange('urlText', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Some templates don't have this field.
              </p>
            </div>

            {/* Scheduled Post Date */}
            <div className="space-y-1">
              <Label className="text-xs text-gray-500">Scheduled Post Date</Label>
              <Input
                type="datetime-local"
                value={formData.scheduledDate}
                onChange={(e) => handleChange('scheduledDate', e.target.value)}
              />
              <p className="text-xs text-gray-500">
                Optional: Set a specific date and time for scheduling this post
              </p>
            </div>

            {/* Add Pinterest Profile Button */}
            <Button variant="outline" className="w-full border-gray-300">
              <Plus className="h-4 w-4 mr-2" />
              ADD A PINTEREST PROFILE
            </Button>
          </div>

          {/* Right Column - Preview */}
          <div className="flex flex-col items-center">
            <div 
              className="bg-white rounded-lg shadow-lg overflow-hidden w-64"
            >
              {/* Title Section */}
              <div className="bg-white p-6 text-center">
                <h2 
                  className="text-3xl font-bold tracking-wide text-gray-900"
                  style={{ fontFamily: 'serif' }}
                >
                  {formData.title || '{TITLE}'}
                </h2>
              </div>

              {/* Read More Button */}
              <div className="px-6 pb-4 flex justify-center">
                <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 font-medium text-sm hover:bg-gray-900 hover:text-white transition-colors">
                  READ MORE
                </button>
              </div>

              {/* Image */}
              <div className="aspect-square overflow-hidden">
                {pin.image ? (
                  <img 
                    src={pin.image} 
                    alt={formData.altText || formData.title}
                    className="w-full h-full object-cover"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="mt-6">
          <Button variant="ghost" onClick={onClose} className="text-primary">
            CANCEL
          </Button>
          <Button onClick={handleSave}>
            SAVE
          </Button>
          <Button variant="outline" onClick={handleDownload} className="ml-2">
            DOWNLOAD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default PinEditModal
