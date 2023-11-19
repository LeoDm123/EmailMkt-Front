import { LogIn } from "../components/admin/login";

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
