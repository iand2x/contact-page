import { getCharacter, getCharByName } from "@/pages/api/relevantURL";
import axios from "axios";
import { useEffect, useState } from "react";
import { RenderTable } from "./renderRow";

const MainTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [tableContent, setTableContent] = useState<any>([]);

  useEffect(() => {
    // let mounted = true;
    axios({
      method: "GET",
      url: searchInput ? getCharByName(searchInput) : getCharacter,
    })
      .then((result) => setTableContent(result.data))
      .catch((err) => console.log(err));

    return () => {
      // mounted = false;
    };
  }, [searchInput]);

  const handleSearch = (searchName: string) => {
    setSearchInput(searchName);
  };

  const handleNext = () => {
    if (!tableContent.info.next) return;
    axios
      .get(tableContent.info.next)
      .then((result) => setTableContent(result.data))
      .catch((err) => console.log(err));
  };

  const handlePrev = () => {
    if (!tableContent.info.prev) return;
    axios
      .get(tableContent.info.prev)
      .then((result) => setTableContent(result.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
              <div className="py-3 pl-2">
                <div className="relative max-w-xs">
                  <label htmlFor="hs-table-search" className="sr-only">
                    Search
                  </label>
                  <input
                    type="text"
                    name="searchName"
                    id="searchName"
                    className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                    placeholder="Search"
                    onBlurCapture={(e) => handleSearch(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="h-3.5 w-3.5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Species
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Gender
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {tableContent.results?.map((data: any, index: number) => (
                    <RenderTable key={index} data={data} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>

      {/* <Pagination /> */}
    </>
  );
};

export default MainTable;
