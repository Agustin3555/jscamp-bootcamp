const createJobElement = ({ company, location, title, desc, data }) => {
  const li = document.createElement('li')
  li.dataset.technology = data.technology
  li.dataset.location = data.modality
  li.dataset.level = data.level

  const a = document.createElement('a')
  a.href = '#'

  const article = document.createElement('article')

  const header = document.createElement('header')

  const div = document.createElement('div')

  const h3 = document.createElement('h3')
  h3.textContent = title

  const small = document.createElement('small')
  small.className = 'text-muted'
  small.textContent = `${company} | ${location}`

  div.appendChild(h3)
  div.appendChild(small)

  const button = document.createElement('button')
  button.className = 'cmp-button ui-l'
  button.textContent = 'Aplicar'

  header.appendChild(div)
  header.appendChild(button)

  const p = document.createElement('p')
  p.textContent = desc

  article.appendChild(header)
  article.appendChild(p)
  a.appendChild(article)
  li.appendChild(a)

  return li
}

const jobsListings = document.querySelector('.jobs-listings')

if (jobsListings) {
  const response = await fetch('./data.json')
  const jobs = await response.json()

    /* 
    createDocumentFragment() lo que hace es crear un contenedor en memoria que sirve para almacenar todos los elementos del DOM que queremos pintar.
    Para que sirve esto? Para evitar re dibujar el HTML cada vez que insertamos un elemento dentro del forEach. Lo que hacemos es: agregamos los elementos en el contenedor virtual, y una vez estén todos, pintamos de una sola vez lo que hay en el contenedor sobre el DOM.
    Esto mejora bastante el rendimiento, sobre todo cuando tenemos muchos elementos :)
    */
    const documentFragment = document.createDocumentFragment()

    jobs.forEach(job => documentFragment.appendChild(createJobElement(job)))
    jobsListings.appendChild(documentFragment)
}
