import { CircularProgress } from "@rmwc/circular-progress";
import "@rmwc/circular-progress/circular-progress.css";

const OutlinedButton: React.FC<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> & { inverted?: boolean; loading?: boolean }
> = (props) => {
	const { loading, inverted, ...btnProps } = props;
	return (
		<button
			disabled={loading}
			className={`bg-transparent text-${
				inverted ? "white" : "black"
			} px-6 py-4 font-medium border border-${
				inverted ? "white" : "black"
			}-800 hover:bg-${inverted ? "white" : "black"} hover:text-${
				inverted ? "black" : "white"
			} duration-300 flex flex-row space-x-3 items-center justify-center`}
			{...btnProps}
		>
			{loading && <CircularProgress size="xsmall" />}
			{props.children}
		</button>
	);
};

export default OutlinedButton;
