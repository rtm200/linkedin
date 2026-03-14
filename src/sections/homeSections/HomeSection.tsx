import LeftAside from '@/components/homeSections/leftAside'
import Main from '@/components/homeSections/main'
import RightAside from '@/components/homeSections/rightAside'

export default function HomeSection() {
  return (
    <div className='mt-13 relative px-6'>
      <div className='pt-5 w-full max-w-282 my-0 mx-auto h-full '>
        <div className="flex flex-col md:grid md:grid-cols-[225px_auto_300px] md:grid-areas-['sidebar_main_aside'] gap-6 min-h-[calc(100vh-7.75rem)] mb-13">
          <LeftAside />
          <Main />
          <RightAside />
        </div>
      </div>
    </div>
  )
}