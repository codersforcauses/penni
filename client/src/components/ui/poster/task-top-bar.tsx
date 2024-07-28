import Image from "next/image";
import { useRouter } from "next/router";

export default function TaskTopBar() {
  const router = useRouter();
  const handleOnClick = async () => {
    router.push(`/poster/profile`);
  };
  return (
    <div className="sticky top-0 z-10 flex w-full items-center justify-between bg-white">
      <p className="text-xl font-semibold">Penni</p>
      <button onClick={handleOnClick}>
        <Image
          src="/profile-2.svg"
          alt="Profile"
          width={50}
          height={50}
          className="rounded-full"
        />
      </button>
    </div>
  );
}
