import Bar from '@/components/charts/Bar'
import Bar2 from '@/components/charts/Bar2'
import ChartCard from '@/components/charts/ChartCard'
import LineChart from '@/components/charts/LineChart'
import Map from '@/components/charts/Map'
import { numData, geoData } from '@/components/charts/data'
import PieChart from '@/components/charts/pieChart'
import { Card, CardContent } from '@/components/ui/card'
import { cn, farsiNumber } from '@/lib/utils'
import { Book, Globe2, User } from 'lucide-react'
import countryData from 'public/country-paper.json'
import papaerTypes from 'public/paper-type.json'

const infoCards: {
  title: string
  icon: React.ReactNode
  number: number
  color: string
}[] = [
  {
    title: 'مقالات',
    icon: <Book size={40} />,
    number: 200,
    color: 'text-blue-400',
  },
  {
    title: 'نویسندگان',
    icon: <User size={40} />,
    number: 50,
    color: 'text-green-400',
  },
  {
    title: 'کشور ها',
    icon: <Globe2 size={40} />,
    number: 41,
    color: 'text-red-400',
  },
]

const lineChartData = [12, 19, 3, 5, 2, 3];
const lineChartLabels = ['۱۳۹۷','۱۳۹۸', '۱۳۹۹', '۱۴۰۰', '۱۴۰۱', '۱۴۰۲'];


const pieChartData = Object.values(papaerTypes);
const pieChartLabels = Object.keys(papaerTypes);


const OraganizationPage = ({ params }: { params: { databaseId: string } }) => {
  return (
    <div className="flex w-full h-full px-16 overflow-auto flex-col">
      <div className="w-full flex py-10 justify-around items-center">
        {infoCards.map((infoCard) => (
          <Card key={infoCard.title}>
            <CardContent className="flex p-4 px-10 flex-col justify-center items-center">
              <div className="flex flex-row gap-3 justify-between items-center">
                <span className="text-2xl">{infoCard.title}</span>
                {infoCard.icon}
              </div>
              <span className={cn('text-3xl mt-3', infoCard.color)}>
                #{farsiNumber(infoCard.number)}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex flex-col m-4 gap-4">
        <div className="flex flex-row gap-4">
          <ChartCard className='h-80 w-1/2'>
            <LineChart data={lineChartData} labels={lineChartLabels}/>
          </ChartCard>
          <ChartCard className="flex-1">
            <PieChart data={pieChartData} labels={pieChartLabels}/>
          </ChartCard>
        </div>
        <div className="flex flex-row gap-4">
          {/* <ChartCard>
            <Bar
              responsive
              maintainAspectRatio
              labels={["chart"]}
              datasets={[{
                label: "chart",
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                backgroundColor: ["#007bff", "#dc3545", "#ffc107", "#17a2b8", "#28a745", "#6c757d", "#343a40", "#f4623a", "#f4623a", "#f4623a"],
              }]}
            />
          </ChartCard> */}
          <ChartCard className="w-full">
            <Map data={countryData} width={400} height={180} />
          </ChartCard>
        </div>
      </div>
    </div>
  )
}

export default OraganizationPage
