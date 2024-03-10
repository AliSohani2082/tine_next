import { authors } from "@/data/dataAdaptor";

type AuthorSliderProps = {
	id: string;
};

const AuthorSlider: React.FC<AuthorSliderProps> = ({ id }) => {
	const author = authors.find((author) => author.id === id);

	return <div>{author?.name}</div>;
};

export default AuthorSlider;
