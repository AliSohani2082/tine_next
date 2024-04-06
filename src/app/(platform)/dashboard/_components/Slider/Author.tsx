import { authors } from "@/data/dataAdaptor";
import { useDownSlider } from "@/hooks/use-downSlider";

type AuthorSliderProps = {
	id: string;
};

const AuthorSlider: React.FC<AuthorSliderProps> = ({ id }) => {
	const { databaseId } = useDownSlider();
	const author = authors(databaseId).find((author) => author.id === id);

	return <div>{author?.name}</div>;
};

export default AuthorSlider;
