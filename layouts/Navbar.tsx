import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.clear();
    router.push('/login');
  }

  return (
    <header className='bg-gradient-to-r from-cyan-500 to-slate-300 h-12 flex justify-between items-center px-4'>
      <p className='text-xl'>Currency Exchange App</p>
      <p className='text-red-600 cursor-pointer' onClick={handleLogout}>Logout</p>
    </header>
  )
}