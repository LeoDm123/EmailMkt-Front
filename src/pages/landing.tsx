import { LogIn } from "../components/login/login";

window.onbeforeunload = () => {
  localStorage.removeItem("loggedUser");
};

function Landing() {
  return (
    <>
      <LogIn />
    </>
  );
}

export default Landing;
