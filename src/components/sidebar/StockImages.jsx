import { useState } from 'react'
import { Image, Search } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Input } from '@/components/ui'

const StockImages = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Accordion type="single" collapsible className="border-0">
      <AccordionItem value="stock-images" className="border-b">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <Image className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Stock images</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search stock images"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Pexels Attribution */}
            <p className="text-sm text-gray-500">
              Media by <a href="https://pexels.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Pexels</a>
            </p>
            <p className="text-xs text-gray-400">
              Drag and drop any image onto any template image to replace it.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default StockImages
