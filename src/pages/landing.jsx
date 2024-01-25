import { LogIn } from "../components/landing/login";

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
