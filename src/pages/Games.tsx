import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { GiRollingDices } from "react-icons/gi";

// Números da roleta Europeia (0 a 36)
const rouletteNumbers = Array.from({ length: 37 }, (_, i) => i);

// Função de simulação de sorteio
const spinRoulette = () => {
    return rouletteNumbers[Math.floor(Math.random() * rouletteNumbers.length)];
};

export default function Games() {
    const { user, updateBalance } = useUser();
    const [betAmount, setBetAmount] = useState(10);
    const [betType, setBetType] = useState<'red' | 'black' | 'number' | 'none'>('red');
    const [betNumber, setBetNumber] = useState<number | null>(null);
    const [result, setResult] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);

    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    const isRed = (num: number) => redNumbers.includes(num);
    const isBlack = (num: number) => num !== 0 && !isRed(num);

    const handleSpin = () => {
        if (betAmount <= 0 || betAmount > user.balance) {
            setMessage('Aposta inválida. Verifique o valor.');
            return;
        }

        setIsSpinning(true);
        setMessage('Fazendo aposta...');

        // Simulação de delay para a animação
        setTimeout(() => {
            const winningNumber = spinRoulette();
            setResult(winningNumber);
            setIsSpinning(false);

            let winAmount = 0;
            let isWin = false;

            // Lógica de ganho
            if (betType === 'red' && isRed(winningNumber)) {
                isWin = true;
                winAmount = betAmount * 1; // 1:1
            } else if (betType === 'black' && isBlack(winningNumber)) {
                isWin = true;
                winAmount = betAmount * 1; // 1:1
            } else if (betType === 'number' && betNumber === winningNumber) {
                isWin = true;
                winAmount = betAmount * 35; // 35:1
            }

            if (isWin) {
                updateBalance(winAmount);
                setMessage(`Parabéns! O número sorteado foi ${winningNumber}. Você ganhou ${winAmount.toFixed(2)}.`);
            } else {
                updateBalance(-betAmount);
                setMessage(`Que pena! O número sorteado foi ${winningNumber}. Você perdeu ${betAmount.toFixed(2)}.`);
            }
        }, 2000);
    };

    return (
        <div className="flex flex-col items-center space-y-8 py-8">
            <h1 className="text-5xl font-extrabold text-vermilion text-glow uppercase tracking-wider">
                Roleta da Ruína
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl text-center">
                Aposte e veja a matemática da "Ruína do Jogador" em ação. A roleta europeia tem 37 números (0-36).
            </p>

            {/* Painel de Controle e Status */}
            <div className="bg-black-bean/70 p-6 rounded-xl shadow-2xl border-2 border-wine w-full max-w-md space-y-4">
                <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-400">Saldo Atual:</span>
                    <span className="text-2xl font-bold text-vermilion">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(user.balance)}
                    </span>
                </div>

                {/* Campo de Aposta */}
                <div className="space-y-2">
                    <label className="block text-gray-300">Valor da Aposta:</label>
                    <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(parseFloat(e.target.value))}
                        min="1"
                        max={user.balance}
                        className="w-full p-3 rounded-lg bg-onyx text-white border border-wine focus:ring-vermilion focus:border-vermilion"
                        disabled={isSpinning}
                    />
                </div>

                {/* Tipo de Aposta */}
                <div className="space-y-2">
                    <label className="block text-gray-300">Tipo de Aposta:</label>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => { setBetType('red'); setBetNumber(null); }}
                            className={`flex-1 p-3 rounded-lg font-bold transition duration-200 ${
                                betType === 'red' ? 'bg-vermilion text-white shadow-lg' : 'bg-onyx text-gray-300 hover:bg-onyx/80'
                            }`}
                            disabled={isSpinning}
                        >
                            Vermelho (1:1)
                        </button>
                        <button
                            onClick={() => { setBetType('black'); setBetNumber(null); }}
                            className={`flex-1 p-3 rounded-lg font-bold transition duration-200 ${
                                betType === 'black' ? 'bg-eerie-black text-white shadow-lg' : 'bg-onyx text-gray-300 hover:bg-onyx/80'
                            }`}
                            disabled={isSpinning}
                        >
                            Preto (1:1)
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input
                            type="number"
                            placeholder="Número (0-36)"
                            min="0"
                            max="36"
                            value={betNumber ?? ''}
                            onChange={(e) => {
                                const num = parseInt(e.target.value);
                                if (!isNaN(num) && num >= 0 && num <= 36) {
                                    setBetNumber(num);
                                    setBetType('number');
                                } else {
                                    setBetNumber(null);
                                    setBetType('none');
                                }
                            }}
                            className="flex-1 p-3 rounded-lg bg-onyx text-white border border-wine focus:ring-vermilion focus:border-vermilion"
                            disabled={isSpinning}
                        />
                        <button
                            onClick={() => {
                                if (betNumber !== null) {
                                    setBetType('number');
                                }
                            }}
                            className={`p-3 rounded-lg font-bold transition duration-200 ${
                                betType === 'number' ? 'bg-burgundy text-white shadow-lg' : 'bg-onyx text-gray-300 hover:bg-onyx/80'
                            }`}
                            disabled={isSpinning || betNumber === null}
                        >
                            Apostar Número (35:1)
                        </button>
                    </div>
                </div>

                {/* Botão de Girar */}
                <button
                    onClick={handleSpin}
                    className="btn-primary w-full text-xl flex items-center justify-center space-x-2"
                    disabled={isSpinning || betAmount <= 0 || betAmount > user.balance || betType === 'none'}
                >
                    {isSpinning ? (
                        <>
                            <GiRollingDices className="animate-spin" />
                            <span>Girando...</span>
                        </>
                    ) : (
                        <span>Girar Roleta</span>
                    )}
                </button>
            </div>

            {/* Resultado */}
            <div className={`text-center p-4 rounded-lg w-full max-w-md ${result === 0 ? 'bg-green-700' : isRed(result ?? -1) ? 'bg-vermilion' : isBlack(result ?? -1) ? 'bg-eerie-black' : 'bg-transparent'}`}>
                {result !== null && (
                    <p className="text-3xl font-black text-white">
                        Número Sorteado: <span className="text-glow">{result}</span>
                    </p>
                )}
                <p className="text-xl font-semibold mt-2 text-white">{message}</p>
            </div>
        </div>
    );
}

