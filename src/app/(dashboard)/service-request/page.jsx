// MUI Imports

// import Fair from '@views/page/fair'
import dynamic from 'next/dynamic'

const Fair = dynamic(() => import('@views/page/fair'))

export default function Page() {
  return <Fair />
}
