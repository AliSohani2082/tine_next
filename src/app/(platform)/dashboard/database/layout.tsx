const organizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 overflow-auto flex items-stretch justify-stretch">
      <main className="w-full h-full flex justify-stretch items-stretch">
        {children}
      </main>
    </div>
  )
}

export default organizationLayout
