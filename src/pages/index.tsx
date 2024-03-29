import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import bcrypt from "bcryptjs";
import { useRouter } from "next/router";

export default function Home() {
  // Theme Changer
  const { systemTheme, theme, setTheme } = useTheme();
  // Checking if page is mounted
  const [mounted, setMounted] = useState(false);
  // Ternary operators too check system default theme
  const currentTheme = theme === "system" ? systemTheme : theme;

  // Username and Password
  const [username, setUsername] = useState("");
  const [wordpass, setWordpass] = useState("");

  // rout changer
  const router = useRouter();
  // Store Data
  const [users, setUsers] = useState([]);
  const [render, setrender] = useState(false);

  // For bcrypt salt rounds
  const saltrounds = 10;

  let hashedpassword: string;
  // Api endpoiont
  const UrlEndpoint = "http://localhost:3000/api/getdata";

  // Reder Theme to Page
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

  // Show incorrect message when username and password is incorrect
  const renderIncorrectMessage = () => {
    if (render) {
      return (
        <div className="">
          <h1 className="text-[red]">Incorrect username or password</h1>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  // Function to verify employee login details
  function verifyUser() {
    // Variable to check if user is found
    let found = false;
    users.forEach((user) => {
      // Check username and password
      if (
        username == user["Username"] &&
        bcrypt.compareSync(wordpass, user["Password"])
      ) {
        // Setting variable to be keep in local storage
        window.localStorage.setItem("auth", "true");
        window.localStorage.setItem("user", user["Username"]);
        found = true;
        router.push("/dashboard");
      }
    });

    if (found) {
    } else {
      window.localStorage.setItem("auth", "false");
      setrender(true);
    }
  }

  // Not in use
  const Hashpassword = () => {
    const hashedpassword = bcrypt.hashSync(wordpass, 10);
    console.log(hashedpassword);
  };

  function handleSubmit() {
    verifyUser();
    // Hashpassword();
  }

  async function getDbData() {
    try {
      const response = await fetch(UrlEndpoint);
      const res = await response.json();
      setUsers(res.data);
    } catch (error) {
      const response = await fetch("http://192.168.43.138:3000/api/getdata");
      const res = await response.json();
      setUsers(res.data);
    }
  }

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
    window.localStorage.setItem("auth", "false");
    setMounted(true);
    getDbData();
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
            {/* <form action="" className="mt-4"> */}
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
              placeholder="Username"
              className="m-4 dark:placeholder-white dark:bg-[#121212] border-b-2 w-[16rem] transition ease-out duration-500 outline-none focus:border-b-[#9c9696]"
            />
            <br />
            <input
              type="password"
              name="password"
              value={wordpass}
              onChange={(e) => {
                setWordpass(e.currentTarget.value);
              }}
              placeholder="Password"
              className="m-4 dark:placeholder-white dark:bg-[#121212] border-b-2 w-[16rem] transition ease-out duration-500 outline-none focus:border-b-[#9c9696]"
            />
            <br />
            {/* render Incorrect message */}
            {renderIncorrectMessage()}
            <input
              type="submit"
              value="LOGIN"
              onClick={() => {
                handleSubmit();
              }}
              className="dark:hover:text-black dark:hover:bg-white mt-8 text-[1rem] font-Roboto border-2 w-36 py-2 top-2 rounded-[5rem] transition ease-out duration-500 hover:bg-black hover:text-white"
            />
            {/* </form> */}
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

          {/* <form action="#" className="mt-4"> */}
          <input
            type="text"
            name=""
            value={username}
            onChange={(e) => {
              setUsername(e.currentTarget.value);
            }}
            placeholder="Username"
            className="m-4 dark:placeholder-white dark:bg-[#121212] text-center border-b-2 w-[16rem] transition ease-out duration-500 outline-none focus:border-b-[#9c9696]"
          />
          <br />
          <input
            type="password"
            name=""
            value={wordpass}
            onChange={(e) => {
              setWordpass(e.currentTarget.value);
            }}
            placeholder="Password"
            className="m-4 dark:placeholder-white dark:bg-[#121212] text-center border-b-2 w-[16rem] transition ease-out duration-500 outline-none focus:border-b-[#9c9696]"
          />
          <br />
          {renderIncorrectMessage()}
          <input
            type="submit"
            value="LOGIN"
            onClick={() => {
              handleSubmit();
            }}
            className="mt-8 text-[1rem] font-Roboto border-2 w-36 py-2 top-2 rounded-[5rem] transition ease-out duration-500 hover:bg-black hover:text-white"
          />
          {/* </form> */}
        </div>
        <p className="text-[12px] text-center mt-10">
          © Copyright This remain the property of An0n-Xen
        </p>
      </div>
    </>
  );
}
