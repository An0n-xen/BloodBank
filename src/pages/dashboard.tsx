import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  MoonIcon,
  SunIcon,
  ChartBarIcon,
  UserPlusIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

export default function dashboard() {
  const router = useRouter();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const Dashoptions = [
    { name: "Dashboard", icon: <ChartBarIcon className="w-5 h-5 mr-3" /> },
    { name: "Add Donor", icon: <UserPlusIcon className="w-5 h-5 mr-3" /> },
    {
      name: "Records",
      icon: <ClipboardDocumentListIcon className="w-5 h-5 mr-3" />,
    },
    { name: "Settings", icon: <Cog6ToothIcon className="w-5 h-5 mr-3" /> },
  ];

  const renderThemeChange = () => {
    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-7 h-7 absolute right-6 top-2 z-9999 "
          role="buttom"
          onClick={() => {
            setTheme("light");
          }}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-7 h-7 absolute right-6 top-2 z-9999 "
          role="buttom"
          onClick={() => {
            setTheme("dark");
          }}
        />
      );
    }
  };

  useEffect(() => {
    window.localStorage.getItem("auth") == "true"
      ? router.push("/dashboard")
      : router.push("/");
  }, []);
  return (
    <div className="transition ease-out duration-500">
      {renderThemeChange()}
      <div className="flex items-center justify-between">
        <div className="bg-[white] dark:bg-[#161616] dark:text-[#65baef] w-[20%] h-screen">
          <div className="flex  justify-center">
            <h1 className="font-black text-3xl text-center mt-10 dark:text-[white]">
              B
            </h1>
            <h1 className="font-black text-3xl text-[#49c1d6] dark:text-[#49c1d6] mt-10 ">
              bank
            </h1>
          </div>

          <div className="mt-16">
            {Dashoptions.map((item, key: number) => {
              return (
                <div className="my-2 pl-[25%] flex item-center text-[#49c1d6]  hover:bg-[#18b0c827] py-3 mx-3 rounded-md transition ease-out duration-300 hover:border-1">
                  {item.icon}
                  <ul key={key} className="font-medium font-Roboto">
                    {item.name}
                  </ul>
                </div>
              );
            })}

            <div className="absolute flex bottom-5 items-center ml-16">
              <div className="bg-[#524f4f] rounded-md w-16 h-16 mr-5"></div>
              <h1 className="font-mono font-black text-xl text-center text-[#514949] dark:text-[#f7f7f7]">
                Xen
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-[#e4e8fb] dark:bg-[#1a2335] w-[80%] h-screen"></div>
      </div>
    </div>
  );
}
