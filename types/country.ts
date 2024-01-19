import { Currency } from './currency';

export type Country = {
  name: { official: string } | string;
  population: number;
  currencies?: Record<string, Currency>;
};
