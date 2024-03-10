import Lottie from "react-lottie";
import dots from "public/assets/animation/dots.json";

const Loading = () => (
	<div className="w-full h-full flex justify-center items-center">
		<Lottie
			options={{ animationData: dots, loop: true }}
			width={272}
			height={272}
		/>
	</div>
);

export default Loading;
