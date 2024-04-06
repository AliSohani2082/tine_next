import { countries } from "@/data/dataAdaptor";
import { useDownSlider } from "@/hooks/use-downSlider";

type CountrySliderProps = {
	id: string;
};

const CountrySlider: React.FC<CountrySliderProps> = ({ id }) => {
	const { databaseId } = useDownSlider()
	const country = countries(databaseId).find((country) => country.id === id);

	return <div>{country?.name}</div>;
};

export default CountrySlider;
