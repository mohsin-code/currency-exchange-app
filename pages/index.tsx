import Search from "@/components/Search"
import SearchRecords from "@/components/SearchRecords"
import withAuth from "@/hoc/withAuth"
import DefaultLayout from "@/layouts/DefaultLayout"
import SearchLayout from "@/layouts/SearchLayout"
import { Country } from "@/types"
import { useState } from "react"

const Page = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string>("");

  return (
    <DefaultLayout>
      <div className="flex min-h-full">
        <SearchLayout>
          <Search setCountries={setCountries} setError={setError} />
          <SearchRecords countries={countries} error={error} />
        </SearchLayout>
      </div>
    </DefaultLayout>
  )
}

export default withAuth(Page);