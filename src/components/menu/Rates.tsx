import Marquee from "react-fast-marquee";
import DolarBlue from "../rates/DolarBlue";
import DolarOficial from "../rates/DolarOficial";
import DolarCCL from "../rates/DolarCCL";

function Rates() {
  return (
    <Marquee speed={40} pauseOnHover>
      <DolarBlue />
      <DolarOficial />
      <DolarCCL />
    </Marquee>
  );
}

export default Rates;
