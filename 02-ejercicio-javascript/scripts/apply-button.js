const jobsListings = document.querySelector('.jobs-listings')

jobsListings?.addEventListener('click', e => {
  const element = e.target

  const isButton = element.classList.contains('cmp-button')
  if (!isButton) return

  e.preventDefault()

  const button = element
  button.disabled = true
  button.textContent = '¡Aplicado!'
})
