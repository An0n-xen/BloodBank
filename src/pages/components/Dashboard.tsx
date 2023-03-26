import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar, Line, Bar, PolarArea, Pie } from "react-chartjs-2";
ChartJS.defaults.color = "white";
const Dashboard = ({ ds, Bl }: { ds: []; Bl: [] }) => {
  const [FullData, setFullData] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
      count.push(item["DonorID"]);
    });
  }

  BloodCounter();
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
    <div
      data-aos="zoom-in"
      className="text-3xl flex items-center justify-center font-black"
    >
      <div className="w-[20rem]">
        <Bar
          data={data}
          options={{
            scales: {
              y: {
                ticks: {
                  color: "white",
                },
                beginAtZero: true,
              },
              x: {
                ticks: {
                  color: "white",
                },
              },
            },
          }}
        />
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
