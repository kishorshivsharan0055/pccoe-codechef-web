import { CircularProgress } from "@rmwc/circular-progress";
import "@rmwc/circular-progress/circular-progress.css";

const ContainedButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { loading?: boolean }
> = (props) => {
  const { loading, ...btnProps } = props;
  return (
    <button
      disabled={loading || props.disabled}
      className={`${
        props.disabled
          ? "bg-mgray-light text-black-500"
          : "bg-black text-white "
      } px-6 py-4 font-medium flex flex-row space-x-3 items-center justify-center`}
      {...btnProps}
    >
      {loading && <CircularProgress size="xsmall" />}
      {props.children}
    </button>
  );
};

export default ContainedButton;
