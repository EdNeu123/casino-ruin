import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { GiRoyalFlush, GiExitDoor } from "react-icons/gi"; // Ícone de casino e de saída

export default function Navbar() {
    const { user, isAuthenticated, logout } = useUser();
    const navigate = useNavigate();

    // Função para formatar o saldo como moeda
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        }).format(amount);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-chocolate-cosmos-light text-white shadow-2xl border-b-2 border-vermilion/50 sticky top-0 z-10">
            <div className="container mx-auto p-4 flex justify-between items-center">
                {/* Logo e Título */}
                <Link to="/" className="flex items-center space-x-2">
                    <GiRoyalFlush className="text-4xl text-vermilion text-glow" />
                    <span className="text-2xl font-black uppercase tracking-wider text-white text-glow hidden sm:block">
                        Casino Ruin
                    </span>
                </Link>

                {/* Navegação */}
                <nav className="flex space-x-4 sm:space-x-8 text-lg font-semibold">
                    <Link to="/" className="hover:text-vermilion transition duration-300">
                        Início
                    </Link>
                    {isAuthenticated && (
                        <Link to="/games" className="hover:text-vermilion transition duration-300">
                            Roleta
                        </Link>
                    )}
                    {/* Adicionar mais links de navegação aqui se necessário */}
                </nav>

                {/* Dados do Usuário / Autenticação */}
                {isAuthenticated && user ? (
                    <div className="flex items-center space-x-4 text-sm sm:text-base bg-black-bean/70 p-2 rounded-lg border border-wine">
                        <span className="font-medium hidden sm:inline">
                            {user.name}
                        </span>
                        <div className="flex flex-col text-right">
                            <span className="text-xs text-gray-400">Saldo:</span>
                            <span className="font-bold text-lg text-vermilion">
                                {formatCurrency(user.balance)}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-white hover:text-vermilion transition duration-300 p-1"
                            title="Sair"
                        >
                            <GiExitDoor className="text-2xl" />
                        </button>
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Link to="/login" className="btn-primary text-sm py-1 px-3">
                            Login
                        </Link>
                        <Link to="/register" className="btn-primary text-sm py-1 px-3">
                            Registro
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

