const searchForm = document.querySelector('.cmp-search-form')
const searchInput = document.querySelector('#search-input')
const technologyFilter = document.querySelector('#technology-filter')
const locationFilter = document.querySelector('#location-filter')
const experienceLevelFilter = document.querySelector('#experience-level-filter')

const jobsListings = document.querySelector('.jobs-listings')
const noResultsBanner = document.querySelector('.results > small')

if (
  searchForm &&
  searchInput &&
  technologyFilter &&
  locationFilter &&
  experienceLevelFilter &&
  jobsListings &&
  noResultsBanner
) {
  const filterJobs = () => {
    // agregamos un .trim() por si el usuario ingresa espacios vacíos
    const titleSearched = searchInput.value.toLocaleLowerCase().trim()
    const selectedTechnology = technologyFilter.value
    const selectedLocation = locationFilter.value
    const selectedExperienceLevel = experienceLevelFilter.value

    let hasResults = false
    const jobs = document.querySelectorAll('.jobs-listings > li')

    jobs.forEach(job => {
      const { technology, location, level } = job.dataset
      const title = job.querySelector('h3')?.textContent.toLocaleLowerCase()

      // hacemos un split para convertir la cadena en un array de tecnologías. Esto es porque:
      // si buscamos por texto, y seleccionamos `java`, nos dará resultados tanto de `java` como `javascript`.
      // Porque el texto `java` está dentro de `javascript`.
      // Al hacer un .split(), nos aseguramos que cada tecnología sea evaluada individualmente.
      // Esto evita que `java` coincida con `javascript` solo por contener la subcadena `java`.
      const listOfTechnologies = technology.split(',');

      const match = [
        titleSearched === '' || title.includes(titleSearched),
        selectedTechnology === '' || listOfTechnologies.includes(selectedTechnology),
        selectedLocation === '' || location === selectedLocation,
        selectedExperienceLevel === '' || level === selectedExperienceLevel,
      ].every(v => v)

      job.hidden = !match
      if (match) hasResults = true
    })

    jobsListings.hidden = !hasResults
    noResultsBanner.hidden = hasResults
  }

  searchForm.addEventListener('change', filterJobs)
  searchForm.addEventListener('submit', e => e.preventDefault()) // Excelente idea!
  searchForm.addEventListener('reset', () => setTimeout(() => filterJobs()))

  searchInput.addEventListener('input', filterJobs)
}
