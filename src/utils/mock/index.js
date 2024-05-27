const data = JSON.parse(localStorage.getItem("userData"));
// console.log(data)

export const navOptions = [
  // { name: "Challenges", id: 2, path: `{https://fundedsportstrader.com/Challenges}`},
  { name: "My Account", id: 1, path: "/profile" },
  {
    name: "Challenges",
    id: 2,
    path: `${import.meta.env.VITE_REACT_APP_WORDPRESS_URL}challenges?uid=${data?.email}&fname=${
      data?.first_name
    }&lname=${data?.last_name}`,
  },
  { name: "Challenge Status", id: 3, path: "/trades/challengestatus" },
  { name: "Trading", id: 4, path: "/trading" },
  { name: "Trading History", id: 5, path: "/trades/tradehistory" },

  // { name: "FAQ", id: 6, path: 'https://help.fundedsportstrader.com/' },
];
