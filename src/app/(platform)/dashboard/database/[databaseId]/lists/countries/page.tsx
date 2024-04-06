import Countries from "./countries";

const CountriesPage = ({ params }: { params: { databaseId: string } }) => {
	return <Countries databaseId={params.databaseId} />;
};

export default CountriesPage;
