import { useState } from 'react'
import { Plus, Play, Trash2 } from 'lucide-react'
import { Card, CardContent, Dialog, DialogContent, DialogFooter, Button } from '@/components/ui'
import { PinCard } from '@/components/pins'

const MainContent = ({ pins = [], onDeletePin, onShufflePin, onEditPin, onClearPins, onLayoutChange, onUpdatePin }) => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const tutorials = [
    { title: 'Introduction Video', id: 1, url: 'https://www.youtube.com/watch?v=6WOOL9XDl0s' },
    { title: 'Full Automation Guide', id: 2 },
    { title: 'Create Dynamic Templates', id: 3 },
    { title: 'Shopify Tutorial', id: 4 },
    { title: 'Etsy Tutorial', id: 5 },
    { title: 'Amazon Tutorial', id: 6 },
    { title: 'Wordpress Tutorial', id: 7 },
    { title: 'Pinterest SEO Guide', id: 8 },
  ]

  return (
    <main className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="p-6">
        {/* Toolbar: show clear button only after pins are generated */}
        <div className="mb-4">
          {pins && pins.length > 0 ? (
            <>
              <button
                className="p-2 hover:bg-gray-200 rounded flex items-center gap-1"
                title="Clear generated pins"
                onClick={() => setConfirmOpen(true)}
              >
                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center">
                  <Trash2 className="h-4 w-4 text-pink-500" />
                </div>
              </button>

              <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent className="max-w-sm">
                  <h3 className="text-lg font-semibold">Clear generated pins?</h3>
                  <p className="text-sm text-gray-600 mt-2">This will remove all generated pins from this page and from saved storage.</p>
                  <DialogFooter className="mt-4 flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button
                      onClick={() => {
                        onClearPins?.()
                        setConfirmOpen(false)
                      }}
                      className="bg-pink-500 text-white"
                    >
                      Clear
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <div style={{ height: 40 }} />
          )}
        </div>

        {/* Pins Grid or Empty State */}
        {pins.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
            {pins.map((pin) => (
              <PinCard 
                key={pin.id} 
                pin={pin} 
                onDelete={onDeletePin}
                onShuffle={onShufflePin}
                onEdit={onEditPin}
                onLayoutChange={onLayoutChange}
                onUpdatePin={onUpdatePin}
              />
            ))}
          </div>
        ) : (
          /* Pin Preview Area - Empty State */
          <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 min-h-75 flex items-center justify-center">
            <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors">
              <Plus className="h-6 w-6" />
            </button>
          </div>
        )}

        {/* Tutorials Section - Only show when no pins generated */}
        {pins.length === 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {tutorials.map((tutorial) => (
              <Card
                key={tutorial.id}
                className="overflow-hidden bg-primary/10 border-primary/20 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <a
                    href={tutorial.url || '#'}
                    target={tutorial.url ? '_blank' : undefined}
                    rel={tutorial.url ? 'noreferrer' : undefined}
                    className={`block p-4 ${tutorial.url ? 'cursor-pointer' : 'cursor-default'}`}
                    onClick={(e) => {
                      if (!tutorial.url) e.preventDefault()
                    }}
                  >
                  <div className="flex gap-3">
                    {/* Play button */}
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                        <Play className="h-5 w-5 text-primary fill-primary" />
                      </div>
                    </div>
                    {/* Title */}
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 leading-tight text-lg">
                        {tutorial.title}
                      </h3>
                    </div>
                    {/* Preview images */}
                    <div className="shrink-0 grid grid-cols-2 gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-10 bg-primary/20 rounded flex items-center justify-center">
                          <div className="w-4 h-4 bg-primary/40 rounded-sm"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-1.5 h-1.5 bg-primary rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-sm"></div>
                      </div>
                      <span className="text-xs text-gray-500 ml-1">PIN GENERATOR</span>
                    </div>
                  </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        )}
      </div>
    </main>
  )
}

export default MainContent
