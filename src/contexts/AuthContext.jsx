import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);
    
    // Effect to update user profile data when user changes
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!user) return;
            
            try {
                const { data: profileData, error } = await supabase
                    .from('profiles')
                    .select('name')
                    .eq('id', user.id)
                    .single();
                
                if (!error && profileData) {
                    // Merge profile data with user data
                    setUser(prevUser => ({
                        ...prevUser,
                        user_metadata: {
                            ...prevUser.user_metadata,
                            full_name: profileData.name || prevUser.user_metadata?.full_name
                        }
                    }));
                }
            } catch (err) {
                console.error('Error fetching user profile:', err);
            }
        };
        
        fetchUserProfile();
    }, [user]);

    const value = {
        signUp: (data) => supabase.auth.signUp(data),
        signIn: (data) => supabase.auth.signInWithPassword(data),
        signOut: () => supabase.auth.signOut(),
        user,
        updateUserProfile: async (profileData) => {
            if (!user) return { error: 'No user logged in' };
            
            const { error } = await supabase
                .from('profiles')
                .upsert({
                    id: user.id,
                    ...profileData
                });
            
            if (error) {
                return { error };
            }
            
            // Update the local user state with new profile data
            setUser(prevUser => ({
                ...prevUser,
                user_metadata: {
                    ...prevUser.user_metadata,
                    full_name: profileData.name
                }
            }));
            
            return { error: null };
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
