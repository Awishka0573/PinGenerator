import { HelpCircle, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui'

const Header = () => {
  const location = useLocation()
  const navItems = [
    { name: 'Generate', path: '/generate' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Templates', path: '/templates' },
    { name: 'Pricing', path: '/pricing' },
  ]

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Pin Generator" className="h-8 w-auto" />
          <span className="text-xl font-semibold text-gray-800">Pin Generator</span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`font-medium transition-colors ${
              location.pathname === item.path || (item.path === '/generate' && location.pathname === '/')
                ? 'text-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <HelpCircle className="h-5 w-5 text-gray-500" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full bg-primary text-white hover:bg-primary/90">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}

export default Header
