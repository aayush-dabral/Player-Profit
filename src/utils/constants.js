let currentYear = new Date().getFullYear()

export const GENDER = ["Male", "Female", "Other"]
export const BettingFilters = ["All", "Active", "Settled"]
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]
export const YEAR = [
  currentYear,
  currentYear + 1,
  currentYear + 2,
  currentYear + 3,
  currentYear + 4,
  currentYear + 5,
  currentYear + 6,
  currentYear + 7,
  currentYear + 8,
  currentYear + 9,
  currentYear + 10,
  currentYear + 11,
  currentYear + 12,
  currentYear + 13,
  currentYear + 14,
  currentYear + 15,
  currentYear + 16,
  currentYear + 17,
  currentYear + 18,
  currentYear + 19,
  currentYear + 20,
  currentYear + 21,
  currentYear + 22,
  currentYear + 23,
  currentYear + 24,
  currentYear + 25,
  currentYear + 26,
  currentYear + 27,
  currentYear + 28,
  currentYear + 29
]

export const GAMES = [
  { game: "Football", league: ["NCAAF", "NFL"], selected: true },
  { game: "American Football", league: ["NFL"], selected: true },
  {
    game: "Baseball",
    league: ["MLB"],
    selected: false
  },
  { game: "Basketball", league: ["NBA", "NCAAB"], selected: false},
  // { game: "MMA", league: ["UFC"], selected: false, active: MMABlack, inactive: MMAWhite },
  {
    game: "Soccer",
    league: [
      "England - Premier League",
     "UEFA - Champions League",
     "Italy - Serie A",
     "Spain - La Liga",
     "USA - Major League Soccer",
     "Germany - Bundesliga",
     "Australia - A league",
     "England - Championship",
     "France - Ligue 1",
     "Mexico - Liga MX",
     "UEFA - Europa League",
     "England - FA Cup",
     "Brazil - Serie A"
    ],
    selected: false,
  },
  { game: "Hockey", league: ["NHL"], selected: false},
  { game: "Ice Hockey", league: ["NHL"], selected: false}
]

export const BALANCE = [
  { price: "$ 5,000", select: false, min: "$100", max: "$750", id: 1 },
  { price: "$ 10,000", select: false, min: "$200", max: "$1,500", id: 2 },
  { price: "$ 25,000", select: false, min: "$500", max: "$3,500", id: 3 },
  { price: "$ 50,000", select: true, min: "$1,000", max: "$8,000", id: 4 },
  { price: "$ 100,000", select: false, min: "$2,000", max: "$16,000", id: 5 }
]

export const TABLE_DATA = [
  ["", "Step 1", "Step 2", "Step 3"],
  ["", "The TFST Challenge", "The Evaluation Process", "Funded Sports Trader"],
  ["Trading Period", "30 Days", "30 Days", "Indefinite"],
  ["Number of Bets", "15 Bets", "15 Bets", "X"],
  ["Bet Minimum", "$250", "$250", "$250"],
  ["Bet Maximum", "$500", "$500", "$500"],
  ["Max Drawdown", "20%", "20%", "20%"],
  ["Max Daily Loss", "15%", "15%", "15%"],
  ["Profit Target", "20%", "15%", "X"],
  ["Refund", "-", "-", "Initial Payment"]
]

export const TABLE_DATA_QUICK = [
  ["Account Balance", "$10,000", "$25,000", "$50,000", "$100,000", "$200,000"],
  ["Trading Period", "Unlimited", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
  ["Minimum Trading Days", "4 Days", "4 Days", "4 Days", "4 Days", "4 Days"],
  ["Maximum Daily Loss", "$500", "$1,250", "$2,500", "$5,000", "$10,000"],
  ["Maximum Loss", "$1,000", "$2,500", "$5,000", "$10,000", "$20,000"],
  ["Profit Target", "$1,000", "$2,500", "$5,000", "$10,000", "$20,000"],
  ["Refundable Fee", "€ 155", "€ 250", "€ 345", "€ 540", "€1,080"]
];

export const TABLE_EXPANDABLE_DATA = [
  "The betting period for phase 1 and phase 2 are 30 calendar days each, respectively. If a participant completes the challenge objectives prior to the maximum time allotted, they can proceed without waiting. For example, if a participant finishes all challenge objectives within 19 days, they can advance to the verification process without waiting any days.",
  "To meet the challenge objective, you must place at least 15 bets during the current cycle.",
  "Depending on which account balance package selected, this is the minimum amount for each bet you can place.",
  "Depending on which account balance package selected, this is the maximum amount for each bet you can place.",
  "This betting objective requires that the equity of the account never falls below 80% of the initial account balance during the account duration. This buffer of the initial account balance gives bettors space to prove their capabilities while providing a stop gap for losses for our capital partners should you become a funded trader.",
  "This betting objective requires that the daily equity of the account never falls below 80% of the initial account balance during the account duration. This is to ensure bettors are not betting on emotion and can take steps to protect themselves and our capital partners.",
  "The Profit Target in the FTST challenge is set to 20% of the initial balance and 15% in the Verification phase. A profit target means that a bettor reaches a profit in the sum of closed positions on the assigned account anytime within the Betting Period. Also, please note that in order to proceed to the next phase, all bets must be closed. For example: If you bet in the FTST Challenge with a $100,000 account balance, your profit target is $20,000 in an FTST Challenge and then $15,000 in the Verification.",
  "The fee is reimbursed to you should you make it to the first Profit Split when you become a Funded Sports Trader."
]
export const CONSTANT_DEVICE_SIZE = {
  LARGE: 'large',
  EXTRA_LARGE: 'extralarge',
  MEDIUM: 'medium',
  SMALL: 'small',
  EXTRA_SMALL: 'extrasmall'
}

export const LINEAR_GRADIENT_COLOR = ['#000000', '#000000', '#1B1B1B','#2E2D2D' ]

export const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const NEW_FAQ_URL = "https://help.fundedsportstrader.com/"

export const WoocommerceHomePageUrl = "https://fundedsportstrader.com/"
