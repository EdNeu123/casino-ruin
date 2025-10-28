import Leaderboard from "../components/Leaderboard";

export default function Home() {
    return (
        <div className="space-y-12 py-8">
            {/* Seção de Introdução */}
            <section className="text-center max-w-3xl mx-auto p-6 bg-black-bean/70 rounded-xl shadow-2xl border-2 border-burgundy">
                <h1 className="text-5xl font-extrabold mb-4 text-vermilion text-glow uppercase tracking-wider">
                    A Ruína do Jogador
                </h1>
                <p className="text-xl text-white mb-6">
                    Bem-vindo ao Casino Ruin, um simulado com o propósito de ilustrar o conceito matemático de
                    <span className="font-bold text-vermilion ml-1">"A Ruína do Jogador"</span>.
                </p>
                <p className="text-lg text-gray-300">
                    Neste ambiente, você pode simular apostas em jogos de casino, como a roleta, e observar como as probabilidades, mesmo que ligeiramente desfavoráveis,
                    inevitavelmente levam à perda total do capital em um número suficiente de jogadas.
                    <span className="block mt-2 italic">A casa sempre vence no longo prazo.</span>
                </p>
            </section>

            {/* Seção de Placar */}
            <section>
                <Leaderboard />
            </section>

            {/* Seção de Chamada para Ação */}
            <section className="text-center">
                <a href="/games" className="btn-primary text-2xl px-10 py-4 inline-block shadow-vermilion/50">
                    Comece a Jogar (e a Aprender)
                </a>
            </section>
        </div>
    );
}

