import { Container, HomeContent } from './styles'
import queryString from 'query-string'
import { useQuery } from 'react-query'

import logoIcon from '@/assets/icons/logo-home.svg'
import homeBanner from '@/assets/images/animals-banner.png'
import search from '@/assets/icons/search.svg'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { useNavigate } from 'react-router-dom'
import { PlaceSelect } from '@/components/PlaceSelect'

export interface BrazilStateProps {
  id: number
  sigla: string
}

export interface BrazilCitiesProps {
  code: string
  name: string
}

export function Home() {
  const [citiesOfAState, setCitiesOfAState] = useState<BrazilCitiesProps[]>([])
  const [selectedState, setSelectedState] = useState('RO')
  const [selectedCity, setSelectedCity] = useState('Alta Floresta D Oeste')

  const { data: states, isLoading } = useQuery('states', async () => {
    try {
      const response = await api.get('/location/states')
      const responseData = response.data.states as BrazilStateProps[]
      return responseData
    } catch (error) {
      console.log(error)
    }
  })

  const navigate = useNavigate()

  const cityAndStateQuery = {
    city: selectedCity,
    state: selectedState,
  }

  const cityAndStateQueryTransformed = queryString.stringify(cityAndStateQuery)

  function handleChangeState(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedState(event.target.value)
  }

  function handleChangeCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value)
  }

  function handleSearchPets(event: FormEvent) {
    event.preventDefault()
    navigate(`/map?${cityAndStateQueryTransformed}`)
  }

  useEffect(() => {
    async function getCitiesFromState() {
      const response = await api.get(`/location/citys/${selectedState}`)
      setCitiesOfAState(response.data.citys)
      setSelectedCity(response.data.citys[0].name)
    }
    getCitiesFromState()
  }, [selectedState])

  return (
    <Container>
      <HomeContent>
        <header>
          <img src={logoIcon} alt="" />
        </header>
        <main>
          <h1>
            Leve <br /> a felicidade <br />
            para o seu lar
          </h1>
          <img
            src={homeBanner}
            alt="6 cachorros felizes de raça e tamanhos diferentes"
          />
        </main>
        <footer>
          <p>Encontre o animal de estimação ideal para seu estilo de vida!</p>
          <form onSubmit={handleSearchPets}>
            <span>Busque um amigo: </span>
            <div>
              <PlaceSelect
                name="state"
                type="state"
                options={states}
                onSelectChange={handleChangeState}
                selectValue={selectedState}
              />
              <PlaceSelect
                name="city"
                type="city"
                options={citiesOfAState}
                onSelectChange={handleChangeCity}
                selectValue={selectedCity}
              />
            </div>

            <button type="submit" disabled={isLoading}>
              <img src={search} alt="" />
            </button>
          </form>
        </footer>
      </HomeContent>
    </Container>
  )
}
