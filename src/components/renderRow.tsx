import { useRouter } from "next/router";

export const RenderTable = (props: any) => {
  const router = useRouter();
  const { data } = props;
  const onClick = () => {
    // handleCallback(data?.id);
    router.push(
      {
        pathname: "/profile",
        query: { id: data?.id },
      },
      "/profile"
    );
  };
  return (
    <>
      <tr onClick={onClick}>
        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
          {data?.name}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data?.status}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data?.species}
        </td>
        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
          {data?.gender}
        </td>
      </tr>
    </>
  );
};
