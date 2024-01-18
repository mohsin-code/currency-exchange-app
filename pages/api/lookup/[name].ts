import { Country, ExchangeRate } from '@/types';
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

    // Fetch exchange rates
    const exchangeRatesResponse: AxiosResponse<ExchangeRate> = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY}`
    );

    const countries: Country[] = countryResponse.data.map(
      (country: Country) => {
        const currencyCode = Object.keys(country.currencies)[0];
        const exchangeRate = exchangeRatesResponse.data.rates[currencyCode];

        return {
          name: (country.name as { official: string }).official,
          population: country.population,
          currencies: {
            [currencyCode]: {
              ...country.currencies[currencyCode],
              exchangeRate: exchangeRate,
            },
          },
        };
      }
    );

    res.status(200).json({ message: 'Data Fetched Successfully!', data: countries });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default withAuth(handler)