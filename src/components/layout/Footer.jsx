import { Youtube, Twitter } from 'lucide-react'
import { Button, Card, CardContent } from '@/components/ui'

const Footer = () => {
  const footerLinks = {
    howToUse: {
      title: 'How to use Pin Generator',
      links: [
        'Beginners guide to Pin Generator',
        'How to schedule pins',
        'How to connect your Pinterest',
        'Savings calculator',
      ]
    },
    productFeatures: {
      title: 'Product features',
      links: [
        'Generate Pinterest pins',
        'Schedule Pinterest pins',
        'Create your own templates',
        'Pinterest Keyword Research Tool',
        'Pinterest Trend Alerts',
        'Create Pinterest Catalogs',
        'Pin History',
        'Affiliate program',
        'Connected eCommerce stores',
        'RSS Feeds',
      ]
    },
    integrations: {
      title: 'Integrations',
      links: [
        'Import your Etsy products',
        'Import your Shopify products',
        'Generate pins for Wordpress',
        'Google Chrome Extension',
      ]
    },
    other: {
      title: 'Other',
      links: [
        'Blog',
        'Pricing',
        'Vote for next features',
        'Redeem purchase code',
        'FAQs',
        'Contact',
        'Support',
      ]
    },
    tutorials: {
      title: 'Pinterest marketing tutorials',
      links: [
        'Pinterest SEO guide',
        'How to use Pinterest for affiliate marketing',
        'How to promote your Etsy store on Pinterest',
        'How to read Pinterest analytics',
        'Pinterest\'s most asked questions',
        'What are the best Pin sizes?',
        'How to boost Pinterest engagement',
        'How to make money with Pinterest',
        'What is the best time to post on Pinterest?',
        'How to audit your Pinterest profile',
        'Generate pins for Wordpress',
        'Generate pins from a CSV file',
        'Pinterest mini-course',
      ]
    }
  }

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Social Section */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
                <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
                <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
                <div className="w-2.5 h-2.5 bg-primary rounded-sm"></div>
              </div>
              <span className="font-semibold text-gray-800">Pin Generator</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-6">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                <Youtube className="h-4 w-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                <Twitter className="h-4 w-4 text-white" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                <span className="text-white text-xs font-bold">P</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700">
                <span className="text-white text-xs font-bold">f</span>
              </a>
            </div>

            {/* Legal Links */}
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-primary hover:underline">Privacy Policy</a>
              <a href="#" className="block text-primary hover:underline">Terms and Conditions</a>
            </div>

            <p className="text-sm text-gray-500 mt-4">© 2026 Pin Generator</p>
            <p className="text-xs text-gray-400 mt-1">PT Brimbrook House Technology</p>

            {/* Promo Card */}
            <Card className="mt-6 bg-primary/10 border-primary/20">
              <CardContent className="p-4">
                <h4 className="font-bold text-gray-800 text-sm mb-1">Love Pin Generator?</h4>
                <p className="text-xs text-gray-600 mb-3">
                  Create content for 5 social platforms at once with Content Generator.
                </p>
                <Button variant="outline" size="sm" className="w-full bg-white text-xs">
                  Try Content Generator
                </Button>
                <div className="flex items-center justify-center gap-1.5 mt-3">
                  <div className="w-5 h-5 rounded-full bg-[#BD081C]"></div>
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"></div>
                  <div className="w-5 h-5 rounded-full bg-[#0A66C2]"></div>
                  <div className="w-5 h-5 rounded-full bg-black"></div>
                  <div className="w-5 h-5 rounded-full bg-[#1877F2]"></div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How to Use */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">{footerLinks.howToUse.title}</h4>
            <ul className="space-y-2">
              {footerLinks.howToUse.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-primary hover:underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Features */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">{footerLinks.productFeatures.title}</h4>
            <ul className="space-y-2">
              {footerLinks.productFeatures.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-primary hover:underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">{footerLinks.integrations.title}</h4>
            <ul className="space-y-2">
              {footerLinks.integrations.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-primary hover:underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Other */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">{footerLinks.other.title}</h4>
            <ul className="space-y-2">
              {footerLinks.other.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-primary hover:underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Pinterest Marketing Tutorials */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">{footerLinks.tutorials.title}</h4>
            <ul className="space-y-2">
              {footerLinks.tutorials.links.map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-sm text-primary hover:underline">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
