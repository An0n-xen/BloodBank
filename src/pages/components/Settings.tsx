import { useEffect, useState } from "react";
import bcrypt from "bcryptjs";

const Settings = () => {
  //
  const [chuser, setchuser] = useState("");
  const [chpass, setchpass] = useState("");
  const [db, setdb] = useState([]);
  const [saved, setsave] = useState(false);

  // Getting current user loged in
  const user: any = window.localStorage.getItem("user");

  const usernamesplit: string[] = user.toString().split(" ");
  const usernameLenght: number = usernamesplit.length;

  const UrlEndpoint = "http://localhost:3000/api/getdata";

  // Functions Abeviates employees Names
  function getAbev() {
    if (usernameLenght > 1) {
      return (
        <h1 className="text-4xl text-white">
          {usernamesplit[0].charAt(0).toLocaleUpperCase()}
          {usernamesplit[1].charAt(0).toUpperCase()}
        </h1>
      );
    } else {
      return (
        <h1 className="text-4xl text-white ">
          {user.toString().charAt(0).toUpperCase()}
          {user.toString().slice(-1).toUpperCase()}
        </h1>
      );
    }
  }

  // Hashing user password before storing in database
  function Hashpassword() {
    const hashedpassword = bcrypt.hashSync(chpass, 10);
    return hashedpassword;
  }

  async function getUser() {
    const postData = {
      query: `select * from users where Username = '${user}'`,
    };

    const response = await fetch(UrlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const res1 = await response.json();
    setdb(res1.data);
  }

  // Getting employee data from database
  async function setUser(query: string) {
    const postData = {
      query: query,
    };

    const response = await fetch(UrlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const res = await response.json();
  }

  // Checking what the user wants to change
  function checkChange() {
    if (chuser != "" || chpass != "") {
      if (chuser != "" && chpass != "") {
        return 3;
      } else if (chpass != "") {
        return 2;
      } else {
        return 1;
      }
    } else {
      console.log("make");
    }
  }

  // Function Save changes
  function SaveChange() {
    switch (checkChange()) {
      case 1:
        const query: string = `Update users set Username = '${chuser}' where ID = ${db[0]["ID"]}`;
        setUser(query);
        setsave(true);
        break;

      case 2:
        const query1: string = `Update users set Password = '${Hashpassword()}' where ID  = ${
          db[0]["ID"]
        }`;
        setUser(query1);
        setsave(true);
        break;

      case 3:
        const query2: string = `Update users set Username = '${chuser}', Password = '${Hashpassword()}' where ID ${
          db[0]["ID"]
        }`;
        setUser(query2);
        setsave(true);
        break;

      default:
        break;
    }
  }

  // Render timeout
  function timeout() {
    setTimeout(() => {
      setsave(false);
    }, 2000);
  }

  // Show if username or password update was successfull
  const renderSaved = () => {
    if (saved) {
      timeout();
      return (
        <div
          data-aos="fade-right"
          className="bg-[#3db63d4b]  absolute -top-20 left-10 p-3 rounded-sm transition ease-out duration-500"
        >
          <h1 className="text-xl font-mono font-black">CHANGES SAVED</h1>
        </div>
      );
    } else {
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="relative">
      {renderSaved()}
      <div
        data-aos="fade-right"
        className="flex items-center justify-center font-black  bg-white rounded-md dark:bg-[#161c29] mx-32 my-20 p-10"
      >
        <div>
          <div className="w-44 h-44 dark:bg-black bg-[#262424] flex justify-center items-center rounded-full">
            {getAbev()}
          </div>

          <div className="flex justify-center">
            <h1 className="mt-8 text-3xl font-Roboto">{user.toString()}</h1>
          </div>

          <div className="mt-10">
            <input
              type="text"
              name=""
              id=""
              placeholder="Change Username"
              onChange={(e) => {
                setchuser(e.target.value);
              }}
              className="font-mono placeholder-white placeholder:text-center outline-none border-b-2  dark:bg-[#161c29] bg-white dark:placeholder:text-white placeholder:text-black"
            />
            <br />
            <br />
            <input
              type="password"
              name=""
              id=""
              placeholder="Change Password"
              onChange={(e) => {
                setchpass(e.target.value);
              }}
              className="font-mono placeholder-white placeholder:text-center outline-none border-b-2 mt-8 dark:bg-[#161c29] bg-white dark:placeholder:text-white placeholder:text-black"
            />
            <br />
            <br />
            <div className="flex justify-center">
              <button
                className=" rounded-lg px-3 py-3 mt-4 bg-[#d60202]"
                onClick={() => {
                  SaveChange();
                }}
              >
                <h1 className="font-Roboto font-bold text-white ">
                  Save Changes
                </h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
