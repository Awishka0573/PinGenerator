import { useState } from 'react'
import { LayoutTemplate } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Checkbox, Label, Button } from '@/components/ui'

const Templates = () => {
  const [randomize, setRandomize] = useState(false)
  const [useOneOfEach, setUseOneOfEach] = useState(false)
  const [selectedCount, setSelectedCount] = useState(1)

  return (
    <Accordion type="single" collapsible className="border-0">
      <AccordionItem value="templates" className="border-b">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <LayoutTemplate className="h-4 w-4 text-primary" />
            <span className="font-medium">Templates</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="randomize" 
                  checked={randomize}
                  onCheckedChange={setRandomize}
                />
                <Label htmlFor="randomize" className="text-sm cursor-pointer">Randomize</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="use-one-each" 
                  checked={useOneOfEach}
                  onCheckedChange={setUseOneOfEach}
                />
                <Label htmlFor="use-one-each" className="text-sm cursor-pointer">Use one of each selected template</Label>
              </div>
            </div>

            {/* Select Templates Button */}
            <Button className="w-full bg-primary hover:bg-primary/90">
              SELECT TEMPLATES ({selectedCount})
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Templates
