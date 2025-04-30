'use client';

import { useState } from 'react';
import menuData from '../data/menu.json';
import MenuCard from '../components/MenuCard';
import OrderSummary from '../components/OrderSummary';

export default function Page() {
    const [filter, setFilter] = useState('all');
    const [cart, setCart] = useState([]);
    const categories = ['all', ...new Set(menuData.map(i => i.category))];

    // adiciona uma unidade
    const handleAdd = item => {
        setCart(prev => [...prev, item]);
    };

    // incrementa quantidade (encontra pelo nome)
    const handleIncrease = name => {
        const item = menuData.find(i => i.name === name);
        if (item) setCart(prev => [...prev, item]);
    };

    // remove uma unidade
    const handleDecrease = name => {
        setCart(prev => {
            const idx = prev.findIndex(i => i.name === name);
            if (idx === -1) return prev;
            const next = [...prev];
            next.splice(idx, 1);
            return next;
        });
    };

    const filtered = filter === 'all'
        ? menuData
        : menuData.filter(i => i.category === filter);

    return (
        <>
            <nav>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={filter === cat ? 'active' : ''}
                        onClick={() => setFilter(cat)}
                    >
                        {cat === 'all' ? 'Todas' : cat}
                    </button>
                ))}
            </nav>

            <main>
                {categories
                    .filter(cat => cat === 'all' || cat === filter)
                    .map(cat => (
                        <section key={cat} className="menu-section">
                            {cat !== 'all' && <h2>{cat}</h2>}
                            <div className="menu-items">
                                {filtered
                                    .filter(item => cat === 'all' || item.category === cat)
                                    .map(item => (
                                        <MenuCard
                                            key={item.name}
                                            item={item}
                                            onAdd={handleAdd}
                                        />
                                    ))}
                            </div>
                        </section>
                    ))}
            </main>

            {/* passa também os handlers de aumentar/diminuir */}
            <OrderSummary
                items={cart}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
            />
        </>
    );
}
