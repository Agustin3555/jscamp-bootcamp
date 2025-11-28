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

  jobs.forEach(job => jobsListings.appendChild(createJobElement(job)))
}
