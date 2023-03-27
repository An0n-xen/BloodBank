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
import { changeTheme } from "@nextui-org/react";
import { Agent } from "http";

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

  const GenderCount: any = { Male: 0, Female: 0 };

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

  const count: number[] = [];

  const Settings = {
    dots: true,
    Infinity: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
      });

    FullData.forEach((e) => {
      if (
        TopFive.includes(e["DonorID"]) &&
        !Names.includes(`${e["FirstName"]} ${e["LastName"]}`)
      ) {
        Names.push(`${e["FirstName"]} ${e["LastName"]}`);
      }
    });

    return Names;
  }

  function ChangeColor() {
    if (currentTheme === "dark") {
      const colorScheme = { text: "white", border: "" };
      return colorScheme;
    } else {
      const colorScheme1 = { text: "#524F4F", border: "#b7bac1" };
      return colorScheme1;
    }
  }

  function ColorDou() {
    if (currentTheme === "dark") {
      const colorScheme = { border: "#161c29" };
      return colorScheme;
    } else {
      const colorScheme1 = { border: "white" };
      return colorScheme1;
    }
  }
  function BloodCounter() {
    Object.keys(GenderCount).map((item) => {
      GenderCount[item] = 0;
    });

    Object.keys(BloodCount).map((item) => {
      BloodCount[item] = 0;
    });

    Object.keys(AgeRanges).map((item) => {
      AgeRanges[item] = 0;
    });

    FullData.map((item) => {
      switch (item["Gender"]) {
        case "m":
          GenderCount["Male"] += 1;
          break;

        default:
          GenderCount["Female"] += 1;
          break;
      }

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
      count.push(item["DonorID"]);
    });
  }

  DonorCounter();

  Filter();

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
        backgroundColor: ["red"],
      },
    ],
  };

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

  // (async function () {
  //   let ctx = document.getElementById("myChart");

  //   let config = {
  //     type: "radar",
  //     data: data,
  //     options: {
  //       elements: {
  //         line: {
  //           borderWidth: 3,
  //         },
  //       },
  //     },
  //   };
  //   let myChart = new Chartjs(ctx, config);
  // })();

  useEffect(() => {
    getFullData();
  }, []);

  return (
    <div className="text-3xlfont-black p-8 ">
      <Slider {...Settings} className="">
        <div className="">
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
          <div className="flex gap-10">
            <div
              data-aos="fade-right"
              className="w-[25rem] h-[20rem] dark:bg-[#161c29] rounded-lg bg-[white]"
            ></div>
            <div
              data-aos="zoom-in"
              className="w-[25rem] h-[20rem] dark:bg-[#161c29] rounded-lg bg-[white]"
            ></div>
            <div
              data-aos="fade-left"
              className="w-[25rem] h-[20rem] dark:bg-[#161c29] rounded-lg bg-[white]"
            ></div>
          </div>

          <div
            data-aos="fade-up"
            className="w-full h-[22rem] dark:bg-[#161c29] rounded-lg mt-5 bg-[white]"
          ></div>
        </div>
      </Slider>
    </div>
  );
};

export default Dashboard;
