// import PropTypes from "prop-types";

export default function ErrorText({ classNames, error }: any) {
    return (
        <div className={`text-red-400 text-sm font-semibold ${classNames}`}>
            {error}
        </div>
    );
}

// ErrorText.propTypes = {
//   classNames: PropTypes.string,
//   error: PropTypes.string,
// };
// ErrorText.defaultProps = {
//   classNames: "text-red-500 text-sm ",
//   error: "",
// };
