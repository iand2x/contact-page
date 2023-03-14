export const RenderEpisode = (props: any) => {
  const { epiData } = props;

  return (
    <>
      <tr>
        <td className="text-left px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {epiData?.name}
        </td>
        <td className="text-left px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {epiData?.air_date}
        </td>
        <td className="text-left px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {epiData?.episode}
        </td>
      </tr>
    </>
  );
};
