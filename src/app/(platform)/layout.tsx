import { ModalProvider } from '@/providers/modal-provider'

type PlatformLayoutProps = {
  children: React.ReactNode
}

const Platformlayout = ({ children }: PlatformLayoutProps) => {
  return (
    <>
      <ModalProvider />
      {children}
    </>
  )
}

export default Platformlayout
