import { useState } from 'react'
import { Video, Search } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Input, Button } from '@/components/ui'

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Accordion type="single" collapsible className="border-0">
      <AccordionItem value="videos" className="border-b">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <Video className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Videos</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search stock video"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Upload Button */}
            <Button className="w-full bg-primary hover:bg-primary/90">
              UPLOAD VIDEOS
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Videos
