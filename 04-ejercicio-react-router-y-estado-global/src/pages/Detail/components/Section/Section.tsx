import './Section.css'
import snarkdown from 'snarkdown'

interface SectionProps {
  title: string
  content: string
}

export const Section = ({ title, content }: SectionProps) => {
  const __html = snarkdown(content)

  return (
    <section className="cmp-section">
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html }} />
    </section>
  )
}
