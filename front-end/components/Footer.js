import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
const FooterCategory = ({ title, items }) => (
  <div className="flex-1">
    x<p className="font-semibold text-[#FF0204] text-lg mb-4">{title}</p>
    {items.map((item, index) => (
      <p key={index} className="text-[#cbc4c4] font-medium text-xs mb-2">
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => {
  const companyItems = ["About Us", "Careers", "Blog", "Brands Associated"];
  const servicesItems = [
    "Request Quotations",
    "Calculate Requirements",
    "Water Treatment Products",
  ];
  const categoriesItems = [
    "Filtration Technologies",
    "Separation Technologies",
    "Water and Wastewater Treatment Systems",
    "Mechmann Exclusives",
  ];

  return (
    <div className="bg-black py-20 ">
      <div className="flex flex-wrap justify-between mx-4 sm:mx-10 lg:mx-20 gap-8">
        <FooterCategory title="Company" items={companyItems} />
        <FooterCategory title="Our Services" items={servicesItems} />
        <FooterCategory title="Featured Categories" items={categoriesItems} />
        <div className="flex-1 items-center justify-center pl-12">
          <img src="/logo.svg" alt="Logo" className="h-20 mb-6" />
          <div className="flex flex-col items-start">
            <p className="font-semibold  text-white mb-2 w-full text-sm">
              {" It's Not Magic, It's Engineering"}
            </p>
            <div className="flex">
              <div className="h-10 w-10 text-white hover:bg-white hover:text-black rounded-full flex items-center justify-center mr-2">
                <FacebookIcon />
              </div>
              <div className="h-10 w-10 text-white hover:bg-white hover:text-black rounded-full flex items-center justify-center mr-2">
                <InstagramIcon />
              </div>
              <div className="h-10 w-10 text-white hover:bg-white hover:text-black rounded-full flex items-center justify-center mr-2">
                <TwitterIcon />
              </div>
              <div className="h-10 w-10  text-white hover:bg-white hover:text-black rounded-full flex items-center justify-center">
                <LinkedInIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10 text-[#cbc4c4] font-semibold text-md">
        ©2001 Mechmann Engineering PVT. LTD.
      </div>
    </div>
  );
};

export default Footer;
