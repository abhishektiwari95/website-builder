// import React, { useContext } from "react";
// import Image from "next/image";
//  import { Button } from "@/components/ui/button"
// import Colors from '@/data/Colors';
// import { UserDetailContext } from "@/context/UserDetailContext";

// const Header = () => {
//   const {userDetail,setUserDetail} =useContext(UserDetailContext);
   
//   return (
//     <div className="p-4 flex justify-between items-center">
//       <Image
//         src={"/images.jpg"}
//         width={40} // ✅ Required
//         height={40}
//         alt="logo"
//       />
//     {!userDetail.name &&<div className="flex gap-5"><Button varient="ghost">Sign In</Button>
//         <Button style={{backgroundColor:Colors.BLUE}}>Get started</Button></div>}
//     </div>
//   );
// };

// export default Header;


import React, { useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Colors from '@/data/Colors';
import { UserDetailContext } from "@/context/UserDetailContext";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className="p-4 flex justify-between items-center">
      <Image
        src={"/images.jpg"}
        width={40}
        height={40}
        alt="logo"
      />
      {!userDetail?.name && (
        <div className="flex gap-5">
          <Button variant="ghost">Sign In</Button>
          <Button style={{ backgroundColor: Colors.BLUE }}>Get started</Button>
        </div>
      )}
    </div>
  );
};

export default Header;

