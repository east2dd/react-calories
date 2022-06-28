
export function AuthStatus(props: any) {
  if (!props.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <div>
      <span>Welcome {props.user.email}&nbsp;</span>
      <input
        type="button"
        value="Signout"
        onClick={props.onClickSignout}
      />
    </div>
  );
}
