import { Plus, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui'

const MainContent = () => {
  const tutorials = [
    { title: 'Introduction Video', id: 1 },
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
        {/* Canvas toolbar */}
        <div className="mb-4">
          <button className="p-2 hover:bg-gray-200 rounded">
            <svg className="h-5 w-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16v16H4z" />
              <path d="M4 4l16 16M20 4L4 20" />
            </svg>
          </button>
        </div>

        {/* Pin Preview Area */}
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 mb-8 min-h-[300px] flex items-center justify-center">
          <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition-colors">
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Tutorials Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {tutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden bg-primary/10 border-primary/20 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Play button */}
                    <div className="flex-shrink-0">
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
                    <div className="flex-shrink-0 grid grid-cols-2 gap-1">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainContent
