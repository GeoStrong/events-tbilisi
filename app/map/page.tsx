import MapLayoutWrapper from "@/components/map/mapLayout";

const Map: React.FC = () => {
  const key = process.env.API_KEY || "";
  return <MapLayoutWrapper mapKey={key} />;
};

export default Map;
