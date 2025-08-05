
"use client"; 
import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import Lookup from "@/data/Lookup";

const Codeview = () => {
  const [activeTab, SetActiveTab] = useState("code");
const [filess,setFiless]=useState(Lookup?.DEFAULT_FILE)
  const documnt = {
    "/App.js": `export default function App() {
 return(
 <h1>Hello from Sandpack!</h1>)
     }`,
  };

  return (
    <div>
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 justify-center rounded-full w-[140px] gap-3">
          <h2
            onClick={() => SetActiveTab("code")}
            className={`text-sm cursor-pointer ${activeTab === "code" ? "text-blue-500 bg-opacity-25 px-2 rounded-full" : ""}`}
          >
            Code
          </h2>

          <h2
            onClick={() => SetActiveTab("preview")}
            className={`text-sm cursor-pointer ${activeTab === "preview" ? "text-blue-500 bg-opacity-25 px-2 rounded-full" : ""}`}
          >
            Preview
          </h2>
        </div>
      </div>

      <SandpackProvider
       
      template="react" theme="dark" files={{...documnt ,...filess}} 
      customSetup={{
        dependencies:{
          ...Lookup.DEPENDANCY
        }
      }}
      options={{
        externalResources:['https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4']
      }}
      
      >

        
<SandpackLayout style={{ height: "80vh", width: "100%" }}>
  
  <div
    style={{
      display: activeTab === "code" ? "flex" : "none",
      height: "80vh",
      width: "100%",
    }}
  >
    <SandpackFileExplorer style={{ flex: 1, minWidth: "150px" }} />
    <SandpackCodeEditor style={{ flex: 3, height: "100%" }} />
  </div>

 
  <div
    style={{
      height: "80vh",
      width: "100%",
      visibility: activeTab === "preview" ? "visible" : "hidden",
      position: activeTab === "preview" ? "relative" : "absolute",
      pointerEvents: activeTab === "preview" ? "auto" : "none",
      opacity: activeTab === "preview" ? 1 : 0,
      transition: "opacity 0.3s ease",
    }}
  >
    <SandpackPreview style={{ height: "80vh", width: "100%" }} showNavigator={true} />
  </div>
</SandpackLayout>
 


      </SandpackProvider>
    </div>
  );
};

export default Codeview;
