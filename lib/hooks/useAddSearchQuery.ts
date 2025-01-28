import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useAddSearchQuery = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (query: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(query, value);
    } else {
      params.delete(query);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return { handleSearch, searchParams };
};
export default useAddSearchQuery;
