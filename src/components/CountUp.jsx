// Stats are shown as plain values: no counting motion in the minimalist layout.
export default function CountUp({ value, className = '' }) {
  return <span className={className}>{value}</span>
}
