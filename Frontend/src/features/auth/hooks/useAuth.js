import { useDispatch } from 'react-redux';
import { register, login, getme } from '../services/auth.api.js';
import { setUser, setLoading, setError } from '../auth.slice.js';

export function useAuth() {

    const dispatch = useDispatch();
    async function handleregister({ email, username, password }) {

        try {
            dispatch(setLoading(true));
            const data = await register({ email, username, password });
            return data;
        }
        catch (err) {
            dispatch(setError(err.response?.data?.message || "Registration failed"));
            throw err;
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    async function handlelogin({ identifier, password }) {
        try {
            dispatch(setLoading(true));
            dispatch(setError(null));
            const data = await login({ identifier, password });
            dispatch(setUser(data.user));
            return data;
        }

        catch (err) {
            dispatch(setError(err.response?.data?.message || "Login failed"));
            throw err;
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    async function handlegetme() {
        try {
            dispatch(setLoading(true));
            const data = await getme();
            dispatch(setUser(data));
        }
        catch (err) {
            dispatch(setError(err.response?.data?.message || "Failed to fetch user details"));
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    return { handleregister, handlelogin, handlegetme };
}