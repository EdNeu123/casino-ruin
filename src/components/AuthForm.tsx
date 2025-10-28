import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface AuthFormProps {
    type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useUser();
    const navigate = useNavigate();

    const isLogin = type === 'login';
    const title = isLogin ? 'Entrar' : 'Criar Conta';
    const actionText = isLogin ? 'Login' : 'Registrar';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (name.trim().length < 3) {
            setError('O nome deve ter pelo menos 3 caracteres.');
            return;
        }

        try {
            if (isLogin) {
                // Em um cenário real, aqui haveria uma chamada de API para autenticar
                login(name.trim());
            } else {
                // Em um cenário real, aqui haveria uma chamada de API para registrar
                register(name.trim());
            }
            navigate('/'); // Redireciona para a página inicial após o sucesso
        } catch (err) {
            // Em um cenário real, tratar erros de API
            setError('Ocorreu um erro na autenticação. Tente novamente.');
        }
    };

    return (
        <div className="flex justify-center items-center h-full py-10">
            <form
                onSubmit={handleSubmit}
                className="bg-black-bean/80 p-8 rounded-xl shadow-2xl border-2 border-wine w-full max-w-sm space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-vermilion text-glow uppercase tracking-wider">
                    {title}
                </h2>

                {error && (
                    <div className="bg-vermilion/20 text-vermilion p-3 rounded border border-vermilion/50">
                        {error}
                    </div>
                )}

                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Nome de Usuário
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg bg-onyx text-white border border-wine focus:ring-vermilion focus:border-vermilion transition duration-200"
                        placeholder="Seu nome de jogador"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-primary w-full text-lg"
                >
                    {actionText}
                </button>

                <div className="text-center text-sm">
                    {isLogin ? (
                        <p className="text-gray-400">
                            Não tem uma conta?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/register')}
                                className="text-vermilion font-semibold hover:text-wine transition duration-200"
                            >
                                Registre-se
                            </button>
                        </p>
                    ) : (
                        <p className="text-gray-400">
                            Já tem uma conta?{' '}
                            <button
                                type="button"
                                onClick={() => navigate('/login')}
                                className="text-vermilion font-semibold hover:text-wine transition duration-200"
                            >
                                Faça Login
                            </button>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
}

