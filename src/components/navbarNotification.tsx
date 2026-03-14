
interface NavbarNotificationProps {
  count?: number | boolean
}
export default function NavbarNotification({ count }: NavbarNotificationProps) {
  if (!count) return null

  if (count === true)
    return <span className="w-4 h-4 bg-white border-5 border-[#cb112d] rounded-full inline-block" />

  return (
    <span className="relative flex items-center justify-center w-4.5 h-4.5 text-[11px] font-semibold bg-[#cb112d] text-white rounded-full">
      <span className="mt-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{count}</span>
    </span>
  )
}