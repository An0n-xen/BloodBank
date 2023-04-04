import { useEffect, useState } from "react";
import Slider from "react-slick";
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Radar, Line, Bar, PolarArea, Pie, Doughnut } from "react-chartjs-2";
import { useTheme } from "next-themes";

const Dashboard = ({ ds, Bl }: { ds: []; Bl: [] }) => {
  const [FullData, setFullData] = useState([]);
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  ChartJS.defaults.color = "#b52eea";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  const UrlEndpoint = "http://localhost:3000/api/getdata";

  const ss: number[] = [];

  const count: number[] = [];

  // Donor Vars

  // Object of Ageranges DonorDB
  const AgeRanges: any = {
    10: 0,
    20: 0,
    30: 0,
    40: 0,
    50: 0,
    60: 0,
    70: 0,
    80: 0,
  };

  // Object of BloodCount DonorDB
  const BloodCount: any = {
    "A+": 0,
    "A-": 0,
    "AB+": 0,
    "AB-": 0,
    "O+": 0,
    "O-": 0,
    "B+": 0,
    "B-": 0,
  };

  // Object of GenderCount DonorDB
  const GenderCount: any = { Male: 0, Female: 0 };

  // BloodEntryDB
  const _BloodCount: any = {
    "A+": 0,
    "A-": 0,
    "AB+": 0,
    "AB-": 0,
    "O+": 0,
    "O-": 0,
    "B+": 0,
    "B-": 0,
  };

  // Object gendercount BloodEntryDB
  const _GenderCount: any = { Male: 0, Female: 0 };

  // Obejct of AgeRanges
  const _AgeRanges: any = {
    10: 0,
    20: 0,
    30: 0,
    40: 0,
    50: 0,
    60: 0,
    70: 0,
    80: 0,
  };

  // Object of year ranges
  const yearCount: any = {
    "2015": 0,
    "2016": 0,
    "2017": 0,
    "2018": 0,
    "2019": 0,
    "2020": 0,
    "2021": 0,
    "2022": 0,
    "2023": 0,
  };

  // Settings Curosel Slider Settingss
  const Settings = {
    dots: true,
    Infinity: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // Getting full data from both Donors and BloodEntry
  async function getFullData() {
    const postData = {
      query:
        "select * from donors inner join BloodEntry on donors.DonorID=BloodEntry.DonorID",
    };
    const response = await fetch(UrlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const res = await response.json();
    setFullData(res.data);
  }

  // Orgainsing Donor Data into acceptable formart
  function DonorCounter() {
    Object.keys(GenderCount).map((item) => {
      GenderCount[item] = 0;
    });

    Object.keys(BloodCount).map((item) => {
      BloodCount[item] = 0;
    });

    Object.keys(AgeRanges).map((item) => {
      AgeRanges[item] = 0;
    });

    ds.map((item) => {
      switch (item["BloodType"]) {
        case "A+":
          BloodCount[item["BloodType"]] += 1;
          break;

        case "A-":
          BloodCount[item["BloodType"]] += 1;
          break;

        case "B+":
          BloodCount[item["BloodType"]] += 1;
          break;

        case "B-":
          BloodCount[item["BloodType"]] += 1;
          break;

        case "O-":
          BloodCount[item["BloodType"]] += 1;
          break;

        case "O+":
          BloodCount[item["BloodType"]] += 1;
          break;

        case "AB+":
          BloodCount[item["BloodType"]] += 1;
          break;

        default:
          BloodCount[item["BloodType"]] += 1;
          break;
      }
      switch (item["Gender"]) {
        case "m":
          GenderCount["Male"] += 1;
          break;

        default:
          GenderCount["Female"] += 1;
          break;
      }

      if (item["Age"] >= 20 && item["Age"] < 30) {
        AgeRanges[20] += 1;
      } else if (item["Age"] >= 30 && item["Age"] < 40) {
        AgeRanges[30] += 1;
      } else if (item["Age"] >= 40 && item["Age"] < 50) {
        AgeRanges[40] += 1;
      } else if (item["Age"] >= 50 && item["Age"] < 60) {
        AgeRanges[50] += 1;
      } else if (item["Age"] >= 60 && item["Age"] < 70) {
        AgeRanges[60] += 1;
      } else if (item["Age"] >= 70 && item["Age"] <= 80) {
        AgeRanges[70] += 1;
      } else if (item["Age"] >= 10 && item["Age"] < 20) {
        AgeRanges[10] += 1;
      }
    });
  }

  // Leader Filter
  function Filter() {
    const n: number[] = [];
    const m: number[] = [];
    const sorted: number[] = [];
    const TopFive: number[] = [];
    const Names: string[] = [];

    count.map((e) => {
      if (!n.includes(e)) {
        n.push(e);
        m.push(0);
      }
    });

    count.map((e) => {
      m[n.indexOf(e)] += 1;
    });

    m.forEach((e) => {
      if (!sorted.includes(e)) {
        sorted.push(e);
      }
    });

    sorted
      .sort()
      .splice(sorted.length - 5)
      .forEach((e) => {
        TopFive.push(n[m.indexOf(e)]);
        ss.push(e);
      });

    ss.reverse();
    FullData.forEach((e) => {
      if (
        TopFive.includes(e["DonorID"]) &&
        !Names.includes(`${e["FirstName"]} ${e["LastName"]}`)
      ) {
        Names.push(`${e["FirstName"]} ${e["LastName"]}`);
      }
    });

    return Names.reverse();
  }

  // Theme Changer
  function ChangeColor() {
    if (currentTheme === "dark") {
      const colorScheme = { text: "white", border: "" };
      return colorScheme;
    } else {
      const colorScheme1 = { text: "#524F4F", border: "#b7bac1" };
      return colorScheme1;
    }
  }

  // Chart color Renderer
  function ColorDou() {
    if (currentTheme === "dark") {
      const colorScheme = { border: "#161c29" };
      return colorScheme;
    } else {
      const colorScheme1 = { border: "white" };
      return colorScheme1;
    }
  }

  // Orgainsing Donor Data into acceptable formart
  function BloodCounter() {
    Object.keys(_GenderCount).map((item) => {
      _GenderCount[item] = 0;
    });

    Object.keys(_BloodCount).map((item) => {
      _BloodCount[item] = 0;
    });

    Object.keys(_AgeRanges).map((item) => {
      _AgeRanges[item] = 0;
    });

    FullData.map((item) => {
      switch (item["Gender"]) {
        case "m":
          _GenderCount["Male"] += 1;
          break;

        default:
          _GenderCount["Female"] += 1;
          break;
      }

      switch (item["BloodType"]) {
        case "A+":
          _BloodCount[item["BloodType"]] += 1;
          break;

        case "A-":
          _BloodCount[item["BloodType"]] += 1;
          break;

        case "B+":
          _BloodCount[item["BloodType"]] += 1;
          break;

        case "B-":
          _BloodCount[item["BloodType"]] += 1;
          break;

        case "O-":
          _BloodCount[item["BloodType"]] += 1;
          break;

        case "O+":
          _BloodCount[item["BloodType"]] += 1;
          break;

        case "AB+":
          _BloodCount[item["BloodType"]] += 1;
          break;

        default:
          _BloodCount[item["BloodType"]] += 1;
          break;
      }

      if (item["Age"] >= 20 && item["Age"] < 30) {
        _AgeRanges[20] += 1;
      } else if (item["Age"] >= 30 && item["Age"] < 40) {
        _AgeRanges[30] += 1;
      } else if (item["Age"] >= 40 && item["Age"] < 50) {
        _AgeRanges[40] += 1;
      } else if (item["Age"] >= 50 && item["Age"] < 60) {
        _AgeRanges[50] += 1;
      } else if (item["Age"] >= 60 && item["Age"] < 70) {
        _AgeRanges[60] += 1;
      } else if (item["Age"] >= 70 && item["Age"] <= 80) {
        _AgeRanges[70] += 1;
      } else if (item["Age"] >= 10 && item["Age"] < 20) {
        _AgeRanges[10] += 1;
      }
      count.push(item["DonorID"]);
    });
  }

  // Organising year formart into acceptable format
  function checkYear() {
    FullData.map((e: any) => {
      const date: string = e["Date"].split("T")[0];
      const year: number = Number(date.split("-")[0]);

      switch (year) {
        case 2015:
          yearCount[year] += 1;
          break;

        case 2016:
          yearCount[year] += 1;
          break;

        case 2017:
          yearCount[year] += 1;
          break;

        case 2018:
          yearCount[year] += 1;
          break;

        case 2019:
          yearCount[year] += 1;
          break;

        case 2020:
          yearCount[year] += 1;
          break;

        case 2021:
          yearCount[year] += 1;
          break;

        case 2022:
          yearCount[year] += 1;
          break;

        default:
          yearCount[year] += 1;
          break;
      }
    });
  }

  checkYear();
  BloodCounter();
  DonorCounter();

  // console.log(BloodCount);
  // console.log(_BloodCount);

  // Setting up data
  // Donor
  const data = {
    labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    datasets: [
      {
        label: "Blood Group",
        fill: true,
        borderColor: "#36A2EB",

        data: [
          BloodCount["A+"],
          BloodCount["A-"],
          BloodCount["B+"],
          BloodCount["B-"],
          BloodCount["O+"],
          BloodCount["O-"],
          BloodCount["AB+"],
          BloodCount["AB-"],
        ],
        backgroundColor: ["red"],
      },
    ],
  };

  // BloodEntry
  const _data = {
    labels: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    datasets: [
      {
        label: "Blood Group",
        fill: true,
        borderColor: "#36A2EB",

        data: [
          _BloodCount["A+"],
          _BloodCount["A-"],
          _BloodCount["B+"],
          _BloodCount["B-"],
          _BloodCount["O+"],
          _BloodCount["O-"],
          _BloodCount["AB+"],
          _BloodCount["AB-"],
        ],
        backgroundColor: ["red"],
      },
    ],
  };

  // BloodEntry
  const _year = {
    labels: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    datasets: [
      {
        label: "Year Growth",
        fill: true,
        borderColor: "#36A2EB",
        type: "line",

        data: [
          yearCount[2015],
          yearCount[2016],
          yearCount[2017],
          yearCount[2018],
          yearCount[2019],
          yearCount[2020],
          yearCount[2021],
          yearCount[2022],
          yearCount[2023],
        ],
        backgroundColor: ["red"],
      },
      {
        label: "Year Growth",
        fill: true,
        borderColor: "#36A2EB",
        type: "bar",

        data: [
          yearCount[2015],
          yearCount[2016],
          yearCount[2017],
          yearCount[2018],
          yearCount[2019],
          yearCount[2020],
          yearCount[2021],
          yearCount[2022],
          yearCount[2023],
        ],
        backgroundColor: ["#ff111127"],
      },
    ],
  };

  // Donor
  const ageData = {
    labels: [
      "15-19",
      "20-29",
      "30-39",
      "40-49",
      "50-59",
      "60-69",
      "70-79",
      "80-89",
    ],
    datasets: [
      {
        label: "Age Ranges",
        fill: true,
        borderColor: "#36A2EB",

        data: [
          AgeRanges[10],
          AgeRanges[20],
          AgeRanges[30],
          AgeRanges[40],
          AgeRanges[50],
          AgeRanges[60],
          AgeRanges[70],
          AgeRanges[80],
        ],
        backgroundColor: ["pink"],
      },
    ],
  };

  // BloodEntry
  const _ageData = {
    labels: [
      "15-19",
      "20-29",
      "30-39",
      "40-49",
      "50-59",
      "60-69",
      "70-79",
      "80-89",
    ],
    datasets: [
      {
        label: "Age Ranges",
        fill: true,
        borderColor: "#36A2EB",

        data: [
          _AgeRanges[10],
          _AgeRanges[20],
          _AgeRanges[30],
          _AgeRanges[40],
          _AgeRanges[50],
          _AgeRanges[60],
          _AgeRanges[70],
          _AgeRanges[80],
        ],
        backgroundColor: ["#2a94ff"],
      },
    ],
  };

  // Donor
  const genderData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender",
        fill: true,
        borderColor: ColorDou().border,

        data: [GenderCount["Male"], GenderCount["Female"]],
        backgroundColor: ["#492e6f", "#398c6f"],
      },
    ],
  };

  // BloodEntry
  const _genderData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender",
        fill: true,
        borderColor: ColorDou().border,

        data: [_GenderCount["Male"], _GenderCount["Female"]],
        backgroundColor: ["#492e6f", "#398c6f"],
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  useEffect(() => {
    getFullData();
  }, []);

  return (
    <div className="px-8 py-4">
      <Slider {...Settings} className="">
        <div className="relative z-0">
          <h1 className="text-xl font-Robot font-bold">DonorCharts</h1>
          <div className="flex gap-24 mx-5 items-center justify-center ">
            <div
              data-aos="fade-right"
              className="w-[28rem] h-[21rem] px-5 dark:bg-[#161c29] rounded-lg bg-[white] flex items-center justify-center"
            >
              <Bar
                data={data}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        color: ChangeColor().text,
                      },
                      grid: {
                        color: ChangeColor().border,
                      },
                    },
                    x: {
                      ticks: {
                        color: ChangeColor().text,
                      },
                      grid: {
                        color: "",
                      },
                    },
                  },
                }}
              />
            </div>

            <div
              data-aos="fade-left"
              className="w-[28rem] h-[21rem] px-5 dark:bg-[#161c29] rounded-lg bg-[white] flex items-center justify-center"
            >
              <Radar
                data={data}
                options={{
                  scales: {
                    r: {
                      grid: {
                        color: "#7a7272",
                      },
                      angleLines: {
                        color: "#7a7272",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="flex gap-24 mx-5 items-center justify-center mt-5">
            <div
              data-aos="fade-right"
              className="w-[27rem] h-[22rem] dark:bg-[#161c29] rounded-lg bg-[#ffffff] flex justify-center items-center px-2"
            >
              <Bar
                data={ageData}
                options={{
                  scales: {
                    y: {
                      ticks: { color: ChangeColor().text },
                    },
                    x: {
                      ticks: { color: ChangeColor().text },
                    },
                  },
                }}
              />
            </div>

            <div
              data-aos="fade-right"
              className="w-[27rem] h-[22rem] dark:bg-[#161c29] rounded-lg bg-[#ffffff] flex justify-center items-center"
            >
              <Doughnut data={genderData} />
            </div>
          </div>
        </div>

        <div className="">
          <h1 className="text-xl font-Robot font-bold">BloodEntry Charts</h1>
          <div className="flex gap-6">
            <div
              data-aos="fade-right"
              className="w-[25rem] h-[20rem] dark:bg-[#161c29] rounded-lg bg-[white] flex items-center px-5 py-1"
            >
              <div className="w-full">
                <div>
                  <h1 className="text-xl font-Roboto">Leader Board</h1>
                </div>

                {Filter().map((e: string, key: number) => {
                  return (
                    <div
                      key={key}
                      className="my-3 border-2 rounded-sm py-1 pl-5 flex justify-between pr-5 hover:scale-110  transition ease-out duration-500"
                    >
                      <h1>{e}</h1>
                      <h1>{ss[key]}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              data-aos="zoom-in"
              className="w-[25rem] h-[20rem] px-2 dark:bg-[#161c29] rounded-lg bg-[white] flex items-center justify-center "
            >
              <Bar
                data={_data}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        color: ChangeColor().text,
                      },
                      grid: {
                        color: ChangeColor().border,
                      },
                    },
                    x: {
                      ticks: {
                        color: ChangeColor().text,
                      },
                      grid: {
                        color: "",
                      },
                    },
                  },
                }}
              />
            </div>
            <div
              data-aos="fade-left"
              className="w-[25rem] h-[20rem] dark:bg-[#161c29] rounded-lg bg-[white]"
            >
              <PolarArea data={_genderData} />
            </div>
          </div>

          <div className="flex gap-6">
            <div
              data-aos="fade-up"
              className="w-[27rem] h-[22rem] dark:bg-[#161c29] rounded-lg mt-5 bg-[#ffffff] flex items-center justify-center px-3 -py-3"
            >
              <Bar
                data={_ageData}
                options={{
                  scales: {
                    y: { ticks: { color: ChangeColor().text } },
                    x: {
                      ticks: { color: ChangeColor().text },
                    },
                  },
                }}
              />
            </div>

            <div
              data-aos="fade-up"
              className="w-[45rem] h-[22rem] dark:bg-[#161c29] rounded-lg mt-5 bg-[white] flex items-center justify-center"
            >
              <Line
                data={_year}
                options={{
                  scales: {
                    y: {
                      ticks: {
                        color: ChangeColor().text,
                      },
                    },
                    x: {
                      ticks: {
                        color: ChangeColor().text,
                      },
                      grid: {
                        color: ChangeColor().border,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Dashboard;
