import { Container } from '@/components/shared/Container'
import { trustMetrics } from '@/data/metrics'
import { useCountUp } from '@/hooks/useCountUp'

function Metric({ value, label }: { value: string; label: string }) {
  const ref = useCountUp<HTMLParagraphElement>(value)
  return (
    <div className="border-l border-[--line] pl-5 first:border-l-0 first:pl-0">
      <p ref={ref} className="text-[--color-navy] font-semibold tracking-tight" style={{ fontSize: 'var(--fs-h3)' }}>
        {value}
      </p>
      <p className="mt-1 text-sm text-[--color-secondary]">{label}</p>
    </div>
  )
}

export function TrustBar() {
  return (
    <section className="border-y border-[--line] bg-white">
      <Container className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
        {trustMetrics.map((m) => (
          <Metric key={m.label} value={m.value} label={m.label} />
        ))}
      </Container>
    </section>
  )
}
