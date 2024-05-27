import { TEAM_LOGO } from "./teamLogoConstant"

export const convertToCard = val => {
  if (val != null || val != undefined || val != "") {
    val = val?.split("-")?.join("") // Remove dash (-) if mistakenly entered.
    let finalVal = val?.match(/.{1,4}/g)?.join("-")
    return finalVal
  } else {
    return val
  }
}

export const getTeamImage = (teamImage, league, sport) => {
  // console.log(item)
  let tempArr = TEAM_LOGO
  // if (league === "NFL") tempArr = NFL
  // else if (league === "NCAAF") tempArr = NCAAF
  // else if (league === "MLB") tempArr = MLB
  // else if (league === "NPB") tempArr = NPB
  // // else if (league === "PGA") tempArr = PGA
  // // else if (league === "UFC") tempArr = UFC
  // else if (league === "WNBA") tempArr = WNBA
  // else if (league === "Brazil - Serie B") tempArr = BRAZIL_SERIE_B
  // else if (league === "England - Premier League")
  //   tempArr = ENGLAND_PREMIER_LEAGUE
  // else if (league === "USA - USL Championship") tempArr = USA_USL_CHAMPIONSHIP

  let index = tempArr && tempArr?.map(item => item.name).indexOf(teamImage)
  if (index === -1) return "No Image"
  // if(index === -1) {
  //   if(sport === "tennis"){
  //     return {
  //       id: 1,
  //       logo: "../../assets/tennis-ball.png"
  //     }
  //   } else if(sport === "baseball"){

  //   } else if(sport === "basketball"){

  //   } else if(sport === "hockey"){

  //   } else if(sport === "mma"){
      
  //   } else if(sport === "soccer"){

  //   }
  // }
  else return tempArr[index]
}

//Break string after comma and return rest string
export const getStringAfterComma = inputString => {
  const parts = inputString.split(",")
  if (parts.length > 1) {
    return parts[1].trim()
  } else {
    return null // Return null if there is no comma in the string
  }
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const currenyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});