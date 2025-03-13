export function SidebarClass1(){
  return <div className="flex h-white dark:bg-black">
    <h1 className="text-black dark:text-white">Hi There</h1>
    <button onClick={() => {
      document.querySelector("html").classList.toggle("dark")
    }} className="dark:text-white">Toggle THeme</button>
    <div className="transition-all ease-in-out duration-150 md:w-96 h-screen w-0">
      Sidebar
    </div>
    <div className="bg-green-800 h-screen flex-1">
      content
    </div>
  </div>
}