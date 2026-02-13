import { X } from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'

const SocialPromo = () => {
  return (
    <Card className="bg-primary/10 border-primary/20 relative">
      <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
      <CardContent className="p-4">
        <h3 className="font-bold text-gray-800 mb-1">Love this Tool?</h3>
        <p className="text-sm text-gray-600 mb-3">
          Generate content for 5 platforms with Content Generator.
        </p>
        <Button variant="outline" className="w-full bg-white hover:bg-gray-50 border-gray-300">
          CHECK IT OUT
        </Button>
        
        {/* Social Icons */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-8 h-8 rounded-full bg-[#BD081C] flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">📷</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center">
            <span className="text-white text-xs font-bold">in</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
            <span className="text-white text-xs font-bold">X</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center">
            <span className="text-white text-xs font-bold">f</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SocialPromo
