import Image from 'next/image';

export default function MenuCard({ item, onAdd }) {
  return (
    <div className="menu-item">
      <Image
        src={item.img}
        alt={item.name}
        width={400}
        height={300}
        style={{ objectFit: 'cover' }}
      />
      <div className="content">
        <h3>{item.name}</h3>
        <p>{item.desc}</p>
        <p className="price">R$ {item.price.toFixed(2).replace('.', ',')}</p>
        <button 
          onClick={() => onAdd(item)} 
          style={{
            marginTop: 'auto',
            padding: '0.5rem 1rem',
            background: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Adicionar
        </button>
      </div>
    </div>
  );
}
