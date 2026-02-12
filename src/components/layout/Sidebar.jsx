import { ChevronLeft, X } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import ColorsAndFont from '@/components/sidebar/ColorsAndFont'
import Templates from '@/components/sidebar/Templates'
import BrandSettings from '@/components/sidebar/BrandSettings'
import Images from '@/components/sidebar/Images'
import StockImages from '@/components/sidebar/StockImages'
import Videos from '@/components/sidebar/Videos'
import AIOptions from '@/components/sidebar/AIOptions'
import BulkSettings from '@/components/sidebar/BulkSettings'
import SocialPromo from '@/components/sidebar/SocialPromo'

const Sidebar = ({ 
  isVisible, 
  onToggle, 
  url, 
  setUrl, 
  pinCount, 
  setPinCount, 
  onGeneratePins, 
  onShufflePins 
}) => {
  return (
    <aside className={`${isVisible ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r flex flex-col overflow-hidden`}>
      {/* Toggle button */}
      <div className="flex items-center justify-end p-2 border-b">
        <button 
          onClick={onToggle}
          className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          HIDE
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* URL Input */}
        <div className="space-y-2">
          <div className="relative">
            <Input
              placeholder="Enter any URL or sitemap URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pr-8 text-sm"
            />
            <button 
              onClick={() => setUrl('https://')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 justify-center">
            <a href="#" className="text-primary text-sm hover:underline">Upload via CSV</a>
            <a href="#" className="text-gray-500 text-sm hover:underline">(demo file)</a>
          </div>
        </div>

        {/* Generate Pins Button */}
        <div className="flex gap-2">
          <Button 
            className="flex-1"
            onClick={onGeneratePins}
          >
            <span className="text-lg mr-1">⊕</span> GENERATE PINS
          </Button>
          <Input
            type="number"
            value={pinCount}
            onChange={(e) => setPinCount(parseInt(e.target.value) || 1)}
            className="w-16 text-center"
            min={1}
            max={50}
          />
        </div>

        {/* Shuffle Pins */}
        <Button 
          variant="outline" 
          className="w-full text-gray-600 border-primary text-primary hover:bg-primary/10"
          onClick={onShufflePins}
        >
          ↻ SHUFFLE PINS
        </Button>

        {/* Schedule & Download */}
        <div className="flex gap-2">
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            SCHEDULE ALL
          </Button>
          <Button className="flex-1 bg-primary hover:bg-primary/90">
            DOWNLOAD ALL
          </Button>
        </div>

        {/* Social Promo Card */}
        <SocialPromo />

        {/* Accordion Sections */}
        <div className="space-y-0">
          <ColorsAndFont />
          <Templates />
          <BrandSettings />
          <Images />
          <StockImages />
          <Videos />
          <AIOptions />
          <BulkSettings />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
