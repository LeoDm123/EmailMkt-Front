import Button from "@mui/material/Button";

interface CapButtonProps {
  handleClick: () => void;
}

const CapButton = ({ handleClick }: CapButtonProps) => {
  return (
    <div className="mt-2 w-100">
      <div className="d-flex justify-content-end">
        <div>
          <Button variant="contained" onClick={handleClick}>
            Agregar / Retirar Capital
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CapButton;
