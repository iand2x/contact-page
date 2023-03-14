import { RenderEpisode } from "@/components/renderEpisodes";
import axios from "axios";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCharById } from "./api/relevantURL";

const IndividualProfile = () => {
  const router = useRouter();
  const charID: any = router?.query?.id;
  const [charData, setCharData] = useState<any>({});
  const [episodeData, setEpisodeData] = useState<any>([]);
  const imageURL = charData?.image;

  useEffect(() => {
    // let mounted = true;
    axios({
      method: "GET",
      url: getCharById(charID),
    })
      .then((result) => setCharData(result.data))
      .catch((err) => console.log(err));

    return () => {
      // mounted = false;
    };
  }, [charID]);

  useEffect(() => {
    if (charData.episode) {
      let requests = charData.episode.map((url: string) => axios.get(url));
      axios.all(requests).then((responses) => {
        responses.forEach((resp: any) => {
          let msg = {
            // server: resp?.headers?.server,
            status: resp?.status,
            fields: Object.keys(resp.data).toString(),
          };
          console.log(resp.data);
          setEpisodeData((prevData: any) => [...prevData, resp.data]);
          console.info(resp.config.url);
          console.table(msg);
        });
      });
    }
  }, [charData.episode]);

  const backToChar = () => {
    router.back();
  };

  return (
    <>
      <NextSeo
        title={`${charData.name} - SleekFlow`}
        description={`View information about ${charData.name}`}
      />
      <div className="relative max-w-md mx-auto md:max-w-4xl min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="w-full flex justify-center">
              <div className="relative flex justify-center">
                <Image
                  src={imageURL}
                  className="shadow-xl rounded-full align-middle border-none"
                  width={150}
                  height={150}
                  alt={"pp"}
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              {charData.name}
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              Personal Info
            </div>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
                  <div className="mr-3 h-6 text-sm sm:h-9 font-semibold">
                    <p className="font-thin">Status: </p>
                    {charData.status}
                  </div>
                  <div className="mr-3 h-6 text-sm sm:h-9 font-semibold">
                    <p className="font-thin">Gender: </p>
                    {charData.gender}
                  </div>
                  <div className="mr-3 h-6 text-sm sm:h-9 font-semibold">
                    <p className="font-thin">Species: </p>
                    {charData.species}
                  </div>
                  <div className="mr-3 h-6 text-sm sm:h-9 font-semibold">
                    <p className="font-thin">Location: </p>
                    {charData.location?.name}
                  </div>
                  <div className="mr-3 h-6 text-sm sm:h-9 font-semibold">
                    <p className="font-thin">Origin: </p>
                    {charData.origin?.name}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6">
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              Episodes
            </div>
            <br />
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
                    Air Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Episode
                  </th>
                </tr>
              </thead>
              <tbody divide-y divide-gray-200>
                {charData.episode &&
                  episodeData.map((data: any, index: number) => (
                    <RenderEpisode key={index} epiData={data} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer>
        <div className="flex justify-end">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={backToChar}
          >
            Back to characters
          </button>
        </div>
      </footer>
    </>
  );
};

export default IndividualProfile;
