import { useEffect, useRef, useState } from 'react';
import '@glatam/calendar-ui';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'glatam-calendar': any;
      'glatam-calendar-mini': any;
    }
  }
}

const mockRules = [
  { id: 'weekend-block', type: 'weekly' as const, daysOfWeek: [0, 6] },
  { id: 'holiday-july', type: 'date-range' as const, startDate: '2026-07-22', endDate: '2026-07-25' },
  { id: 'weekly-meeting', type: 'weekly' as const, daysOfWeek: [1], slots: [{ start: '14:00', end: '16:00' }] }
];

export default function App() {
  const [role, setRole] = useState<'provider' | 'buyer'>('provider');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [variant, setVariant] = useState<'full' | 'mini'>('full');
  
  const elementRef = useRef<any>(null);
  const [selection, setSelection] = useState<string>('Ninguna selección realizada aún.');

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    el.rules = mockRules;
    el.locale = 'es';
    el.startOfWeekDay = 1;
    el.role = role;
    el.setAttribute('size', size);

    const handleDateSelected = (e: CustomEvent) => setSelection(`Día clickeado: ${e.detail.dateString}`);
    const handleRangeSelected = (e: CustomEvent) => setSelection(`Rango seleccionado: ${e.detail.dateString} (${e.detail.start} - ${e.detail.end})`);
    const handleRulesChanged = (e: CustomEvent) => setSelection(`Bloqueos actualizados. Total: ${e.detail.rules.length}`);
    const handleBookingSelected = (e: CustomEvent) => setSelection(`🎉 ¡Reserva Realizada! Fecha: ${e.detail.dateString} (${e.detail.start} - ${e.detail.end})`);

    el.addEventListener('date-selected', handleDateSelected);
    el.addEventListener('range-selected', handleRangeSelected);
    el.addEventListener('rules-changed', handleRulesChanged);
    el.addEventListener('booking-selected', handleBookingSelected);

    return () => {
      el.removeEventListener('date-selected', handleDateSelected);
      el.removeEventListener('range-selected', handleRangeSelected);
      el.removeEventListener('rules-changed', handleRulesChanged);
      el.removeEventListener('booking-selected', handleBookingSelected);
    };
  }, [role, size, variant]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>React + GLatam Calendar</h1>
        <p style={styles.subtitle}>Consumiendo Web Components nativos desde React 18</p>
      </header>

      <div style={styles.controlBar}>
        <div style={styles.controlGroup}>
          <label style={styles.label}>Rol:</label>
          <select value={role} onChange={e => setRole(e.target.value as any)} style={styles.select}>
            <option value="provider">Anfitrión (Provider)</option>
            <option value="buyer">Comprador (Buyer)</option>
          </select>
        </div>
        <div style={styles.controlGroup}>
          <label style={styles.label}>Tamaño:</label>
          <select value={size} onChange={e => setSize(e.target.value as any)} style={styles.select}>
            <option value="medium">Normal</option>
            <option value="small">Compacto</option>
            <option value="large">Grande</option>
          </select>
        </div>
        <div style={styles.controlGroup}>
          <label style={styles.label}>Variante:</label>
          <select value={variant} onChange={e => setVariant(e.target.value as any)} style={styles.select}>
            <option value="full">Calendario Completo</option>
            <option value="mini">Mini Popover (Checkout)</option>
          </select>
        </div>
      </div>

      <div style={styles.grid}>
        <main>
          {variant === 'full' ? (
            <glatam-calendar ref={elementRef} />
          ) : (
            <glatam-calendar-mini ref={elementRef} />
          )}
        </main>

        <aside style={styles.card}>
          <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>Estado en React</h2>
          <div style={styles.resultBox}>{selection}</div>
          <hr style={styles.divider} />
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>Integración de Eventos</h3>
          <p style={{ fontSize: '0.85rem', color: '#86868b', lineHeight: 1.4 }}>
            Esta demo demuestra la interoperabilidad del componente usando propiedades imperativas de React, reaccionando a los eventos de reserva del cliente y de bloqueo del administrador.
          </p>
        </aside>
      </div>
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '40px 20px',
    maxWidth: '1000px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: { textAlign: 'center' as const, marginBottom: '24px' },
  title: { fontSize: '2.25rem', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.02em', color: '#1d1d1f' },
  subtitle: { color: '#86868b', margin: 0 },
  controlBar: {
    display: 'flex', gap: '20px', padding: '16px', background: 'white', borderRadius: '16px',
    border: '1px solid #e5e5ea', marginBottom: '24px', justifyContent: 'center', flexWrap: 'wrap' as const
  },
  controlGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  label: { fontSize: '0.9rem', fontWeight: 600 },
  select: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e5e5ea', background: 'white', cursor: 'pointer' },
  grid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' },
  card: { background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)', border: '1px solid #e5e5ea', height: 'fit-content' },
  resultBox: { padding: '12px', borderRadius: '8px', backgroundColor: '#f5f5f7', fontSize: '0.9rem', borderLeft: '4px solid #5856d6', wordBreak: 'break-word' as const },
  divider: { border: 0, borderTop: '1px solid #e5e5ea', margin: '16px 0' },
};
