import { Container } from './styles'

import logoIcon from '@/assets/icons/logo-home.svg'
import homeBanner from '@/assets/images/animals-banner.png'
import search from '@/assets/icons/search.svg'

export function Home() {
  function handleSearchPets() {
    // TO DO
  }

  function handleChangeState() {
    // TO DO
  }

  function handleChangeCity() {
    // TO DO
  }

  return (
    <Container>
      <header>
        <img src={logoIcon} alt="" />
      </header>
      <main>
        <h1>Leve a felicidade para o seu lar</h1>
        <img
          src={homeBanner}
          alt="6 cachorros felizes de raça e tamanhos diferentes"
        />
      </main>
      <footer>
        <p>Encontre o animal de estimação ideal para seu estilo de vida!</p>
        <form action="">
          <span>Busque um amigo: </span>
          <select name="State" id="State">
            <option value="SP">SP</option>
            <option value="RJ">RJ</option>
            <option value="MG">MG</option>
          </select>
          <select name="City" id="City">
            <option value="São Paulo">São Paulo</option>
            <option value="Santa Adélia">Santa Adélia</option>
          </select>
          <button type="submit">
            <img src={search} alt="" />
          </button>
        </form>
      </footer>
    </Container>
  )
}
