import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Input, Button, Label } from '@/components/ui'

const BrandSettings = () => {
  const [brandName, setBrandName] = useState('')
  const [etsyStoreName, setEtsyStoreName] = useState('')

  return (
    <Accordion type="single" collapsible className="border-0">
      <AccordionItem value="brand-settings" className="border-b">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium">Brand settings</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Save all your design settings here. This will ensure that all your colors, selected templates etc are loaded each time you log in.
            </p>

            {/* Brand Name */}
            <div className="space-y-2">
              <Input
                placeholder="Set brand name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </div>

            {/* Set Logo Button */}
            <Button className="w-full bg-primary hover:bg-primary/90">
              SET LOGO
            </Button>

            {/* Etsy Store Name */}
            <div className="space-y-2">
              <Input
                placeholder="Type the Etsy store name"
                value={etsyStoreName}
                onChange={(e) => setEtsyStoreName(e.target.value)}
              />
              <p className="text-xs text-gray-500">
                This helps hide similar listings when people click on your store. Please enter in your official Etsy store name without spaces E.g. MyStoreName
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default BrandSettings
