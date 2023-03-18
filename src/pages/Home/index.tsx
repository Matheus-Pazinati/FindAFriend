import { Container, HomeContent } from './styles'

import logoIcon from '@/assets/icons/logo-home.svg'
import homeBanner from '@/assets/images/animals-banner.png'
import search from '@/assets/icons/search.svg'
import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'

interface BrazilStateProps {
  id: number
  sigla: string
}

export function Home() {
  const [brazilStates, setBrazilStates] = useState<BrazilStateProps[]>([])

  useEffect(() => {
    async function getBrazilStatesAbbreviation() {
      const response = await api.get('/location/states')
      const states = (await response.data.states) as BrazilStateProps[]
      setBrazilStates(states)
    }
    getBrazilStatesAbbreviation()
  }, [])

  // function handleSearchPets() {
  //   // TO DO
  // }

  // function handleChangeState() {
  //   // TO DO
  // }

  // function handleChangeCity() {
  //   // TO DO
  // }

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
          <form action="">
            <span>Busque um amigo: </span>
            <div>
              <select name="State" id="State">
                {brazilStates.map((state) => {
                  return (
                    <option value={state.sigla} key={state.id}>
                      {state.sigla}
                    </option>
                  )
                })}
              </select>
              <select name="City" id="City">
                <option value="São Paulo">São Paulo</option>
                <option value="Santa Adélia">Santa Adélia</option>
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
