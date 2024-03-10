import { countries } from "@/data/dataAdaptor";

type CountrySliderProps = {
	id: string;
};

const CountrySlider: React.FC<CountrySliderProps> = ({ id }) => {
	const country = countries.find((country) => country.id === id);

	return <div>{country?.name}</div>;
};

export default CountrySlider;
