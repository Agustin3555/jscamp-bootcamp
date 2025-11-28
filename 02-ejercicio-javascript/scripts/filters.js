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
    const titleSearched = searchInput.value.toLocaleLowerCase()
    const selectedTechnology = technologyFilter.value
    const selectedLocation = locationFilter.value
    const selectedExperienceLevel = experienceLevelFilter.value

    let hasResults = false
    const jobs = document.querySelectorAll('.jobs-listings > li')

    jobs.forEach(job => {
      const { technology, location, level } = job.dataset
      const title = job.querySelector('h3')?.textContent.toLocaleLowerCase()

      const match = [
        titleSearched === '' || title.includes(titleSearched),
        selectedTechnology === '' || technology.includes(selectedTechnology),
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
  searchForm.addEventListener('submit', e => e.preventDefault())
  searchForm.addEventListener('reset', () => setTimeout(() => filterJobs()))

  searchInput.addEventListener('input', filterJobs)
}
