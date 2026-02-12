import { useState } from 'react'
import { Settings, Save } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Input, Button } from '@/components/ui'

const BulkSettings = () => {
  const [allTitles, setAllTitles] = useState('')
  const [allDescriptions, setAllDescriptions] = useState('')
  const [allOutboundLinks, setAllOutboundLinks] = useState('')
  const [appendToUrls, setAppendToUrls] = useState('')
  const [allUrlText, setAllUrlText] = useState('')

  return (
    <Accordion type="single" collapsible className="border-0">
      <AccordionItem value="bulk-settings" className="border-b">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Bulk Settings</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {/* Set All Titles */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="Set all titles"
                value={allTitles}
                onChange={(e) => setAllTitles(e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Save className="h-4 w-4 text-gray-400" />
              </Button>
            </div>

            {/* Set All Descriptions */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="Set all descriptions"
                value={allDescriptions}
                onChange={(e) => setAllDescriptions(e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Save className="h-4 w-4 text-gray-400" />
              </Button>
            </div>

            {/* Set All Outbound Links */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="Set all outbound links"
                value={allOutboundLinks}
                onChange={(e) => setAllOutboundLinks(e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Save className="h-4 w-4 text-gray-400" />
              </Button>
            </div>

            {/* Append to All URLs */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Append to all URLs"
                  value={appendToUrls}
                  onChange={(e) => setAppendToUrls(e.target.value)}
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Save className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
              <p className="text-xs text-gray-400">
                Add tracking codes or affiliate IDs to existing URLs
              </p>
            </div>

            {/* Set All URL Text */}
            <div className="flex items-center gap-2">
              <Input
                placeholder="Set all URL Text"
                value={allUrlText}
                onChange={(e) => setAllUrlText(e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Save className="h-4 w-4 text-gray-400" />
              </Button>
            </div>

            {/* Add to Catalog Button */}
            <Button className="w-full bg-primary hover:bg-primary/90">
              ADD ALL PINS TO CATALOG ITEM
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default BulkSettings
