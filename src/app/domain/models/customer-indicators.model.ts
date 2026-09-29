import { BirthStatistics } from './birth-statistics.model';
import { MonthlyBirthRate } from './monthly-birth-rate.model';

export interface CustomerIndicators {
  birthsByPeriod: BirthStatistics[];
  highestBirthPeriod: BirthStatistics | null;
  lowestBirthPeriod: BirthStatistics | null;
  monthlyBirthRates: MonthlyBirthRate[];
}