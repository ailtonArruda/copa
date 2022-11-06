import { createContext, ReactNode, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>;
    isUserLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children } : AuthProviderProps) {
    
    const [isUserLoading, setIsUserLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '486220953544-rfbsqv32dt9sieg4nm2itvfflp3pt0f3.apps.googleusercontent.com',
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    })



    async function signIn() {
        try {
            setIsUserLoading(true);
        } catch (err) {

        } finally {
            setIsUserLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user: {
                name: 'Tiago',
                avatarUrl: 'https://github.com/tontitor.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}