import { useState } from 'react'
import { Bot } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Input, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Checkbox, Label } from '@/components/ui'

const AIOptions = () => {
  const [aiLanguage, setAiLanguage] = useState('english')
  const [aiTone, setAiTone] = useState('neutral')
  const [aiKeywords, setAiKeywords] = useState('')
  const [generateAltText, setGenerateAltText] = useState(false)

  return (
    <Accordion type="single" collapsible className="border-0">
      <AccordionItem value="ai-options" className="border-b">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-gray-500" />
            <span className="font-medium">AI Options</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {/* Rewrite Buttons */}
            <Button className="w-full bg-primary hover:bg-primary/90">
              REWRITE ALL TITLES
            </Button>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
              REWRITE ALL DESCRIPTIONS
            </Button>

            {/* AI Language */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">AI language</Label>
              <Select value={aiLanguage} onValueChange={setAiLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="french">French</SelectItem>
                  <SelectItem value="german">German</SelectItem>
                  <SelectItem value="portuguese">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* AI Tone */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">AI Tone</Label>
              <Input
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                placeholder="Neutral"
              />
            </div>

            {/* AI Keywords */}
            <div className="space-y-2">
              <Label className="text-xs text-gray-500">AI Keywords</Label>
              <Input
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
                placeholder="Enter keywords"
              />
              <p className="text-xs text-primary">
                Please connect a Pinterest account to see keyword suggestions
              </p>
            </div>

            {/* Generate Alt Text */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="generate-alt-text" 
                checked={generateAltText}
                onCheckedChange={setGenerateAltText}
              />
              <Label htmlFor="generate-alt-text" className="text-sm cursor-pointer">Generate alt text with AI</Label>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default AIOptions
