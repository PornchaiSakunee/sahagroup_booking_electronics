import BookingForm from '@views/page/bookingForm'

export default function Page({ params }) {
  return <BookingForm id={params.id} masterId={params.masterId} />
}
