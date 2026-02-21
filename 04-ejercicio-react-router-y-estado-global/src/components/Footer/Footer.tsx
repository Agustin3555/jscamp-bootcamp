import './Footer.css'

export const Footer = () => (
  <footer className="cmp-footer">
    <small className="text-muted">
      &copy; {new Date().getFullYear()} DevJobs. Todos los derechos reservados.
    </small>
  </footer>
)
