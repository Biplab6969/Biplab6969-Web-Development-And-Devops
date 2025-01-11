
import './App.css'
import { RecoilRoot, useRecoilValue, useRecoilState } from 'recoil'
import { messagingAtom, networkAtom, notificationAtom, jobsAtom, totalNotificationSelector } from './atom'
import { use, useMemo } from 'react'

function App() {
  return <RecoilRoot>
    <MainApp />
  </RecoilRoot>
}

function MainApp() {
  const networkNotificationCount = useRecoilValue(networkAtom)
  const jobAtomCount = useRecoilValue(jobsAtom)
  const NotificationAtomCount = useRecoilValue(notificationAtom)
  const [messagingAtomCount, setmessagingAtomCount] = useRecoilState(messagingAtom);
  const totalNotificationCount = useRecoilValue(totalNotificationSelector);

  // const totalNotificationCount = useMemo( () => {
  //   return networkNotificationCount + jobAtomCount + NotificationAtomCount + messagingAtomCount
  // }, [networkNotificationCount + jobAtomCount + NotificationAtomCount + messagingAtomCount])

  return (
    <>
    <button>Home</button>
    <button>My network ({networkNotificationCount >= 100 ? "99+" : networkNotificationCount}) </button>
    <button>Jobs {jobAtomCount} </button>
    <button>Messaging ({messagingAtomCount}) </button>
    <button>Notification ({NotificationAtomCount}) </button>
    <button onClick={() => {
      setmessagingAtomCount(messagingAtomCount + 1)
    }}>Me ({totalNotificationCount}) </button>
    </>
  )
}

export default App
