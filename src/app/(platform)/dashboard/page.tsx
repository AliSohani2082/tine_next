import { Card } from '@/components/ui/card'
import Finder from './_components/DatabaseForm/Finder'

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <div className="w-full h-full p-16">
      <Card className="w-full h-full p-4">
        <Finder />
      </Card>
    </div>
  )
}

export default DashboardPage
