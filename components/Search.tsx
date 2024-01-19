import React, { Dispatch, SetStateAction, useState } from 'react'
import Button from './common/Button'
import { Country } from '@/types';
import axios, { AxiosResponse } from 'axios';

interface SearchProps {
  setCountries: Dispatch<SetStateAction<Country[]>>;
  setError: Dispatch<SetStateAction<string>>;
}

export default function Search({ setCountries, setError }: SearchProps) {
  const [search, setSearch] = useState<string>("");
  
  const fetchCountries = async () => {
    try {
      setError("Loading...");
      const token = sessionStorage.getItem("token");
      const response: AxiosResponse = await axios.get(`/api/lookup/${search}`, { headers: {
        "Authorization": "Bearer " + token
      }});
      
      if(response.status == 200) {
        setCountries(response.data.data);
        setError("");
      }
    } catch (error: any) {
      console.log(error)
      setError(error?.response ? error?.response?.data?.message : error?.message);
    }
  }

  return (
    <div className='m-4 flex gap-2'>
      <input type="text" placeholder='Search...' className='py-1.5 px-2.5 text-lg w-5/6 rounded-lg border border-slate-500 box-border' value={search} onChange={e => setSearch(e.target.value)}/>
      <Button label='Search' className="w-1/6 text-lg" handleClick={fetchCountries} />
    </div>
  )
}
