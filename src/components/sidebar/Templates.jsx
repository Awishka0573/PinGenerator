import { useMemo, useState } from 'react'
import { LayoutTemplate, Plus } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, Checkbox, Label, Button, Dialog, DialogContent } from '@/components/ui'
import { TEMPLATES, TEMPLATE_CATEGORIES, TEMPLATE_PACKS } from '@/data/templates'

const Templates = ({ selectedTemplateIds = [], onSelectedTemplateIdsChange }) => {
  const [randomize, setRandomize] = useState(false)
  const [useOneOfEach, setUseOneOfEach] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('basic')
  const previewAccent = '#26B6A4'

  const selectedCount = selectedTemplateIds.length

  const selectedTemplates = useMemo(() => {
    return TEMPLATES.filter((template) => selectedTemplateIds.includes(template.id))
  }, [selectedTemplateIds])

  const visibleTemplates = useMemo(() => {
    if (activeCategory === 'selected') return selectedTemplates
    if (activeCategory === 'your' || activeCategory === 'shared' || activeCategory === 'favorites') return []
    return TEMPLATES.filter((template) => template.category === activeCategory)
  }, [activeCategory, selectedTemplates])

  const updateSelectedTemplates = onSelectedTemplateIdsChange || (() => {})

  const toggleTemplate = (templateId) => {
    if (selectedTemplateIds.includes(templateId)) {
      updateSelectedTemplates([])
      return
    }
    updateSelectedTemplates([templateId])
  }

  const templateStyles = {
    'basic-big-top-banner': { topBanner: true, frame: true },
    'basic-big-top-text': { topBanner: true, frame: true, topBannerHeight: 'h-10' },
    'basic-blank-frame': { frame: true },
    'basic-call-to-action': { bottomBanner: true, frame: true, bottomBannerHeight: 'h-10' },
    'basic-center-wave': { wave: true, frame: true },
    'basic-circle-image': { circleFrame: true, bottomBanner: true, frame: true },
    'basic-color-blobs': { blobs: true, frame: true },
    'basic-full-image-banner': { bottomBanner: true, frame: true },
    'basic-image-only': { frame: false },
    'basic-text-blob': { textBlob: true, frame: true },
    'blocks-layered': { topBanner: true, bottomBanner: true, frame: true },
    'blocks-diagonal': { blobs: true, wave: true, frame: true },
    'clean-frame': { frame: true },
    'clean-top-label': { topBanner: true, frame: true, topBannerHeight: 'h-8' },
    'education-highlight': { textBlob: true, frame: true },
    'education-checklist': { bottomBanner: true, frame: true, bottomBannerHeight: 'h-8' },
    'girl-boss-glam': { topBanner: true, textBlob: true, frame: true },
    'girl-boss-quote': { textBlob: true, frame: true },
    'grey-soft-frame': { frame: true },
    'grey-minimal': { topBanner: true, frame: true, topBannerHeight: 'h-8' },
    'interior-room': { bottomBanner: true, circleFrame: true, frame: true, bottomBannerHeight: 'h-8' },
    'interior-mood': { wave: true, frame: true },
  }

  const renderTemplatePreview = (templateId, titleLabel) => {
    const config = templateStyles[templateId] || { frame: true }
    const showFrame = config.frame !== false
    const titleText = titleLabel.split(' ')[0] || 'Template'

    return (
      <div className="relative h-28 bg-gray-200 rounded overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200" />
        {config.topBanner && (
          <div className={`absolute inset-x-0 top-0 ${config.topBannerHeight || 'h-8'}`} style={{ backgroundColor: previewAccent }} />
        )}
        {config.bottomBanner && (
          <div className={`absolute inset-x-0 bottom-0 ${config.bottomBannerHeight || 'h-8'}`} style={{ backgroundColor: previewAccent }} />
        )}
        {config.wave && (
          <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-8 rounded-full opacity-80" style={{ backgroundColor: previewAccent }} />
        )}
        {config.textBlob && (
          <div className="absolute left-1/2 top-1/2 w-20 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80" style={{ backgroundColor: previewAccent }} />
        )}
        {config.circleFrame && (
          <div className="absolute left-1/2 top-4 w-10 h-10 -translate-x-1/2 rounded-full border-2 border-white/80" />
        )}
        {config.blobs && (
          <>
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full opacity-70" style={{ backgroundColor: previewAccent }} />
            <div className="absolute top-6 -right-4 w-10 h-10 rounded-full opacity-60" style={{ backgroundColor: previewAccent }} />
            <div className="absolute bottom-2 left-3 w-7 h-7 rounded-full opacity-65" style={{ backgroundColor: previewAccent }} />
          </>
        )}
        {showFrame && (
          <div className="absolute inset-3 border border-white/70 pointer-events-none" />
        )}
        <div className="absolute left-1/2 bottom-6 -translate-x-1/2 bg-white/90 px-2 py-1 rounded text-[10px] text-gray-500">
          {titleText}
        </div>
      </div>
    )
  }

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
            <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => setOpen(true)}>
              SELECT TEMPLATES ({selectedCount})
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl p-0">
          <div className="flex h-[70vh] overflow-hidden">
            <aside className="w-60 border-r bg-white p-4 overflow-y-auto">
              <div className="space-y-1">
                {TEMPLATE_CATEGORIES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCategory(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                      activeCategory === item.id ? 'bg-gray-100 font-medium text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold text-gray-800 mb-2">Template packs</div>
                <div className="space-y-1">
                  {TEMPLATE_PACKS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveCategory(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm ${
                        activeCategory === item.id ? 'bg-gray-100 font-medium text-gray-900' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            <div className="flex-1 p-6 overflow-y-auto">
              {activeCategory === 'your' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button
                    type="button"
                    className="border rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:border-gray-400"
                  >
                    <div className="w-24 h-16 bg-gray-200 rounded flex items-center justify-center">
                      <Plus className="h-6 w-6 text-gray-600" />
                    </div>
                    <span className="text-sm text-gray-700">Add new template...</span>
                  </button>
                </div>
              )}

              {activeCategory !== 'your' && visibleTemplates.length === 0 && (
                <div className="text-sm text-gray-500">No templates available.</div>
              )}

              {visibleTemplates.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {visibleTemplates.map((template) => {
                    const isSelected = selectedTemplateIds.includes(template.id)
                    return (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => toggleTemplate(template.id)}
                        className={`border rounded-lg p-3 text-left hover:shadow-sm transition-shadow ${
                          isSelected ? 'border-primary ring-1 ring-primary/30' : 'border-gray-200'
                        }`}
                      >
                        {renderTemplatePreview(template.id, template.name)}
                        <div className="mt-2">
                          <div className="text-sm font-medium text-gray-800">{template.name}</div>
                          <div className="text-xs text-gray-500">{template.size}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t p-4">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button className="bg-primary hover:bg-primary/90" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Accordion>
  )
}

export default Templates
