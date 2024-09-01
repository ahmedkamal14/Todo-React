import useTextFormatter from "../Hooks/useTextFormatter";
import PropTypes from "prop-types";

const TextF = ({ text }) => {
  const formattedText = useTextFormatter(text);
  return (
    <div>
      <p>{formattedText}</p>
    </div>
  );
};

TextF.propTypes = {
  text: PropTypes.string.isRequired,
};

export default TextF;
