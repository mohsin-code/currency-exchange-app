import { Country, Currency, ExchangeRate } from '@/types';
import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import withAuth from '../middleware/auth';

interface ResponseData {
  message: string;
  data?: Country[];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name } = req.query;

    // Fetch country information
    const countryResponse: AxiosResponse<Country[]> = await axios.get(
      `https://restcountries.com/v3.1/name/${name}`
    );

    if(countryResponse.status == 404) {
      res.status(404).json({ message: 'Countries not found!' });
    }

    // Fetch exchange rates
    const exchangeRatesResponse: AxiosResponse<ExchangeRate> = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}`
    );

    const countries: Country[] = countryResponse.data.map((country: Country) => {
      const currencies: Record<string, Currency> = {};
    
      if (country.currencies) {
        Object.keys(country.currencies).forEach((currencyCode) => {
          const exchangeRate = exchangeRatesResponse.data.rates[currencyCode];
    
          if(country?.currencies && exchangeRate) {
            currencies[currencyCode] = {
              ...country.currencies[currencyCode],
              exchangeRate: exchangeRate,
            };
          }
        });
      }
    
      return {
        name: (country.name as { official: string }).official,
        population: country.population,
        currencies: currencies,
      };
    });
    

    res.status(200).json({ message: 'Data Fetched Successfully!', data: countries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default withAuth(handler)