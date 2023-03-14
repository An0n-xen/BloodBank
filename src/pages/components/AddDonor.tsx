import { Dropdown } from "@nextui-org/react";
import { useMemo, useState } from "react";
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
  const [selected, setselected] = useState<any>(new Set(["A+"]));

  const SelectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", ""),
    [selected]
  );

  console.log(SelectedValue);

  return (
    <div
      data-aos="zoom-in"
      className="m-10 bg-[#ffffff] rounded-lg dark:bg-[#161c29] p-4"
    >
      <h1 className="text-left ml-16 font-black text-2xl font-mono mt-5 text-black dark:text-[#e4d7d7]">
        {"Add Donor".toUpperCase()}
      </h1>
      <div className="mt-16 flex  border-2 justify-center gap-32 rounded-md py-10">
        <div className="-ml-5 text-center border-r-2 pr-20">
          <label htmlFor="firstname" className="font-bold font-mono">
            Firstname{" "}
          </label>
          <input
            type="text"
            id="firstname"
            className="outline-none dark:bg-[#161C29] border-b-2"
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
          />
          <br />
          <br />
        </div>

        <div className="">
          <label htmlFor="dob" className="font-bold font-mono">
            Date {"   "}
          </label>
          <input type="date" name="" id="dob" className="mb-3" />

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

          <button className="font-Roboto mt-9 bg-[#287dfbd8] hover:bg-[#49c1d6] text-[white] rounded-md p-2 transition ease-out duration-300">
            Add Entry
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDonor;
