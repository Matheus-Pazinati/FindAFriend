import { Select } from '@/components/Select'

import logo from '@/assets/icons/logo.svg'
import search from '@/assets/icons/search.svg'

import {
  Container,
  AsideHeader,
  HeaderInput,
  AsideContent,
  ContentHeader,
  ContentFilters,
} from './styles'
import { PlaceSelect } from '../PlaceSelect'
import { useQueryClient } from 'react-query'
import { BrazilCitiesProps, BrazilStateProps } from '@/pages/Home'
import { ChangeEvent, useEffect, useState } from 'react'
import { api } from '@/lib/axios'

const ageOptions = [
  {
    label: 'Filhote',
    value: 'cub',
  },
  {
    label: 'Adolescente',
    value: 'adolescent',
  },
  {
    label: 'Idoso',
    value: 'elderly',
  },
]
const energyOptions = [
  {
    label: 'Muito baixa',
    value: 1,
  },
  {
    label: 'Baixa',
    value: 2,
  },
  {
    label: 'Média',
    value: 3,
  },
  {
    label: 'Alta',
    value: 4,
  },
  {
    label: 'Muito alta',
    value: 5,
  },
]
const sizeOptions = [
  {
    label: 'Pequenino',
    value: 'small',
  },
  {
    label: 'Médio',
    value: 'medium',
  },
  {
    label: 'Grande',
    value: 'big',
  },
]
const independencyOptions = [
  {
    label: 'Baixo',
    value: 'low',
  },
  {
    label: 'Médio',
    value: 'medium',
  },
  {
    label: 'Alto',
    value: 'high',
  },
]

interface AsideProps {
  initialQuery?: {
    city: string
    state: string
  }
}

export function Aside({ initialQuery }: AsideProps) {
  const [citiesOfAState, setCitiesOfAState] = useState<BrazilCitiesProps[]>([])
  const [selectedState, setSelectedState] = useState(initialQuery?.state)
  const [selectedCity, setSelectedCity] = useState(initialQuery?.city)
  // function handleSearchPets() {
  //   // TO DO
  // }

  // function handleChangeSearchFilters() {
  //   // TO DO
  // }

  function handleChangeState(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedState(event.target.value)
  }

  function handleChangeCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value)
  }

  const query = useQueryClient()
  const states = query.getQueryData('states') as BrazilStateProps[]

  useEffect(() => {
    async function getCitiesFromState() {
      const response = await api.get(`/location/citys/${selectedState}`)
      setCitiesOfAState(response.data.citys)
    }
    getCitiesFromState()
  }, [selectedState])

  return (
    <Container>
      <AsideHeader>
        <div>
          <img src={logo} alt="" />
          <HeaderInput>
            <PlaceSelect
              name="state"
              type="state"
              options={states}
              onSelectChange={handleChangeState}
              selectValue={selectedState!}
            />
            <PlaceSelect
              name="city"
              type="city"
              options={citiesOfAState}
              onSelectChange={handleChangeCity}
              selectValue={selectedCity!}
            />
            <button>
              <img src={search} alt="ícone de lupa" />
            </button>
          </HeaderInput>
        </div>
      </AsideHeader>
      <AsideContent>
        <ContentHeader>Filtros</ContentHeader>
        <ContentFilters>
          <Select name="age" label="Idade" options={ageOptions} />

          <Select
            name="energy"
            label="Nível de energia"
            options={energyOptions}
          />

          <Select name="size" label="Porte do animal" options={sizeOptions} />

          <Select
            name="independency"
            label="Nível de independência"
            options={independencyOptions}
          />
        </ContentFilters>
      </AsideContent>
    </Container>
  )
}
