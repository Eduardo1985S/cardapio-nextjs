import { useMemo } from 'react';

export default function OrderSummary({ items, onIncrease, onDecrease, onClear }) {
    // Agrupa e conta quantidades
    const summary = useMemo(() => {
        const map = {};
        items.forEach(i => {
            if (!map[i.name]) map[i.name] = { ...i, qty: 0 };
            map[i.name].qty += 1;
        });
        return Object.values(map);
    }, [items]);

    // Total
    const total = useMemo(
        () => items.reduce((sum, i) => sum + i.price, 0),
        [items]
    );

    // Texto bruto para preview (com quebras reais)
    const rawText = useMemo(() => {
        let txt = '🧾 *COMANDA* 🧾\n\n';
        txt += '──────────────────────\n\n';
        summary.forEach(i => {
            txt += `${i.qty}x ${i.name} 🍽️ – R$ ${(i.price * i.qty)
                .toFixed(2)
                .replace('.', ',')}\n`;
        });
        txt += '\n──────────────────────\n';
        txt += `*Total: R$ ${total.toFixed(2).replace('.', ',')}*\n\n`;
        txt += 'Obrigado pela preferência! 🙏';
        return txt;
    }, [summary, total]);

    // URI encoded para link
    const whatsappURL = useMemo(
        () => {
            const encoded = encodeURIComponent(rawText);
            return `https://api.whatsapp.com/send?phone=11958554248&text=${encoded}`;
        },
        [rawText]
    );

    const btnStyle = {
        width: '24px',
        height: '24px',
        margin: '0 4px',
        background: 'var(--primary)',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    // Handler para envio: limpa a comanda após abrir o WhatsApp
    const handleSend = () => {
        // Abre o link em nova aba
        window.open(whatsappURL, '_blank');
        // Limpa o carrinho
        if (typeof onClear === 'function') onClear();
    };

    return (
        <aside style={{
            position: 'fixed',
            top: '5rem',
            right: '1rem',
            width: '260px',
            maxHeight: '80vh',
            overflowY: 'auto',
            background: '#fff',
            padding: '1rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            zIndex: 1000
        }}>
            <h3 style={{ textAlign: 'center' }}>🧾 Comanda</h3>

            {summary.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>Sem itens</p>
            ) : (
                <>
                    {summary.map(i => (
                        <div
                            key={i.name}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '0.5rem'
                            }}
                        >
                            <div>{i.name}</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <button onClick={() => onDecrease(i.name)} style={btnStyle}>–</button>
                                <span>{i.qty}</span>
                                <button onClick={() => onIncrease(i.name)} style={btnStyle}>+</button>
                            </div>
                        </div>
                    ))}

                    <hr style={{ margin: '1rem 0' }} />

                    <p style={{ textAlign: 'right', fontWeight: 'bold' }}>
                        Total: R$ {total.toFixed(2).replace('.', ',')}
                    </p>

                    {/* Preview legível */}
                    <div style={{ margin: '1rem 0' }}>
                        <h4 style={{ marginBottom: '0.5rem' }}>Preview do pedido:</h4>
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            background: '#f4f4f4',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.9rem'
                        }}>
                            {rawText}
                        </pre>
                    </div>

                    <button
                        onClick={handleSend}
                        style={{
                            display: 'block',
                            width: '100%',
                            background: '#25D366',
                            color: '#fff',
                            textAlign: 'center',
                            padding: '0.5rem',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        👉 Enviar pedido
                    </button>
                </>
            )}
        </aside>
    );
}