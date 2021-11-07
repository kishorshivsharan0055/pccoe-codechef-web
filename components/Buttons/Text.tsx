const TextButton: React.FC<
	React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
> = (props) => (
	<button
		className="bg-white text-black
        px-6 py-4 font-medium flex flex-row space-x-3 items-center justify-center hover:bg-black hover:text-white duration-300"
		{...props}
	/>
);

export default TextButton;
