import { Container, HomeContent } from './styles'
import queryString from 'query-string'

import logoIcon from '@/assets/icons/logo-home.svg'
import homeBanner from '@/assets/images/animals-banner.png'
import search from '@/assets/icons/search.svg'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { useNavigate } from 'react-router-dom'

interface BrazilStateProps {
  id: number
  sigla: string
}

interface BrazilCitiesProps {
  code: string
  name: string
}

export function Home() {
  const [brazilStates, setBrazilStates] = useState<BrazilStateProps[]>([])
  const [selectedState, setSelectedState] = useState('RO')
  const [citiesOfAState, setCitiesOfAState] = useState<BrazilCitiesProps[]>([])
  const [selectedCity, setSelectedCity] = useState('Alta Floresta D Oeste')

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
    async function getBrazilStatesAbbreviation() {
      const response = await api.get('/location/states')
      const states = (await response.data.states) as BrazilStateProps[]
      setBrazilStates(states)
    }
    getBrazilStatesAbbreviation()
  }, [])

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
              <select
                name="state"
                id="state"
                value={selectedState}
                onChange={handleChangeState}
              >
                {brazilStates.map((state) => {
                  return (
                    <option value={state.sigla} key={state.id}>
                      {state.sigla}
                    </option>
                  )
                })}
              </select>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleChangeCity}
              >
                {citiesOfAState.map((city) => {
                  return (
                    <option value={city.name} key={city.code}>
                      {city.name}
                    </option>
                  )
                })}
              </select>
            </div>

            <button type="submit">
              <img src={search} alt="" />
            </button>
          </form>
        </footer>
      </HomeContent>
    </Container>
  )
}
