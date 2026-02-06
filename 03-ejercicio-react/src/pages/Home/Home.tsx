import './Home.css'
import { useCallback, type FormEventHandler } from 'react'
import { useRouter } from '@/hooks/useRouter'
import { Icon, type TaIcon } from '@/components/Icon/Icon'
import { Button } from '@/components/Button/Button'

const Home = () => {
  const { navigateTo } = useRouter()

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    e => {
      e.preventDefault()

      const formData = new FormData(e.currentTarget)
      const text = formData.get('search') as undefined | string

      /* Genial como lo hiciste! Con esta alternativa siento que queda más claro :) */
      const navigateString = text ? `?text=${encodeURIComponent(text)}` : ''

      navigateTo(`/search${navigateString}`)
    },
    [navigateTo]
  )

  const cards: { taIcon: TaIcon; title: string; desc: string }[] = [
    {
      taIcon: 'briefcase',
      title: 'Encuentra el trabajo de tus sueños',
      desc: 'Busca miles de empleos de las mejores empresas de todo el mundo.',
    },
    {
      taIcon: 'usersGroup',
      title: 'Conecta con las mejores empresas',
      desc: 'Conecta con empresas que están contratando por tus habilidades.',
    },
    {
      taIcon: 'buildingSkyscraper',
      title: 'Obtén el salario que mereces',
      desc: 'Obtén el salario que mereces con nuestra calculadora de salarios.',
    },
  ]

  return (
    <main className="cmp-home">
      <title>DevJobs</title>
      <section className="hero">
        <img
          src="/background.webp"
          alt="Fondo de personas trabajando"
          decoding="async"
          fetchPriority="high"
        />
        <h1>Encuentra el trabajo de tus sueños</h1>
        <p>
          Únete a la comunidad más grande de desarrolladores y encuentra tu
          próxima oportunidad.
        </p>
        <form className="search-form-main" onSubmit={handleSubmit}>
          <div className="main">
            <Icon taIcon="search" />
            <label>
              <input
                type="search"
                name="search"
                placeholder="Buscar empleos por título, habilidad o empresa"
                aria-label="Buscar"
              />
            </label>
            <Button text="Buscar" submit />
          </div>
        </form>
      </section>
      <section className="why">
        <header>
          <h2>¿Por qué DevJobs?</h2>
          <p className="text-muted">
            DevJobs es la principal plataforma de búsqueda de empleo para
            desarrolladores. Conectamos a los mejores talentos con las empresas
            más innovadoras.
          </p>
        </header>
        <footer>
          {cards.map(({ taIcon, title, desc }) => (
            <article key={taIcon}>
              <header>
                <Icon size="l" {...{ taIcon }} />
                <h3>{title}</h3>
              </header>
              <p className="text-muted">{desc}</p>
            </article>
          ))}
        </footer>
      </section>
    </main>
  )
}

export default Home
