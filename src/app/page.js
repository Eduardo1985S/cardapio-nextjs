'use client';

import { useState } from 'react';
import menuData from '../data/menu.json';
import MenuCard from '../components/MenuCard';

export default function Page() {
    const [filter, setFilter] = useState('all');
    const cats = ['all', ...new Set(menuData.map(i => i.category))];

    const filtered = filter === 'all'
        ? menuData
        : menuData.filter(i => i.category === filter);

    return (
        <>
            <nav>
                {cats.map(cat => (
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
                {cats
                    .filter(cat => cat === 'all' || cat === filter)
                    .map(cat => (
                        <section key={cat} className="menu-section">
                            {cat !== 'all' && <h2>{cat}</h2>}
                            <div className="menu-items">
                                {filtered
                                    .filter(item => cat === 'all' || item.category === cat)
                                    .map(item => (
                                        <MenuCard key={item.name} item={item} />
                                    ))}
                            </div>
                        </section>
                    ))}
            </main>
        </>
    );
}
