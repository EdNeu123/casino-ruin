import leaderboardData from '../data/mockLeaderboard.json';
import { GiCrown } from "react-icons/gi";

interface Player {
    id: number;
    name: string;
    balance: number;
    wins: number;
    losses: number;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(amount);
};

export default function Leaderboard() {
    const sortedPlayers: Player[] = leaderboardData.sort((a, b) => b.balance - a.balance) as Player[];

    return (
        <div className="bg-black-bean/80 p-6 rounded-xl shadow-2xl border-2 border-wine max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-6 text-vermilion text-glow uppercase tracking-widest">
                Placar dos Top Jogadores
            </h2>
            <div className="space-y-3">
                {sortedPlayers.map((player, index) => (
                    <div
                        key={player.id}
                        className={`flex justify-between items-center p-4 rounded-lg transition duration-300 ease-in-out ${
                            index === 0
                                ? 'bg-vermilion/20 border-l-4 border-vermilion transform scale-105'
                                : 'bg-onyx/50 border-l-4 border-wine hover:bg-onyx/70'
                        }`}
                    >
                        <div className="flex items-center space-x-4">
                            <span className={`text-xl font-black w-6 text-center ${index === 0 ? 'text-vermilion' : 'text-white'}`}>
                                {index + 1}
                            </span>
                            {index === 0 && <GiCrown className="text-2xl text-yellow-400" />}
                            <span className="text-lg font-semibold">{player.name}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Saldo</p>
                            <p className="text-xl font-bold text-white">
                                {formatCurrency(player.balance)}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-center text-xs mt-4 text-gray-400">
                Os dados são mockados e apenas para fins ilustrativos.
            </p>
        </div>
    );
}

