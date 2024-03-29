import mysql from "mysql2/promise";
import { useState, useEffect, useMemo } from "react";
import { Table, Row, Col, Tooltip, Button } from "@nextui-org/react";
import Styles from "./my.module.css";
import { Dropdown } from "@nextui-org/react";

const Records = ({ ds, Bl }: { ds: []; Bl: [] }) => {
  const UrlEndpoint = "http://localhost:3000/api/getdata";
  // Check what records is rendered either Donors or BloodEntry
  const [Typerecord, seTyperecord] = useState(0);
  // Setting Donor records
  const [records, setRecords] = useState([]);
  // Setting BloodEntry records
  const [records2, setRecords2] = useState([]);

  // Remeber what record is rendered
  const [selected, setselected] = useState<any>(new Set(["Donors"]));
  const [input, setinput] = useState("");

  const SelectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", ""),
    [selected]
  );

  // Search function
  function HandleSearch() {
    const userinput = ColumnSearch();

    SetRecordData(userinput.cols, userinput.search);
  }

  // Render Donor or BloodEntry table depending what the user chooses
  function changeTable() {
    if (SelectedValue == "Donors") {
      seTyperecord(0);
    } else {
      seTyperecord(1);
    }
  }

  // Another search function
  function ColumnSearch() {
    const userinput: string[] = input.split(":");
    const cols: string = userinput[0];
    const search: string = userinput[1];

    return { cols: cols, search: search };
  }

  // Setting Donor table head
  const cols1 = [
    { key: "Users", label: "DonorID" },
    { key: "FirstName", label: "FirstName" },
    { key: "LastName", label: "LastName" },
    { key: "Age", label: "Age" },
    { key: "Telephone", label: "Telephone" },
    { key: "Email", label: "Email" },
    { key: "BloodType", label: "BloodType" },
    { key: "Gender", label: "Gender" },
  ];

  // Setting bloodEntry table head
  const cols2 = [
    { key: "EntryID", label: "EntryID" },
    { key: "A+", label: "A+" },
    { key: "A-", label: "A-" },
    { key: "B+", label: "B+" },
    { key: "B-", label: "B-" },
    { key: "B+", label: "B+" },
    { key: "O+", label: "O+" },
    { key: "O-", label: "O-" },
    { key: "AB+", label: "AB+" },
    { key: "Date", label: "Date" },
    { key: "EmployeeName", label: "EmployeeName" },
    { key: "DonorID", label: "DonorID" },
  ];

  // Changes table data to Donor records or BloodEntry records
  function setRecord(r: number) {
    if (r == 0) {
      return records;
    } else {
      return records2;
    }
  }

  let cols = cols1;
  function setCols(i: number) {
    if (i == 0) {
      cols = cols1;
    } else {
      cols = cols2;
    }
  }

  setCols(Typerecord);

  // Not in user

  async function SetRecordData(column: string, userinput: string) {
    if (column && userinput) {
      if (Typerecord == 0) {
        const postData = {
          query: `SELECT * from Donors where ${column} = '${userinput}'`,
        };
        const response = await fetch(UrlEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        const res = await response.json();
        setRecords(res.data);
      } else {
        switch (column) {
          case "A+":
            column = "APlus";
            break;

          case "A-":
            column = "AMinus";
            break;

          case "B+":
            column = "BPlus";
            break;

          case "B-":
            column = "BMinus";
            break;

          case "O+":
            column = "OPlus";
            break;

          case "O-":
            column = "OMinus";
            break;

          case "AB+":
            column = "ABPlus";
            break;

          case "AB-":
            column = "ABMinus";
            break;

          default:
            column = column;
            break;
        }
        const postData2 = {
          query: `SELECT * from BloodEntry where ${column} = '${userinput}'`,
        };
        const response2 = await fetch(UrlEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData2),
        });
        const res2 = await response2.json();
        setRecords2(res2.data);
      }
    } else {
      setRecords(ds);
      setRecords2(Bl);
    }
  }

  // Table renderer of the Records in table
  const renderTable = () => {
    return (
      <div
        data-aos="zoom-in"
        className="border-2 dark:border-[#1d2537be] p-6  rounded-sm overflow-auto  dark:text-black flex items-start justify-center dark:border-t-2 h-[80vh]"
      >
        <table className={Styles.table}>
          <thead>
            <tr className="bg-[#9f9c9c]">
              {cols.map((item) => {
                return <th className="font-black font-Roboto">{item.label}</th>;
              })}
            </tr>
          </thead>
          <tbody className={Styles.tbody}>
            {setRecord(Typerecord).map((item: any, row: number) => {
              return (
                <tr className="border-b-2 dark:hover:bg-[#18b0c827] hover:bg-[#18b0c827] transition ease-out duration-100">
                  {Object.keys(item).map((staff) => {
                    return <td className="">{item[staff]}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );

    // );
  };

  useEffect(() => {
    changeTable();
  }, [SelectedValue]);

  useEffect(() => {
    // getRecordData();
    setRecords(ds);
    setRecords2(Bl);
  }, []);

  return (
    <div
      data-aos="zoom-in"
      className="text-xl items-center justify-center bg-[white] mx-10 my-5 rounded-md py-1 m-b-10 dark:bg-[#27344f]"
    >
      <div className="flex justify-center items-center my-8">
        {/* <div className="flex items-center">
          <h1
            className="mr-10 border-2 p-1 px-2 rounded-sm font-bold hover:bg-[#636060] hover:border-[#636060ac] hover:text-[white] cursor-pointer"
            onClick={() => {
              seTyperecord(0);
            }}
          >
            Donors
          </h1>
          <h1
            className="ml-10 border-2 p-1 px-2 rounded-sm font-bold hover:bg-[#636060] hover:border-[#636060ac] hover:text-[white] cursor-pointer"
            onClick={() => {
              seTyperecord(1);
            }}
          >
            Blood Info
          </h1>
        </div> */}

        <div className="flex items-center justify-end ml-32">
          <div className="ml-10">
            <Dropdown>
              <Dropdown.Button flat>{SelectedValue}</Dropdown.Button>

              <Dropdown.Menu
                aria-label="Dynamic Actions"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setselected}
              >
                <Dropdown.Item key={"Donors"}>Donors</Dropdown.Item>
                <Dropdown.Item key={"Blood Info"}>Blood Innfo</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="ml-10 flex items-center">
            <input
              type="text"
              name=""
              id=""
              placeholder="Searach"
              onChange={(e) => {
                setinput(e.target.value);
              }}
              className="border-2 rounded-sm pl-4 dark:bg-white dark:text-black"
            />
          </div>
          <div className="ml-5 ">
            <Button
              className="w-10 rounded-sm"
              onPress={() => {
                HandleSearch();
              }}
            >
              <h1 className="font-bold text-[20px]">Search</h1>
            </Button>
          </div>
        </div>
      </div>
      <div className="">{renderTable()}</div>
    </div>
  );
};

export default Records;
