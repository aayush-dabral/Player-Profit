import React, { useEffect, useState } from "react";

const BalancePopup = ({ challenges }) => {
  // console.log(challenges);
  const [loading, setLoading] = useState(true)
  const [filteredChallenges, setFilteredChanges] = useState([])

  useEffect(() => {
    if(challenges && challenges.length>0) {
      setFilteredChanges(challenges.filter(challenge => {
        // Check if balance_amount of the last element is not null
        return challenge[1][challenge[1].length - 1].balance_amount !== null;
      }));
      // console.log(filteredChallenges)
      setLoading(false)
    }
  }, [])
  // useEffect(() => {
  //   console.log(filteredChallenges);
  // }, [filteredChallenges]); 

  const [count, setCount] = useState(0); 
  return (
    <div className="absolute border border-[#646464] z-50 drop-shadow-xl px-4 py-6 top-1/2 right-[3%] transform -translate-y-[70%] xl:-translate-y-[55%] bg-[#0D0D0D] overflow-y-scroll scrollbar w-[295px] min-h-[40%] max-h-[500px] rounded-xl">
      {/* <div className='text-2xl text-[#b8e834]'>Challenges</div>
      <div className='flex mt-4 justify-between px-2 border-b border-b-[#868686]'>
            <div className='flex gap-2 text-[#868686] font-semibold w-1/2'>
                Name
            </div>
            <div className='text-[#868686] font-semibold w-1/2'>Balance Amount</div>
        </div> */}
      {!loading && filteredChallenges.map((challenge, index) => {
          return (
            <div
              className="flex justify-between  py-2 px-2 rounded-lg border-b border-[#646464]"
              key={index}
            >
              <div className="flex gap-2 w-1/2">
                <div>{index + 1 - count}. </div>
                <div>{challenge[0].split(" -")[0]}</div>
              </div>
              <div className="w-[40%] text-[#F11941]">
                ${challenge[1][challenge[1].length - 1].balance_amount || " -"}
              </div>
            </div>
          )
      })}
    </div>
  );
};

export default BalancePopup;
