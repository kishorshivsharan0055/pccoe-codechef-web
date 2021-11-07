import { CircularProgress } from "@rmwc/circular-progress";
import "@rmwc/circular-progress/circular-progress.css";
const RoundedButton: React.FC<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> & { loading?: boolean }
> = (props) => {
	const { loading, ...btnProps } = props;
	return (
		<button
			disabled={loading}
			className={` ${
				props.disabled
					? "bg-mgray-lighter text-black-400"
					: "bg-white text-black"
			} px-6 py-3 font-medium flex flex-row space-x-3 items-center justify-center space-x-4 shadow hover:shadow-md duration-300`}
			{...btnProps}
		>
			{loading && <CircularProgress size="xsmall" />}
			{props.children}
		</button>
	);
};

export default RoundedButton;
