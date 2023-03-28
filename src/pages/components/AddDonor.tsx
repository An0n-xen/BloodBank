import { Dropdown } from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
const AddDonor = () => {
  const BloodGroup = [
    {
      key: "A+",
      name: "A+",
    },
    {
      key: "A-",
      name: "A-",
    },
    {
      key: "B+",
      name: "B+",
    },
    {
      key: "B-",
      name: "B-",
    },
    {
      key: "O+",
      name: "O+",
    },
    {
      key: "O-",
      name: "O-",
    },
    {
      key: "AB+",
      name: "AB+",
    },
    {
      key: "AB-",
      name: "AB-",
    },
  ];

  const [selected, setselected] = useState<any>(new Set(["BloodGroup"]));
  const [gender, setgender] = useState<any>(new Set(["Gender"]));
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [tel, settel] = useState("");
  const [date, setdate] = useState("");
  const [dcount, setdcount] = useState<number>();
  const [bcount, setbcount] = useState<number>();

  const age = 24;

  const currentdate = new Date();

  function setDate() {
    const day = currentdate.getDate();
    const month = currentdate.getMonth();
    const year = currentdate.getFullYear();

    return `${year}-${month}-${day}`;
  }

  function showUnderline(nan: string) {
    if (make == 0 && nan == "new") {
      return "border-b-2 border-b-[blue]";
    } else {
      if (make == 1 && nan == "exist") {
        return "border-b-2 border-b-[blue]";
      } else {
        return "";
      }
    }
  }

  const [make, setmake] = useState(0);

  const UrlEndpoint = "http://localhost:3000/api/getdata";

  const SelectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", ""),
    [selected]
  );

  const SelectedGender = useMemo(
    () => Array.from(gender).join(", ").replaceAll("_", ""),
    [gender]
  );

  async function getRlenght() {
    const postData = {
      query: "select count(*) from assignments.donors",
    };
    const response = await fetch(UrlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const res = await response.json();
    setbcount(res.data[0]["count(*)"]);

    const postData2 = {
      query: "select count(*) from assignments.BloodEntry",
    };
    const response2 = await fetch(UrlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData2),
    });

    const res2 = await response2.json();
    setdcount(res2.data[0]["count(*)"]);
  }

  const renderOptions = () => {
    if (make == 0) {
      return (
        <div className="mt-10 flex  border-2 justify-center gap-32 rounded-md py-10 transition ease-in duration-600">
          <div className="-ml-5 text-center border-r-2 pr-20">
            <label htmlFor="firstname" className="font-bold font-mono">
              Firstname{" "}
            </label>
            <input
              type="text"
              id="firstname"
              className="outline-none dark:bg-[#161C29] border-b-2"
              onChange={(e) => {
                setfname(e.target.value);
              }}
            />
            <br />
            <br />
            <label htmlFor="Lastname" className="font-bold font-mono">
              Lastname{" "}
            </label>
            <input
              type="text"
              id="Lastname"
              className="outline-none dark:bg-[#161C29] border-b-2"
              onChange={(e) => {
                setlname(e.target.value);
              }}
            />
            <br />
            <br />
            <label htmlFor="email" className="font-bold font-mono">
              Email{"  "}
            </label>
            <input
              type="email"
              name=""
              id="email"
              className="outline-none dark:bg-[#161C29] border-b-2"
              onChange={(e) => {
                setemail(e.target.value);
              }}
            />
            <br />
            <br />
            <label htmlFor="tel" className="font-bold font-mono">
              Tel {"  "}
            </label>
            <input
              type="tel"
              name=""
              id="tel"
              className="outline-none dark:bg-[#161C29] border-b-2"
              onChange={(e) => {
                settel(e.target.value);
              }}
            />
            <br />
            <br />
          </div>

          <div className="">
            <label htmlFor="dob" className="font-bold font-mono">
              Age {"   "}
            </label>
            <input
              type="number"
              name=""
              id="dob"
              className="mb-3 w-16 rounded-sm outline-none dark:bg-[#161C29] border-b-2"
              onChange={(e) => {
                setdate(e.target.value);
              }}
            />
            <div className="mb-5">
              <Dropdown>
                <Dropdown.Button flat color={"warning"}>
                  {SelectedGender}
                </Dropdown.Button>
                <Dropdown.Menu
                  aria-label="Dynamic Actions"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={gender}
                  onSelectionChange={setgender}
                >
                  <Dropdown.Item key={"m"}>Male</Dropdown.Item>
                  <Dropdown.Item key={"f"}>Female</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <Dropdown>
              <Dropdown.Button flat color={"error"}>
                {SelectedValue}
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Dynamic Actions"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setselected}
              >
                {BloodGroup.map((item) => (
                  <Dropdown.Item key={item.key}>{item.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <button
              className="font-Roboto mt-9 bg-[#287dfbd8] hover:bg-[#49c1d6] text-[white] rounded-md p-2 transition ease-out duration-300"
              onClick={() => {
                handlePress();
              }}
            >
              Add Entry
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-10 border-2 rounded-md py-10 transition ease-in duration-600">
          {/* Firstname  lastname date*/}
          <div className="flex justify-center gap-20">
            <label htmlFor="firstname" className="font-bold font-mono -mr-16">
              Firstname
            </label>
            <input
              type="text"
              id="firstname"
              className="outline-none dark:bg-[#161C29] border-b-2"
              onChange={(e) => {
                setfname(e.target.value);
              }}
            />
            <label htmlFor="Lastname" className="font-bold font-mono -mr-16">
              Lastname{" "}
            </label>
            <input
              type="text"
              id="Lastname"
              className="outline-none dark:bg-[#161C29] border-b-2"
              onChange={(e) => {
                setlname(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-center">
            <button
              className="font-Roboto mt-9 bg-[#287dfbd8] hover:bg-[#49c1d6] text-[white] rounded-md p-2 transition ease-out duration-300"
              onClick={() => {
                handlePress();
              }}
            >
              Add Entry
            </button>
          </div>
        </div>
      );
    }
  };

  async function setDataRecordData(query: string) {
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
    console.log(res.data);
  }

  async function getNeeded() {
    const search: string = `select * from donors where FirstName = '${fname}' && LastName = '${lname}'`;
    const postData = {
      query: search,
    };
    const response = await fetch(UrlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const res = await response.json();
    return res.data[0];
  }

  function checkData(
    email: string,
    blood: string,
    tel: string,
    fname: string,
    lname: string,
    date: string
  ) {
    let check: number = 0;
    if (
      blood != "BloodGroup" &&
      email.split("@").length > 1 &&
      tel.startsWith("233")
    ) {
      check = 1;
    }

    if (fname != "" && lname != "" && date != "") {
      check = 2;
    }

    if (check == 2) {
      return true;
    } else {
      return false;
    }
  }

  function checkBlood(bl: string) {
    switch (bl) {
      case "A+":
        return "APlus";
        break;

      case "A-":
        return "AMinus";
        break;
      case "B+":
        return "BPlus";
        break;
      case "B-":
        return "BMinus";
        break;
      case "O+":
        return "OPlus";
        break;
      case "O-":
        return "OMinus";
        break;
      case "AB+":
        return "ABPlus";
        break;

      default:
        return "ABMinus";
        break;
    }
  }

  async function handlePress() {
    if (make == 0) {
      const check: boolean = checkData(
        email,
        SelectedValue,
        tel,
        fname,
        lname,
        date
      );
      const query: string = `insert into donors(DonorID,FirstName,LastName,Age,Telephone,Email,BloodType,Gender) values (${bcount},'${fname}','${lname}',${age},${tel},'${email}','${SelectedValue}','${SelectedGender}')`;
      // console.log(query);
      await setDataRecordData(query);
    } else {
      const querresults: any = await getNeeded();

      const colName: string = checkBlood(querresults["BloodType"]);

      const query: string = `insert into BloodEntry(EntryID,EmployeeName,DonorID,${colName},Date) values(${dcount},'${window.localStorage.getItem(
        "user"
      )}',${querresults["DonorID"]},${1},'${setDate()}')`;
      // console.log(query);
      await setDataRecordData(query);
    }
  }

  useEffect(() => {
    getRlenght();
  }, []);

  return (
    <div
      data-aos="zoom-in"
      className="m-10 bg-[#ffffff] rounded-lg dark:bg-[#161c29] p-4 transition ease-in duration-600"
    >
      <h1 className="text-left ml-16 font-black text-2xl font-mono mt-5 text-black dark:text-[#e4d7d7] ">
        {"Add Donor".toUpperCase()}
      </h1>
      <div className="ml-44 mt-5 flex gap-20">
        <div
          onClick={() => {
            setmake(0);
          }}
          className={`font-bold text-xl font-Roboto cursor-pointer ${showUnderline(
            "new"
          )} hover:border-b-2 hover:rounded-sm py-2 px-3`}
        >
          New Donor
        </div>
        <div
          onClick={() => {
            setmake(1);
          }}
          className={`font-bold text-xl font-Roboto cursor-pointer ${showUnderline(
            "exist"
          )} hover:border-b-2 hover:rounded-sm py-2 px-3`}
        >
          Already Existing
        </div>
      </div>
      {renderOptions()}
    </div>
  );
};

export default AddDonor;
