import Image from "next/image";

export const Gotchi = ({ svg }) => {

  return (
    <div className="w-1/3 p-2">
      <Image src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} width={100} height={100} />
    </div>
  );
};
