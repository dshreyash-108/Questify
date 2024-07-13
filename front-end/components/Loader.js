import Image from "next/image";

const Loader = () => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-spin">
        <Image fill alt="logo" src={"/logo.png"} />
      </div>
      <p className="text-[17px] text-muted-foreground">
        Please Wait!! Questify is Extracting Data & Generating Summary
      </p>
    </div>
  );
};

export default Loader;
