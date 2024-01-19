import { useState } from "react"
import Search from "@/components/Search"
import Amount from "@/components/Amount"
import SearchRecords from "@/components/SearchRecords"
import withAuth from "@/hoc/withAuth"
import DefaultLayout from "@/layouts/DefaultLayout"
import SavedLayout from "@/layouts/SavedLayout"
import SearchLayout from "@/layouts/SearchLayout"
import { Country, Saved } from "@/types"
import SavedRecords from "@/components/SavedRecords"

const Page = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [saved, setSaved] = useState<Saved[]>([]);
  const [error, setError] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  return (
    <DefaultLayout>
      <div className="flex min-h-full">
        <SearchLayout>
          <Search setCountries={setCountries} setError={setError} />
          <SearchRecords countries={countries} error={error} setSaved={setSaved} />
        </SearchLayout>
        <SavedLayout>
          <p className="text-2xl font-semibold self-center">Convert from EUR</p>
          <Amount amount={amount} setAmount={setAmount} />
          <SavedRecords savedRecords={saved} amount={amount} />
        </SavedLayout>
      </div>
    </DefaultLayout>
  )
}

export default withAuth(Page);