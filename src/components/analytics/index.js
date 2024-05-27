import React from "react";
import Chart from "react-apexcharts";
import { useState, useEffect, useRef } from "react";
import { Loader } from "../../components";
import ReactSpeedometer from "react-d3-speedometer";
import { useSelector } from "react-redux";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const phaseMapping = {
  0: "phase 1",
  1: "phase 2",
  2: "phase 3",
};

const now = new Date();

const getCurrentDateInFormatted = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // getMonth() returns a zero-based value (0-11)
  const day = currentDate.getDate();

  return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
};

function Analytics({ data, selectedChallenge, view, phase, setPhase }) {
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionListData, setSubscriptionListData] = useState(
    useSelector((state) => state?.subscriptionPlanReducer?.subscriptionPlan?.data) || []
  );
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);
  const [selectedView, setSelectedView] = useState("all");
  const [selectedPackageAmount, setSelectedPackageAmount] = useState(0);
  const [maxValueY, setmaxValueY] = useState(0);
  const [minValueY, setminValueY] = useState(0);
  const [minValueX, setminValueX] = useState(null);
  const [maxValueX, setmaxValueX] = useState(null);
  const [equityLeft, setEquityLeft] = useState(0);
  const [totalLossInADay, setTotalLossInADay] = useState([]);
  const [numberOfBets, setNumberOfBets] = useState(0);
  const [challengesList, setChallengesList] = useState([]);
  const [showCaseArray, setShowCaseArray] = useState([]);
  const [selectedMode, setSelectedMode] = useState(view === "daily" ? "daily" : "overall");
  const subscriptionList = useSelector(
    (state) => state?.subscriptionPlanReducer?.subscriptionPlan?.data
  );
  const challengesData = useSelector(
    (state) => state?.challangeStatusReducer?.challangeStatusDetails?.data
  );

  useEffect(() => {
    if (subscriptionList && subscriptionList.length > 0) {
      const packagesData = subscriptionList?.map((item, index) => {
        return {
          name: item.name,
          level: Math.round(Number(item.virtual_coin)),
          phases: {
            0: {
              maxDailyLoss: Number(item.phase_1_single_day_percentage_loss),
              maxDrawdown: Number(item.phase_1_max_draw_down_percentage_loss),
              profitTarget: Math.round(Number(item.phase_1_profit_target)),
            },
            1: {
              maxDailyLoss: Number(item.phase_2_single_day_percentage_loss),
              maxDrawdown: Number(item.phase_2_max_draw_down_percentage_loss),
              profitTarget: Math.round(Number(item.phase_2_profit_target)),
            },
            2: {
              maxDailyLoss: Number(item.phase_3_single_day_percentage_loss),
              maxDrawdown: Number(item.phase_3_max_draw_down_percentage_loss),
              profitTarget: "",
            },
          },
          gap: 5000,
        };
      });
      setSubscriptionListData(packagesData);
    }
  }, [subscriptionList]);

  const [selectedPackage, setSelectedPackage] = useState();

  const [graphData, setGraphData] = useState([]);

  const switchMode = () => {
    setSelectedMode((prevMode) => (prevMode === "overall" ? "daily" : "overall"));
    setGraphData([]);
  };

  const createMarkers = (data, offset = 0) =>
    data.map((item, index) => ({
      seriesIndex: 0,
      dataPointIndex: index + offset,
      fillColor: item.color,
      strokeColor: "#fff",
      size: 6,
      shape: "circle",
      hover: {
        size: 7,
      },
    }));

  const getMarkers = (type, daySelected) => {
    let data;
    let offset = 0;

    if (
      type === "changeShowcaseArray" &&
      ["20d", "10d"].includes(daySelected) &&
      showCaseArray.length > 0
    ) {
      const days = daySelected === "20d" ? 20 : 10;
      data = showCaseArray.slice(showCaseArray.length - days);
    } else if (selectedMode === "daily" && showCaseArray.length > 0) {
      data = showCaseArray;
      offset = 1;
    } else {
      data = graphData;
      data.forEach((item) => {
        const correspondingTotalLoss = totalLossInADay.find(([date]) => date === item[0]);
        if (
          correspondingTotalLoss &&
          correspondingTotalLoss[1] <=
            -(selectedPackageAmount - calculateActualMinY("maxDailyLoss"))
        ) {
          item.color = "red";
        } else {
          item.color = "#b8e834";
        }
      });
    }

    return {
      discrete: createMarkers(data, offset),
    };
  };

  const calculateMinY = () => {
    if (selectedPackage && subscriptionListData.length > 0) {
      const selectedItem = subscriptionListData.find((item) => selectedPackage.includes(item.name));

      if (selectedItem) {
        let maxDailyLossPercentage = 0;
        if (selectedMode === "overall") {
          maxDailyLossPercentage = parseFloat(selectedItem.phases[phase].maxDailyLoss);
        } else {
          maxDailyLossPercentage = parseFloat(selectedItem.phases[phase].maxDrawdown);
        }
        const packageLevelValue = selectedItem.level;
        const maxDailyLoss = packageLevelValue - maxDailyLossPercentage * packageLevelValue;
        return maxDailyLoss - selectedItem.gap;
      }
    }
  };

  const calculateActualMinY = (type) => {
    if (selectedPackage && subscriptionListData.length > 0) {
      const selectedItem = subscriptionListData.find((item) => selectedPackage.includes(item.name));

      if (!selectedItem) {
        return;
      }
      const packageLevelValue = selectedItem?.level;

      let maxDailyLossPercentage;
      if (type === "maxLoss") {
        maxDailyLossPercentage = parseFloat(selectedItem?.phases[phase]?.maxDrawdown);
      } else if (type === "maxDailyLoss") {
        maxDailyLossPercentage = parseFloat(selectedItem?.phases[phase]?.maxDailyLoss);
      } else if (!type) {
        maxDailyLossPercentage =
          selectedMode === "daily"
            ? parseFloat(selectedItem?.phases[phase]?.maxDrawdown)
            : parseFloat(selectedItem?.phases[phase]?.maxDailyLoss);
      }

      if (maxDailyLossPercentage) {
        const maxDailyLoss = packageLevelValue - maxDailyLossPercentage * packageLevelValue;
        return maxDailyLoss;
      }
    }
  };

  const calculateMaxY = () => {
    if (selectedPackage && subscriptionListData.length > 0) {
      const selectedItem = subscriptionListData.find((item) => selectedPackage.includes(item.name));

      if (selectedItem) {
        return maxValueY + selectedItem.gap;
      }
    }
  };
  const calculateActualMaxY = () => {
    if (selectedPackage && subscriptionListData.length > 0) {
      const selectedItem = subscriptionListData.find((item) => selectedPackage.includes(item.name));

      if (!selectedItem) {
        return;
      }

      if (phase !== "2") {
        const maxProfitPercentage = parseFloat(selectedItem.phases[phase].profitTarget);
        const packageLevelValue = selectedItem.level;
        const maxProfit = packageLevelValue + (maxProfitPercentage / 100) * packageLevelValue;
        return maxProfit;
      } else {
        return 1.5 * selectedPackageAmount;
      }
    }
  };

  const createAnnotation = (y, text, borderColor, background) => ({
    y,
    borderColor,
    strokeDashArray: 0,
    label: {
      show: true,
      text,
      position: "right",
      style: {
        cssClass: "apexcharts-point-annotation-label",
        color: "#fff",
        background,
      },
    },
    borderWidth: 1,
  });

  const getYaxisAnnotation = () => {
    const annotations = [
      createAnnotation(
        selectedPackageAmount,
        formatter.format(selectedPackageAmount),
        "#808080",
        "transparent"
      ),
    ];

    if (phase !== "2") {
      annotations.push(
        createAnnotation(
          calculateActualMaxY(),
          formatter.format(calculateActualMaxY()),
          "#008000",
          "transparent"
        )
      );
    }
    if (selectedMode === "overall") {
    } else {
      annotations.push(
        createAnnotation(
          calculateActualMinY(),
          formatter.format(calculateActualMinY()),
          "#FF0000",
          "transparent"
        )
      );
    }

    return annotations;
  };

  var options1 = {
    series: [
      {
        data: graphData,
      },
    ],
    noData: {
      text: "No data available",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },

    responsive: [
      {
        breakpoint: 480, // width in pixels to apply these options
        options: {
          chart: {
            width: "100%", // set the width to 100% for screens smaller than 480px
          },
          // ... other options for small screens
        },
      },
    ],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#3be846"], // end color
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 98],
        colorStops: [
          {
            offset: 0,
            color: "rgba(172,232,54,1)",
            opacity: 1,
          },
          {
            offset: 98,
            color: "rgba(59,232,70,1)",
            opacity: 1,
          },
        ],
      },
    },

    chart: {
      id: "chart-datetime",
      type: "datetime",
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    annotations: {
      yaxis: getYaxisAnnotation(),
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#b8e834"],
    markers: getMarkers(),
    xaxis: {
      type: "datetime",
      min: minValueX,
      max: maxValueX,
      labels: {
        style: {
          colors: "#F5F5F5",
        },
      },
    },
    yaxis: {
      min: calculateMinY(),
      max: calculateMaxY() < calculateActualMaxY() ? calculateActualMaxY() + 4000 : calculateMaxY(),
      tickAmount: 6,
      labels: {
        formatter: function (val) {
          return formatter.format(val);
        },
        style: {
          colors: "#F5F5F5",
        },
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd MMM yyyy",
      },
      y: {
        formatter: (value) => {
          return `Equity: ${formatter.format(value)}`;
        },
        title: {
          formatter: (seriesName) => {
            return "";
          },
        },
      },
    },
    grid: {
      show: false,
    },
  };

  var options2 = {
    series: [
      {
        data: graphData,
      },
    ],
    noData: {
      text: "No data available",
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: undefined,
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
    responsive: [
      {
        breakpoint: 480, // width in pixels to apply these options
        options: {
          chart: {
            width: "100%", // set the width to 100% for screens smaller than 480px
          },
          // ... other options for small screens
        },
      },
    ],
    colors: ["#b8e834"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#3be846"], // end color
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 98],
        colorStops: [
          {
            offset: 0,
            color: "rgba(172,232,54,1)",
            opacity: 1,
          },
          {
            offset: 98,
            color: "rgba(59,232,70,1)",
            opacity: 1,
          },
        ],
      },
    },
    chart: {
      id: "chart-numeric",
      type: "numeric",
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    annotations: {
      yaxis: getYaxisAnnotation(),
    },
    dataLabels: {
      enabled: false,
    },
    markers: getMarkers(),
    xaxis: {
      min: 0,
      max: graphData.length - 1,
      labels: {
        formatter: function (val) {
          return Math.round(val);
        },
        style: {
          colors: "#F5F5F5",
        },
      },
      tickAmount: graphData.length - 1,
    },
    yaxis: {
      min: calculateMinY(),
      max: calculateMaxY() < calculateActualMaxY() ? calculateActualMaxY() + 4000 : calculateMaxY(),
      tickAmount: 6,
      labels: {
        formatter: function (val) {
          return formatter.format(val);
        },
        style: {
          colors: "#F5F5F5",
        },
      },
    },
    tooltip: {
      theme: "dark",
      x: {
        formatter: (value) => {
          return `Bet count: ${value}<br> Bet Name: ${
            showCaseArray[value - 1]?.bet_name || "Not Started"
          }<br> Bet Result: ${showCaseArray[value - 1]?.bet_status || ""}`;
        },
      },
      y: {
        formatter: (value) => {
          return `Equity : ${formatter.format(value)}`;
        },
        title: {
          formatter: (seriesName) => {
            return "";
          },
        },
      },
    },
    grid: {
      show: false,
    },
  };

  //Prepare the challenges data
  useEffect(() => {
    if (challengesData) {
      const allChallengesList = Object.entries(challengesData).map(([key, value]) => {
        return [value[0]?.subscription_id, key];
      });
      let subscriptionArray = [];
      if (selectedChallenge) {
        subscriptionArray = allChallengesList.filter(([, value]) => value === selectedChallenge);
      } else {
        subscriptionArray = allChallengesList;
      }

      setChallengesList(subscriptionArray);
      if (subscriptionArray.length > 0) {
        setSelectedPackage(subscriptionArray[subscriptionArray.length - 1][1]);
      }
    }
  }, [challengesData]);

  const updateAmount = (acc, formattedDate, item) => {
    const resultActions = {
      win: () => (acc[formattedDate] += parseInt(item.win_amount)),
      loss: () => (acc[formattedDate] -= parseInt(item.bet_amount)),
      "half won": () => (acc[formattedDate] += parseInt(item.win_amount) / 2),
      "half lost": () => (acc[formattedDate] -= parseInt(item.bet_amount) / 2),
    };

    if (resultActions[item.result]) {
      resultActions[item.result]();
    }

    return acc[formattedDate];
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-11, so we add 1 to get 1-12
    const day = date.getDate();

    return `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;
  };

  const getSubscriptionId = (name) => {
    if (challengesList.length > 0) {
      const challenge = challengesList.find(
        ([subscription_id, challengeName]) => challengeName === name
      );
      return challenge ? challenge[0] : null;
    }
  };

  const calculateGraphData = () => {
    setNumberOfBets(0);
    let doesSelectedPackageExist;
    if (subscriptionListData.length > 0 && selectedPackage && challengesList.length > 0 ) {
      doesSelectedPackageExist = subscriptionListData.some((item) =>
        selectedPackage.includes(item.name)
      );

    if (selectedMode === "overall") {
      const actual = data.filter(
        (trade) =>
          trade.status !== "Active" &&
          trade.phase === phaseMapping[phase] &&
          trade.subscription === getSubscriptionId(selectedPackage) &&
          doesSelectedPackageExist
      );

      if (actual && actual.length > 0) {
        const sorted = actual.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        let firstBetCreatedDate = sorted[0]?.created_at.split("T")[0] || 0;

        let initialAmount = selectedPackageAmount;
        setNumberOfBets(sorted.length);
        let cumulativeDifferences = {};
        let extractedData;
        try {
          extractedData = sorted.reduce((acc, item) => {
            const formattedDate = formatDate(new Date(item.updated_at));

            if (!acc[formattedDate]) {
              acc[formattedDate] = initialAmount;
            }

            let previousAmount = initialAmount; //previous balance amount
            initialAmount = updateAmount(acc, formattedDate, item); //new balance amount
            let accumulativeWinAndLoss = initialAmount - previousAmount;
            cumulativeDifferences[formattedDate] =
              (cumulativeDifferences[formattedDate] || 0) + accumulativeWinAndLoss;

            if (
              cumulativeDifferences[formattedDate] <=
              -(selectedPackageAmount - calculateActualMinY("maxDailyLoss"))
            ) {
              throw acc;
            }

            return acc;
          }, []);
        } catch (acc) {
          //Case when max Daily loss is hit
          extractedData = acc;
          let result = Object.entries(cumulativeDifferences).map(([date, totalDifference]) => [
            date,
            totalDifference,
          ]);
          setTotalLossInADay(result);
        }
        // Case When the max daily loss is not hit
        let result = Object.entries(cumulativeDifferences).map(([date, totalDifference]) => [
          date,
          totalDifference,
        ]);
        setTotalLossInADay(result);

        const mappedData = Object.entries(extractedData).map(([date, value], index) => {
          return [date, Math.ceil(value)];
        });

        const similarData = [firstBetCreatedDate, selectedPackageAmount];
        mappedData.unshift(similarData);
        mappedData.sort((a, b) => new Date(a[0]) - new Date(b[0]));

        let minValueY = Infinity;
        let maxValueY = -Infinity;

        mappedData.forEach((data, index) => {
          const value = data[1];
          minValueY = Math.min(minValueY, value);
          maxValueY = Math.max(maxValueY, value);
        });

        setGraphData(mappedData);
        setEquityLeft(mappedData[mappedData.length - 1][1]);
        setmaxValueY(maxValueY);
        setminValueY(minValueY);
        setIsLoading(false);
      } else {
        if (chartRef.current && chartRef.current.chart) {
          chartRef.current.chart.updateOptions({
            series: [
              {
                data: [],
              },
            ],
            annotations: {
              yaxis: [],
            },
          });
        }
        setGraphData([]);
        setIsLoading(false);
        setEquityLeft(selectedPackageAmount);
      }
    } else {
      const actual = data.filter(
        (trade) =>
          trade.status !== "Active" &&
          trade.phase === phaseMapping[phase] &&
          trade.subscription === getSubscriptionId(selectedPackage) &&
          doesSelectedPackageExist
      );

      if (actual && actual.length > 0) {
        const sorted = actual.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        setNumberOfBets(sorted.length);
        let initialAmount = selectedPackageAmount;
        let betAmountAfterWinorLoss = 0;
        let dataShowCaseArray = [];
        let extractedData = sorted.map((item, index) => {
          if (item.result === "win") {
            dataShowCaseArray.push({
              index: index + 1,
              bet_name: item.bet_name,
              color: "#008000",
              bet_status: item.result,
            });
            betAmountAfterWinorLoss = initialAmount + parseInt(item.win_amount);
          } else if (item.result === "loss") {
            dataShowCaseArray.push({
              index: index + 1,
              bet_name: item.bet_name,
              color: "#ff0000",
              bet_status: item.result,
            });
            betAmountAfterWinorLoss = initialAmount - parseInt(item.bet_amount);
          } else if (item.result === "half won") {
            dataShowCaseArray.push({
              index: index + 1,
              bet_name: item.bet_name,
              color: "#008000",
              bet_status: item.result,
            });
            betAmountAfterWinorLoss = initialAmount + parseInt(item.win_amount) / 2;
          } else if (item.result === "half lost") {
            dataShowCaseArray.push({
              index: index + 1,
              bet_name: item.bet_name,
              color: "#ff0000",
              bet_status: item.result,
            });
            betAmountAfterWinorLoss = initialAmount - parseInt(item.bet_amount) / 2;
          } else if (item.result === "Refunded") {
            dataShowCaseArray.push({
              index: index + 1,
              bet_name: item.bet_name,
              bet_status: item.result,
              color: "#FFFF00",
            });
            betAmountAfterWinorLoss = initialAmount;
          }
          initialAmount = betAmountAfterWinorLoss;
          return [index + 1, betAmountAfterWinorLoss];
        });

        setShowCaseArray(dataShowCaseArray);
        const firstData = [0, selectedPackageAmount];
        extractedData.unshift(firstData);
        const values = extractedData.map((item) => item[1]);
        setGraphData(extractedData);
        const minValueY = Math.min(...values);
        const maxValueY = Math.max(...values);
        setEquityLeft(values[values.length - 1]);
        setmaxValueY(maxValueY);
        setminValueY(minValueY);
        setIsLoading(false);
      } else {
        if (chartRef2.current && chartRef2.current.chart) {
          chartRef2.current.chart.updateOptions({
            series: [
              {
                data: [],
              },
            ],
            annotations: {
              yaxis: [],
            },
          });
        }
        setGraphData([]);
        setIsLoading(false);
        setEquityLeft(selectedPackageAmount);
      }
    }
  }
  };

  useEffect(() => {
    // Update selectedPackageAmount when selectedPackage or subscriptionListData changes
    if (selectedPackage && subscriptionListData.length > 0) {
      const selectedItem = subscriptionListData.find((item) => selectedPackage.includes(item.name));
      if (selectedItem && selectedItem.level) {
        setSelectedPackageAmount(selectedItem.level);
      }
    }
    //reset total loss in a day whenever data changes
    setTotalLossInADay(0);

    // Recalculate graph data when data changes
    if (data.length > 0) {
      calculateGraphData();
    }

    // Update selectedView when selectedMode changes
    if (selectedMode === "daily") {
      setSelectedView("all_daily");
    } else {
      setSelectedView("all");
    }
  }, [data,selectedPackage, selectedPackageAmount, phase, selectedMode]);

  useEffect(() => {
    if (selectedMode === "overall") {
      switch (selectedView) {
        case "one_month":
          if (chartRef.current && chartRef.current.chart) {
            const minx = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
            const maxx = new Date(now.getFullYear(), now.getMonth() + 1, 0).getTime();
            setmaxValueX(maxx);
            setminValueX(minx);
            chartRef.current.chart.updateOptions({
              xaxis: {
                type: "datetime",
                min: minx,
                max: maxx,
              },
            });
          }
          break;
        case "one_week":
          if (chartRef.current && chartRef.current.chart) {
            const minx = new Date(now.setDate(now.getDate() - now.getDay())).getTime();
            const maxx = new Date(now.setDate(now.getDate() - now.getDay() + 6)).getTime();
            setmaxValueX(maxx);
            setminValueX(minx);
            chartRef.current.chart.updateOptions({
              xaxis: {
                type: "datetime",
                min: minx,
                max: maxx,
              },
            });
          }
          break;
        case "all":
          if (chartRef.current && chartRef.current.chart) {
            if (graphData.length > 0 && selectedMode === "overall") {
              const timestamps = graphData.map((item) => item[0]);
              setmaxValueX(timestamps[timestamps.length - 1]);
              setminValueX(timestamps[0]);
              chartRef.current.chart.updateOptions({
                xaxis: {
                  type: "datetime",
                  min: timestamps[0],
                  max: timestamps[timestamps.length - 1],
                },
              });
            }
          }
          break;
        default:
          break;
      }
    } else if (selectedMode === "daily") {
      switch (selectedView) {
        case "ten_days":
          if (chartRef2.current && chartRef2.current.chart) {
            if (graphData.length - 1 > 10) {
              let removeItem = graphData.length - 10;
              const newData = graphData.slice(removeItem);

              chartRef2.current.chart.updateOptions({
                series: [
                  {
                    data: newData,
                  },
                ],
                xaxis: {
                  type: "numeric",
                  min: newData[0][0],
                  max: newData[newData.length - 1][0],
                },
                markers: getMarkers("changeShowcaseArray", "10d"),
              });
            }
          }
          break;
        case "twenty_days":
          if (chartRef2.current && chartRef2.current.chart) {
            if (graphData.length - 1 > 20) {
              let removeItem = graphData.length - 20;
              const newData = graphData.slice(removeItem);

              chartRef2.current.chart.updateOptions({
                series: [
                  {
                    data: newData,
                  },
                ],
                xaxis: {
                  type: "numeric",
                  min: newData[0][0],
                  max: newData[newData.length - 1][0],
                },
                markers: getMarkers("changeShowcaseArray", "20d"),
              });
            }
          }
          break;
        case "all_daily":
          if (chartRef2.current && chartRef2.current.chart) {
            chartRef2.current.chart.updateOptions({
              series: [
                {
                  data: graphData,
                },
              ],
              xaxis: {
                type: "numeric",
                min: 0,
                max: graphData.length - 1,
              },
            });
          }
          break;
        default:
          break;
      }
    }
  }, [selectedView, [graphData]]);

  if (isLoading && graphData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="p-2 flex flex-col">
      {challengesList.length > 0 ? (
        <>
          <div className="gradient-border-wrap inline-block mx-auto w-auto px-2">
            <div className="bg-black flex flex-col lg:flex-row w-full gap-6 p-[0.75rem] rounded-md justify-center">
              <div className="flex flex-row ">
                <button
                  className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-transparent border border-gray-500 rounded-s-lg hover:text-black hover:bg-[linear-gradient(56deg,_rgba(172,232,54,1)_0%,_rgba(59,232,70,1)_98%) bg-gradient-to-r hover:text-white hover:from-[#E9193F] hover:to-[#831126] "
                  type="button"
                >
                  Account
                </button>
                <select
                  value={selectedPackage}
                  className="bg-black border border-gray-500  text-sm rounded-r-lg outline-none w-full p-2.5"
                  onChange={(e) => setSelectedPackage(e.target.value)}
                >
                  {challengesList &&
                    challengesList.map((challenge, index) => {
                      return (
                        <option key={challenge[0]} value={challenge[1]}>
                          {`${challenge[1]}`}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="flex flex-row ">
                <button
                  className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-transparent border border-gray-500 rounded-s-lg hover:text-black hover:bg-[linear-gradient(56deg,_rgba(172,232,54,1)_0%,_rgba(59,232,70,1)_98%) bg-gradient-to-r hover:text-white hover:from-[#E9193F] hover:to-[#831126] "
                  type="button"
                >
                  Phase
                </button>
                <select
                  value={phase}
                  onChange={(e) => setPhase(e.target.value)}
                  className="bg-[#000000] border border-gray-500  text-sm rounded-r-lg outline-none w-full p-2.5"
                >
                  <option value="0">Phase 1</option>
                  <option value="1">Phase 2</option>
                  <option value="2">Phase 3</option>
                </select>
              </div>
              <div className="flex flex-row items-center gap-4 px-4">
                <button
                  onClick={switchMode}
                  className="bg-[#000000] border border-black p-2 bg-[linear-gradient(56deg,_rgba(172,232,54,1)_0%,_rgba(59,232,70,1)_98%) bg-gradient-to-r  text-white from-[#E9193F] to-[#831126] text-sm rounded-lg outline-none"
                >
                  {selectedMode === "overall" ? "All settled bets" : "Switch to overall mode"}
                </button>
                {selectedMode === "overall" ? (
                  <div className="flex gap-6 px-4">
                    <button
                      id="one_week"
                      onClick={() => setSelectedView("one_week")}
                      className={`p-1 outline-none rounded-lg ${
                        selectedView === "one_week"
                          ? "text-black bg-[linear-gradient(56deg,_rgba(172,232,54,1)_0%,_rgba(59,232,70,1)_98%) bg-gradient-to-r  text-white from-[#E9193F] to-[#831126] "
                          : ""
                      }`}
                    >
                      1W
                    </button>
                    <button
                      id="one_month"
                      onClick={() => setSelectedView("one_month")}
                      className={`p-1 outline-none rounded-lg ${
                        selectedView === "one_month"
                          ? "text-black bg-[linear-gradient(56deg,_rgba(172,232,54,1)_0%,_rgba(59,232,70,1)_98%) bg-gradient-to-r  text-white from-[#E9193F] to-[#831126] "
                          : ""
                      }`}
                    >
                      1M
                    </button>

                    <button
                      id="all"
                      onClick={() => setSelectedView("all")}
                      className={`p-1 outline-none rounded-lg ${
                        selectedView === "all"
                          ? "text-black bg-[linear-gradient(56deg,_rgba(172,232,54,1)_0%,_rgba(59,232,70,1)_98%) bg-gradient-to-r  text-white from-[#E9193F] to-[#831126] "
                          : ""
                      }`}
                    >
                      ALL
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-6 px-4">
                    <button
                      id="ten_days"
                      onClick={() => setSelectedView("ten_days")}
                      className={`p-1 outline-none rounded-lg ${
                        selectedView === "ten_days"
                          ? "text-black bg-[linear-gradient(56deg,_rgba(172,232,54,1)_0%,_rgba(59,232,70,1)_98%) bg-gradient-to-r  text-white from-[#E9193F] to-[#831126] "
                          : ""
                      }`}
                    >
                      10
                    </button>
                    <button
                      id="twenty_days"
                      onClick={() => setSelectedView("twenty_days")}
                      className={`p-1 outline-none rounded-lg ${
                        selectedView === "twenty_days"
                          ? "text-black bg-[linear-gradient(56deg,_rgba(172,232,54,1)_0%,_rgba(59,232,70,1)_98%) bg-gradient-to-r  text-white from-[#E9193F] to-[#831126] "
                          : ""
                      }`}
                    >
                      20
                    </button>

                    <button
                      id="all_daily"
                      onClick={() => setSelectedView("all_daily")}
                      className={`p-1 outline-none rounded-lg ${
                        selectedView === "all_daily"
                          ? "text-black bg-[linear-gradient(56deg,_rgba(172,232,54,1)_0%,_rgba(59,232,70,1)_98%) bg-gradient-to-r text-white from-[#E9193F] to-[#831126] "
                          : ""
                      }`}
                    >
                      ALL
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col items-center xl:flex-row gap-6 xl:items-end justify-between ${
              selectedChallenge ? "xl:px-8" : ""
            }`}
          >
            <div
              className={`w-full overflow-hidden ${
                selectedChallenge ? "xl:w-3/5" : "xl:w-11/12 mx-auto"
              }`}
            >
              <div className="flex flex-wrap gap-6 justify-center mt-6">
                {phase !== "2" ? (
                  <div className="flex gap-4 items-center">
                    <span className="w-[40px] rounded-full h-1 bg-[#008000]"></span>
                    <span className="legend">Profit Target</span>
                  </div>
                ) : null}
                <div className="flex gap-4  items-center">
                  <span className="w-[40px] h-1 rounded-full bg-[#808080]"></span>
                  <span className="legend">Challenge Amount</span>
                </div>
                {selectedMode !== "overall" ? (
                  <div className="flex gap-4 items-center">
                    <span className="w-[40px] h-1 rounded-full bg-[#E34234]"></span>
                    <span className="legend">Max Drawdown</span>
                  </div>
                ) : null}
              </div>
              {selectedMode === "overall" ? (
                <>
                  <Chart
                    key="chart-1"
                    options={options1}
                    ref={chartRef}
                    series={options1.series}
                    type="line"
                    width="98%"
                    height={350}
                  />
                </>
              ) : (
                <Chart
                  key="chart-2"
                  options={options2}
                  ref={chartRef2}
                  series={options2.series}
                  type="line"
                  width="98%"
                  height={350}
                />
              )}
            </div>
            {selectedChallenge ? (
              <ReactSpeedometer
                forceRender
                minValue={calculateActualMinY()}
                maxValue={calculateActualMaxY()}
                value={
                  Math.max(equityLeft, calculateActualMinY()) > calculateActualMaxY()
                    ? calculateActualMaxY()
                    : Math.max(equityLeft, calculateActualMinY())
                }
                textColor="#F5F5F5"
                currentValueText={`Equity: ${formatter.format(equityLeft)}`}
              />
            ) : null}
          </div>
          <div className="w-11/12 mx-auto">
            <h2>Trading Objectives</h2>
            <div className="flex flex-col xl:flex-row  justify-center gap-6 my-4 ">
              <div className="bg-[#FFFFFF0D] w-full rounded-lg relative h-[90px]">
                <div className="p-4 flex flex-col gap-2">
                  <p># of Picks</p>
                  <span>{numberOfBets > 0 ? numberOfBets : 0} / 15</span>
                </div>
                <div
                  style={{
                    width: `${(100 / 15) * numberOfBets > 100 ? 100 : (100 / 15) * numberOfBets}%`,
                  }}
                  className={` h-1 bg-[#B8E834] rounded-lg absolute bottom-0`}
                ></div>
              </div>
              <div className="bg-[#FFFFFF0D] w-full rounded-lg relative h-[90px]">
                <div className="p-4 flex flex-col gap-2">
                  <p>Profit Target</p>
                  {phase !== "2" ? (
                    <span>
                      {equityLeft > selectedPackageAmount
                        ? formatter.format(equityLeft - selectedPackageAmount)
                        : "$0"}{" "}
                      / {formatter.format(calculateActualMaxY() - selectedPackageAmount)}
                    </span>
                  ) : (
                    <span>
                      {equityLeft > selectedPackageAmount
                        ? formatter.format(equityLeft - selectedPackageAmount)
                        : "$0"}{" "}
                      /<span className="mt-4"> ♾️ </span>
                    </span>
                  )}
                </div>
                <div
                  style={{
                    width: `${
                      equityLeft < selectedPackageAmount
                        ? 0
                        : (100 / (calculateActualMaxY() - selectedPackageAmount)) *
                            (equityLeft - selectedPackageAmount) >
                          100
                        ? 100
                        : (100 / (calculateActualMaxY() - selectedPackageAmount)) *
                          (equityLeft - selectedPackageAmount)
                    }%`,
                  }}
                  className={` h-1 bg-[#B8E834] rounded-lg absolute bottom-0`}
                ></div>
              </div>
              <div className="bg-[#FFFFFF0D] w-full rounded-lg relative h-[90px]">
                <div className="p-4 flex flex-col gap-2">
                  <p>Max Daily Loss</p>
                  <span>
                    {(() => {
                      let loss = 0;
                      if (totalLossInADay.length > 0) {
                        const correspondingTotalLoss = totalLossInADay.find(
                          ([date]) => date === getCurrentDateInFormatted()
                        );
                        if (correspondingTotalLoss && correspondingTotalLoss[1] < 0) {
                          loss = Math.abs(correspondingTotalLoss[1]);
                        }
                      }
                      return formatter.format(loss);
                    })()}{" "}
                    /{" "}
                    {formatter.format(selectedPackageAmount - calculateActualMinY("maxDailyLoss"))}
                  </span>
                </div>
                <div
                  style={{
                    width: `${(() => {
                      let percentage = 0;
                      if (totalLossInADay.length > 0) {
                        const correspondingTotalLoss = totalLossInADay.find(
                          ([date]) => date === getCurrentDateInFormatted()
                        );
                        if (correspondingTotalLoss && correspondingTotalLoss[1] < 0) {
                          percentage = Math.min(
                            (100 / (selectedPackageAmount - calculateActualMinY("maxDailyLoss"))) *
                              Math.abs(correspondingTotalLoss[1]),
                            100
                          );
                        }
                      }
                      return percentage;
                    })()}%`,
                  }}
                  className={`h-1 bg-red-500 rounded-lg absolute bottom-0`}
                ></div>
              </div>
              <div className="bg-[#FFFFFF0D] w-full rounded-lg relative h-[90px]">
                <div className="p-4 flex flex-col gap-2">
                  <p>Max Loss</p>
                  <span>
                    {equityLeft < selectedPackageAmount
                      ? formatter.format(selectedPackageAmount - equityLeft)
                      : "$0"}{" "}
                    / {formatter.format(selectedPackageAmount - calculateActualMinY("maxLoss"))}
                  </span>
                </div>
                <div
                  style={{
                    width: `${
                      equityLeft > selectedPackageAmount
                        ? 0
                        : (100 / (selectedPackageAmount - calculateActualMinY("maxLoss"))) *
                            (selectedPackageAmount - equityLeft) >
                          100
                        ? 100
                        : (100 / (selectedPackageAmount - calculateActualMinY("maxLoss"))) *
                          (selectedPackageAmount - equityLeft)
                    }%`,
                  }}
                  className={` h-1 bg-red-500 rounded-lg absolute bottom-0`}
                ></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">Place some bets to see Analytics</div>
      )}
    </div>
  );
}

export default Analytics;
