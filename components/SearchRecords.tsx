import { Country, Currency, Saved } from '@/types';
import { Error } from './common/Error';
import React, { Dispatch, SetStateAction } from 'react';
import Button from './common/Button';

interface Props {
  countries: Country[];
  error: string;
  setSaved: Dispatch<SetStateAction<Saved[]>>;
}

const SearchRecords: React.FC<Props> = ({ countries, error, setSaved }) => {
  const handleSaved = (country:Country, currency:Currency) => {
    const newSaved: Saved = {
      name: country.name as string,
      currency: currency.name,
      symbol: currency?.symbol || "",
      exchangeRate: currency.exchangeRate || NaN
    };

    setSaved(prev => [ ...prev, newSaved ]);
  }
  
  return (
    <table className="w-full bg-white border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 border-b">Country</th>
          <th className="py-2 px-4 border-b">Population</th>
          <th className="py-2 px-4 border-b">Currency</th>
          <th className="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody className='overflow-scroll'>
        {error ? (
          <tr className="py-2 px-4 text-center">
            <td colSpan={4}>
              <Error error={error} successMessage="" />
            </td>
          </tr>
        ) : (
          countries?.length < 1 && (
            <tr className="py-2 px-4 text-center">
              <td colSpan={4}>No Items!</td>
            </tr>
          )
        )}
        {countries.map((country: Country) => {
          const currencies = country?.currencies ? Object.values(country.currencies) : [];
          const rowSpan = currencies.length;

          return (
            <React.Fragment key={country.name as string}>
              {currencies.map((currency, index) => (
                <tr key={`${country.name}-${index}`} className="border-t">
                  {index === 0 && (
                    <>
                      <td rowSpan={rowSpan} className="py-2 px-4 text-center">
                        {country.name as string}
                      </td>
                      <td rowSpan={rowSpan} className="py-2 px-4 text-center">
                        {country.population}
                      </td>
                    </>
                  )}
                  <td className="py-2 px-4 border-l">{currency.name}</td>
                  <td className="py-2 px-4 grid place-items-center">
                    <Button label='Save' handleClick={() => handleSaved(country, currency)} />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>

  );
};

export default SearchRecords;
