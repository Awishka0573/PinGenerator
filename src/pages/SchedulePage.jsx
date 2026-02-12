import { useState } from 'react'
import { Shuffle, Clock, Calendar, Zap, Heart, Layers, Timer, RefreshCw, X, Plus } from 'lucide-react'
import { Button, Input, Card, CardContent, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, Checkbox, Label } from '@/components/ui'

const SchedulePage = () => {
  const [pinsPerDay, setPinsPerDay] = useState('10')
  const [timezone, setTimezone] = useState('gmt-5')
  const [scheduleTime, setScheduleTime] = useState('2024-08-20T18:42')
  const [selectedBoards, setSelectedBoards] = useState([
    '11 year anniver...',
    '21st birthday g...',
    '50th birthday...',
    'Cat Toys'
  ])

  const currentTimeslots = ['02:00', '02:42', '03:24', '18:00', '18:24', '19:24', '20:06', '20:48', '21:30', '22:12']

  const removeBoard = (board) => {
    setSelectedBoards(selectedBoards.filter(b => b !== board))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Pinterest Scheduler</h1>
          <p className="text-gray-600 mb-6">Manage your Pinterest scheduling settings and scheduled pins here.</p>
          <p className="text-gray-500 mb-4">Login or sign up to edit scheduling settings.</p>
          <div className="flex justify-center gap-3">
            <Button className="bg-primary hover:bg-primary/90 px-6">
              LOGIN
            </Button>
            <Button className="bg-primary hover:bg-primary/90 px-6">
              SIGN UP
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Smart Shuffling */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Shuffle className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Shuffling</h3>
            <p className="text-sm text-gray-500">
              Intelligently shuffle your pins to ensure that the same outbound url is not posted too frequently. The Pinterest algorithm loves this.
            </p>
          </div>

          {/* Spread out your pins */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Spread out your pins</h3>
            <p className="text-sm text-gray-500">
              Make sure you are not pinning too many pins in a short period of time. Set a maximum number of pins per day.
            </p>
          </div>

          {/* Set Time Windows */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Clock className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Set Time Windows</h3>
            <p className="text-sm text-gray-500">
              Set time windows for when you want to pin. This will ensure that your pins are posted at the best times.
            </p>
          </div>
        </div>

        {/* Bulk Schedule Pins Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-l-yellow-400">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-5 w-5 text-yellow-500" />
                <h3 className="text-xl font-semibold text-primary">Bulk Schedule Pins</h3>
              </div>
              <p className="text-sm text-gray-500">
                Easily bulk schedule pins to multiple boards and board sections in one click. Save tons of time by scheduling pins in bulk.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Button className="w-full bg-primary hover:bg-primary/90 mb-4">
                SCHEDULE ALL PINS
              </Button>
              <p className="text-sm text-gray-500 mb-3">Select boards to pin to:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedBoards.map((board) => (
                  <span 
                    key={board}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {board}
                    <button 
                      onClick={() => removeBoard(board)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-400 hover:text-primary">
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Set Daily Pin Limits Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-l-red-400">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🔥</span>
                <h3 className="text-xl font-semibold text-primary">Set Daily Pin Limits</h3>
              </div>
              <p className="text-sm text-gray-500">
                Avoid posting too many pins too quickly, as it can appear spammy and harm your account. Use our tool to easily set a maximum number of pins per day for better account health.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Pins per day</label>
                <Input
                  type="number"
                  value={pinsPerDay}
                  onChange={(e) => setPinsPerDay(e.target.value)}
                  className="w-24"
                />
                <p className="text-xs text-gray-400 mt-2">
                  We recommend <strong>10-30 pins per day</strong>. For new Pinterest profiles, start at 5-10 pins per day and increase slowly.
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Current timeslots</label>
                <div className="flex flex-wrap gap-2">
                  {currentTimeslots.map((time) => (
                    <span key={time} className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Set Pinning Times Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-l-gray-400">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Timer className="h-5 w-5 text-gray-500" />
                <h3 className="text-xl font-semibold text-primary">Set Pinning Times</h3>
              </div>
              <p className="text-sm text-gray-500">
                Select a timezone and schedule posting windows to ensure your pins are shared at optimal times, reaching the right audience in the right geography.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Pin posting times</h4>
                <p className="text-xs text-gray-400 mb-4">
                  Your pins will be posted in these two time windows. We recommend between <strong>6pm and 11pm</strong>, and <strong>2am and 4am</strong>.
                </p>
                {/* Time Range Visualization */}
                <div className="h-16 bg-gray-100 rounded relative mb-2">
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-primary/20 rounded flex items-center justify-center">
                    <span className="text-xs text-primary">time</span>
                  </div>
                  <div className="absolute top-2 right-4 w-16 h-6 bg-primary/20 rounded flex items-center justify-center">
                    <span className="text-xs text-primary">time</span>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-800 mb-2">Timezone</h4>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gmt-5">(GMT-05:00) Eastern Time (US & Canada)</SelectItem>
                    <SelectItem value="gmt-8">(GMT-08:00) Pacific Time (US & Canada)</SelectItem>
                    <SelectItem value="gmt-6">(GMT-06:00) Central Time (US & Canada)</SelectItem>
                    <SelectItem value="gmt+0">(GMT+00:00) UTC</SelectItem>
                    <SelectItem value="gmt+1">(GMT+01:00) Central European Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stay Consistent Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-l-green-400">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="h-5 w-5 text-green-500 fill-green-500" />
                <h3 className="text-xl font-semibold text-primary">Stay Consistent on Pinterest</h3>
              </div>
              <p className="text-sm text-gray-500">
                Ensure you always have pins in your queue, keeping your Pinterest activity consistent. Regularly scheduled pins help you stay engaged with your audience and boost your visibility over time.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Scheduled Pins Queue</h3>
              <p className="text-gray-600 mb-2">
                Active Pinterest profile: <strong>giftsforkevin</strong>
              </p>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="text-gray-600">301 pins scheduled.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">📅</span>
                <span className="text-gray-600">Pins finish on 20 Sep 2024</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flexible Shuffling Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-l-blue-400">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="h-5 w-5 text-blue-500" />
                <h3 className="text-xl font-semibold text-primary">Flexible Shuffling Options</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Choose from 3 ways to shuffle your pins.
              </p>
              <p className="text-sm text-gray-500">
                Use Smart Shuffle to balance outbound URLs, Random Shuffle for unpredictability, or set exact times for pinning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  RANDOM SHUFFLE
                </Button>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  SMART SHUFFLE
                </Button>
              </div>
              <div className="mt-6">
                <label className="text-sm text-gray-500 mb-2 block">Schedule time</label>
                <Input
                  type="datetime-local"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Control AutoPin Frequency Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-l-4 border-l-purple-400">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🗓️</span>
                <h3 className="text-xl font-semibold text-gray-800">Control AutoPin Frequency</h3>
              </div>
              <p className="text-sm text-gray-500">
                Set how often AutoPins generate new pins—daily, weekly, or monthly. Customize the settings and images to fit your needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              {/* Tabs */}
              <div className="flex border-b mb-4">
                <button className="px-4 py-2 text-sm text-gray-500">PIN DETAILS</button>
                <button className="px-4 py-2 text-sm text-primary border-b-2 border-primary">SCHEDULING SETTINGS</button>
                <button className="px-4 py-2 text-sm text-gray-500">IMAGES</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Create a pin every</label>
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue="1" className="w-16" />
                    <Select defaultValue="days">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">days</SelectItem>
                        <SelectItem value="weeks">weeks</SelectItem>
                        <SelectItem value="months">months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">The next pin will be added to the queue now.</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="hashtag" />
                  <Label htmlFor="hashtag" className="text-sm">Generate a hashtag each time</Label>
                </div>
                <p className="text-xs text-gray-400 pl-6">This uses your saved hashtag strategy (chosen from a selection when first used)</p>

                <div className="flex items-center space-x-2">
                  <Checkbox id="one-board" />
                  <Label htmlFor="one-board" className="text-sm">Only schedule to one board at a time</Label>
                </div>
                <p className="text-xs text-gray-400 pl-6">This allows you to rotate which board and which section (if set) the pin is posted to.</p>

                <div className="flex items-center space-x-2">
                  <Checkbox id="ai-titles" />
                  <Label htmlFor="ai-titles" className="text-sm">Rewrite titles with AI on each generation</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="ai-desc" />
                  <Label htmlFor="ai-desc" className="text-sm">Rewrite descriptions with AI on each generation</Label>
                </div>

                <div className="mt-4">
                  <label className="text-sm text-gray-600 mb-2 block">Campaign ends on</label>
                  <Input type="datetime-local" defaultValue="2024-09-22T00:54" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SchedulePage
