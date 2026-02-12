import { useState } from 'react'
import { Image, RefreshCw, Folder } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Checkbox, Label, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui'

const Images = () => {
  const [randomizeImages, setRandomizeImages] = useState(false)
  const [useOneOfEach, setUseOneOfEach] = useState(false)
  const [showFullImage, setShowFullImage] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState('all')

  return (
    <Accordion type="single" collapsible className="border-0">
      <AccordionItem value="images" className="border-b">
        <AccordionTrigger className="hover:no-underline py-3">
          <div className="flex items-center gap-2">
            <Image className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Images</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="randomize-images" 
                    checked={randomizeImages}
                    onCheckedChange={setRandomizeImages}
                  />
                  <Label htmlFor="randomize-images" className="text-sm cursor-pointer">Randomize Images</Label>
                </div>
                <button className="text-gray-400 hover:text-primary">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="use-one-image" 
                  checked={useOneOfEach}
                  onCheckedChange={setUseOneOfEach}
                />
                <Label htmlFor="use-one-image" className="text-sm cursor-pointer">Use one of each image</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="show-full-image" 
                  checked={showFullImage}
                  onCheckedChange={setShowFullImage}
                />
                <Label htmlFor="show-full-image" className="text-sm cursor-pointer">Show full image in available space</Label>
              </div>
            </div>

            {/* Folder Select */}
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4 text-gray-400" />
              <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="All Folders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Folders</SelectItem>
                  <SelectItem value="uploads">Uploads</SelectItem>
                  <SelectItem value="favorites">Favorites</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Buttons */}
            <Button className="w-full bg-primary hover:bg-primary/90">
              UPLOAD IMAGES
            </Button>
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
              CREATE AI IMAGES
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default Images
