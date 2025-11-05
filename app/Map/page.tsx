import MapLayout from "@/components/map/mapLayout";

const Map: React.FC = () => {
  const key = process.env.API_KEY || "";
  return <MapLayout mapKey={key} />;
};
export default Map;
