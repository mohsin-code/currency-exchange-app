export default function Navbar() {
  const handleLogout = () => {
    alert("Logged out!")
  }

  return (
    <header className='bg-gradient-to-r from-cyan-500 to-slate-300 h-12 flex justify-between items-center px-4'>
      <p className='text-xl'>Country Exchange App</p>
      <p className='text-red-600 cursor-pointer' onClick={handleLogout}>Logout</p>
    </header>
  )
}