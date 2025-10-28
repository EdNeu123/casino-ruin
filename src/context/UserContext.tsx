import React, { createContext, useState, useContext, ReactNode } from 'react';
import mockUserData from '../data/mockUserData.json';

// Definindo a interface para os dados do usuário
interface UserData {
    id: string;
    name: string;
    balance: number;
    lastLogin: string;
}

// Definindo a interface para o contexto
interface UserContextType {
    user: UserData | null;
    isAuthenticated: boolean;
    updateBalance: (amount: number) => void;
    login: (name: string) => void;
    register: (name: string) => void;
    logout: () => void;
}

// Criando o contexto com um valor padrão (null para indicar que precisa de um Provider)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Dados iniciais do usuário, agora pode ser null para deslogado
const initialUser: UserData = mockUserData as UserData;

// Definindo o Provider
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(initialUser);
    const isAuthenticated = user !== null;

    // Função para atualizar o saldo
    const updateBalance = (amount: number) => {
        if (user) {
            setUser(prevUser => {
                if (prevUser) {
                    return {
                        ...prevUser,
                        balance: prevUser.balance + amount,
                    };
                }
                return null;
            });
        }
    };

    // Simulação de Login
    const login = (name: string) => {
        // Simplesmente "loga" um usuário com o nome fornecido e dados mockados
        setUser({
            id: 'user-' + Date.now(),
            name: name,
            balance: 1000.00, // Saldo inicial
            lastLogin: new Date().toISOString(),
        });
    };

    // Simulação de Registro
    const register = (name: string) => {
        // Simplesmente "registra" um usuário com o nome fornecido e dados mockados
        setUser({
            id: 'user-' + Date.now(),
            name: name,
            balance: 1000.00, // Saldo inicial
            lastLogin: new Date().toISOString(),
        });
    };

    // Simulação de Logout
    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, isAuthenticated, updateBalance, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook customizado para usar o contexto
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

