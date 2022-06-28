
import { useObservableState } from "observable-hooks";
import { createContext, ReactNode, useContext, useMemo } from "react";

import {
  useLocation,
  Navigate,
} from "react-router-dom";
import { BehaviorSubject } from "rxjs";
import { axiosPublic } from "./axios";

interface User {
  email?: string;
}

export const user$ = new BehaviorSubject<User>(null!);
export const token$ = new BehaviorSubject<string>(localStorage.getItem('jwt_token') || '');

interface AuthContextType {
  user$: BehaviorSubject<User>;
  token$: BehaviorSubject<string>;
  signin: (token: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const signin = (token: string, callback: VoidFunction) => {
  token$.next(token);
  callback();
};

export const signout = (callback: VoidFunction) => {
  user$.next(null!);
  token$.next('');

  callback();
};

export const authenticate = (token: string) => {
  axiosPublic.get('/api/v1/user').then((res) => {
    user$.next(res.data);
  });
}

export const AuthContext = createContext<AuthContextType>({
  user$,
  token$,
  signin,
  signout
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const value = { user$, token$, signin, signout };
  const token = useObservableState(token$, '');

  useMemo(() => {
    authenticate(token);
  }, [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { token$ } = useAuth();
  let location = useLocation();
  const token = useObservableState(token$, null);

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
