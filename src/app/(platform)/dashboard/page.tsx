import DatabaseForm from "./_components/databaseForm"

type Props = {}

const DashboardPage = (props: Props) => {
  return (
    <div className='h-full flex justify-center items-center'>
      <div className="w-[600px] h-[600px]">
        <DatabaseForm/>
      </div>
    </div>
  )
}

export default DashboardPage