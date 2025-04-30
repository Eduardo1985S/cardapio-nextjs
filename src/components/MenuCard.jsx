import Image from 'next/image';

export default function MenuCard({ item }) {
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
            </div>
        </div>
    );
}
