import Booking from '@views/page/bookingV2'

export default function Page({ params }) {
  return <Booking masterId={params.masterId} />
}
