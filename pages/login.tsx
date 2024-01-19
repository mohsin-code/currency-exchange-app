import { useState } from "react";
import Button from "@/components/Button"
import AuthLayout from "@/layouts/AuthLayout"
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const generateError = () => {
    let errorStyle = '';
    switch (error) {
      case 'Loading...':
        errorStyle = 'text-slate-600';
        break;
      case 'Successfully logged in':
        errorStyle = 'text-green-600';
        break;
      default:
        errorStyle = 'text-red-600';
    }

    return error && <p className={errorStyle}>{error}</p>;
  }

  const handleLogin = async () => {
    setError("Loading...");
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError('Login failed!');
        return
      }
      
      const { token } = await response.json();
      
      sessionStorage.setItem("token", token);
      setError("Successfully logged in");
      
      router.push("/");
    } catch (error: any) {
      console.error('Error during authentication:', error.message);
      setError("Login failed!")
    }
  }

  return (
    <AuthLayout>
      <p className="py-4 text-3xl font-semibold text-center">Login</p>
      <input className="p-1.5 w-60 border border-slate-500 rounded-md" type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input className="p-1.5 w-60 border border-slate-500 rounded-md" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      {generateError()}
      <Button label="Login" handleClick={handleLogin} />
    </AuthLayout>
  )
}