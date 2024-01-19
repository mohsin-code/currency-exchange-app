import { Saved } from '@/types';
import React from 'react';

interface Props {
  savedRecords: Saved[];
  amount: number;
}

const SavedRecords: React.FC<Props> = ({ savedRecords, amount }) => {
  return (
    <div className='flex flex-col gap-2 w-full px-4'>
      {savedRecords.map(saved => (
        <div className='flex w-full justify-between px-4 py-2 border rounded-none'>
          <div className='flex flex-col'>
            <p className="text-lg max-w-52">{saved.name}</p>
            <p className="text-xs">{saved.currency}</p>
          </div>
          <p className='text-2xl'>{saved.symbol} {(saved.exchangeRate * amount).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default SavedRecords;
