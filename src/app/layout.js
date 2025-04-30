import '../styles/globals.css'

export const metadata = {
    title: 'Cardápio Online',
    description: 'Cardápio dinâmico em Next.js',
};

export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <header>
                    <h1>Restaurante Exemplo</h1>
                    <p>Confira nosso cardápio!</p>
                </header>
                {children}
                <footer>© 2025 Restaurante Exemplo</footer>
            </body>
        </html>
    );
}
