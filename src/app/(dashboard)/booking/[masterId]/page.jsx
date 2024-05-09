// MUI Imports

import Booking from '@views/page/booking'

export default function Page({ params }) {
  return <Booking masterId={params.masterId} />
}
