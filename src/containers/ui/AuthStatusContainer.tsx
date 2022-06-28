import { useObservableState } from "observable-hooks";
import {
  useNavigate,
} from "react-router-dom";
import { AuthStatus } from "../../components/ui/AuthStatus";
import { useAuth } from "../../stores/auth";

export const AuthStatusContainer = (props: any) => {
  let { user$, signout } = useAuth();
  let navigate = useNavigate();
  const user = useObservableState(user$, null);

  const signoutHandler = () => {
    signout(() => navigate("/"));
  }

  return (
    <AuthStatus user={user} onSignoutClick={signoutHandler} />
  );
}
