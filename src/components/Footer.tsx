export default function Footer() {
    return (
        <footer className="bg-black-bean text-white text-center p-4 text-sm border-t-2 border-wine/50">
            <p className="mb-1">
                <span className="font-bold text-vermilion">Casino Ruin</span> é um projeto demonstrativo para ilustrar o conceito de <span className="italic">"A Ruína do Jogador"</span>.
            </p>
            <p>&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
        </footer>
    );
}

