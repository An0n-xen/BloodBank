import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import mysql from "mysql2/promise";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const currentTheme = theme === "system" ? systemTheme : theme;
  const UrlEndpoint = "http://localhost:3000/api/getdata";

  const renderThemeChange = () => {
    if (!mounted) {
      return null;
    }
    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-7 h-7 absolute right-6 top-2 z-99 "
          role="buttom"
          onClick={() => {
            setTheme("light");
          }}
        />
      );
    } else {
      return (
        <MoonIcon
          className="w-7 h-7 absolute right-6 top-2 z-99 "
          role="buttom"
          onClick={() => {
            setTheme("dark");
          }}
        />
      );
    }
  };

  // async function getDbData() {
  //   const response = await fetch(UrlEndpoint);
  //   const res = await response.json();
  // }

  // async function setDbData() {
  //   const postData = {
  //     query: `SELECT ${searchData} from employees`,
  //   };
  //   const response = await fetch(UrlEndpoint, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(postData),
  //   });

  //   const res = await response.json();
  // }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {renderThemeChange()}
      <div className="md:flex hidden items-center justify-between ml-10">
        <div className="w-[50%] h-screen flex items-center justify-center relative">
          <div className="absolute top-6 left-8 flex justify-center items-center">
            <Image src="/blood.png" height={50} width={50} alt="blood" />
            <h1 className="text-xl font-extrabold ml-5">Bbank</h1>
          </div>

          <div className="text-center -mt-8">
            <h1 className="text-4xl font-bold my-4 font-mono"> Login </h1>
            <p className="text-[1rem] font-roboto">
              Make sure you login with the right credintials
            </p>

            <form action="#" className="mt-4">
              <input
                type="text"
                name=""
                id=""
                placeholder="Username"
                className="m-4 dark:placeholder-white dark:bg-[#121212] border-b-2 w-[16rem] transition ease-out duration-500 outline-none focus:border-b-[#9c9696]"
              />
              <br />
              <input
                type="password"
                name=""
                id=""
                placeholder="Password"
                className="m-4 dark:placeholder-white dark:bg-[#121212] border-b-2 w-[16rem] transition ease-out duration-500 outline-none focus:border-b-[#9c9696]"
              />
              <br />
              <input
                type="submit"
                value="LOGIN"
                className="dark:hover:text-black dark:hover:bg-white mt-8 text-[1rem] font-Roboto border-2 w-36 py-2 top-2 rounded-[5rem] transition ease-out duration-500 hover:bg-black hover:text-white"
              />
            </form>
          </div>
          <p className="absolute bottom-16 text-[12px]">
            © Copyright This remain the property of group 5
          </p>
        </div>

        <div className="w-[50%] h-screen flex justify-center items-center">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-xl mr-28 shadow-2xl">
            <Image src="/donation.png" width={750} height={750} alt="blood" />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex justify-center items-center float-left">
          <Image src="/blood.png" height={40} width={40} alt="blood" />
          <h1 className="text-xl font-extrabold ml-5">Bbank</h1>
        </div>

        <div className="flex">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-xl mr-28 shadow-2xl mt-20">
            <Image src="/donation.png" width={750} height={750} alt="blood" />
          </div>
        </div>

        <div className="text-center mt-16">
          <h1 className="text-4xl font-bold my-4 font-mono"> Login </h1>
          <p className="text-[1rem] font-roboto">
            Make sure you login with the right credintials
          </p>

          <form action="#" className="mt-4">
            <input
              type="text"
              name=""
              id=""
              placeholder="Username"
              className="m-4 dark:placeholder-white dark:bg-[#121212] text-center border-b-2 w-[16rem] transition ease-out duration-500 outline-none focus:border-b-[#9c9696]"
            />
            <br />
            <input
              type="password"
              name=""
              id=""
              placeholder="Password"
              className="m-4 dark:placeholder-white dark:bg-[#121212] text-center border-b-2 w-[16rem] transition ease-out duration-500 outline-none focus:border-b-[#9c9696]"
            />
            <br />
            <input
              type="submit"
              value="LOGIN"
              className="mt-8 text-[1rem] font-Roboto border-2 w-36 py-2 top-2 rounded-[5rem] transition ease-out duration-500 hover:bg-black hover:text-white"
            />
          </form>
        </div>
        <p className="text-[12px] text-center mt-10">
          © Copyright This remain the property of group 5
        </p>
      </div>
    </>
  );
}
