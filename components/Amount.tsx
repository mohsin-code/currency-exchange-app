import React, { Dispatch, SetStateAction } from 'react'

interface AmountProps {
  amount: number;
  setAmount: Dispatch<SetStateAction<number>>;
}

export default function Amount({ amount, setAmount }: AmountProps) {
  return (
    <div className='m-4 flex gap-2 relative'>
      <p className='text-3xl absolute left-2 top-6'>€</p>
      <input type="number" placeholder='...Enter amount' className='w-full pt-6 p-2 text-right text-3xl border border-slate-500 box-border' value={amount} onChange={e => setAmount(parseFloat(e.target.value))}/>
    </div>
  )
}
