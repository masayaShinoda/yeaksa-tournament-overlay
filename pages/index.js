import styles from '../styles/Home.module.css'
import { useState, useEffect } from "react";

export default function Home() {
  const token = '7d75f2d5a1e12e28d4ee89f229cdc5';
  const [tournamentData, settournamentData] = useState((tournamentData) => {return null}); // by default there is no player data

  useEffect(() => {
      fetch(
          'https://graphql.datocms.com/',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              query: `{ 
                  allTournaments {
                    teamAName
                    id
                    teamAScore
                    teamBName
                    teamBScore
                    updatedAt
                    subtitle
                    casters
                    teamALogo {
                      alt
                      url
                    }
                    teamBLogo {
                      alt
                      url
                    }
                  }
                }`
            }),
          }
      )
      .then(res => res.json())
      .then((res) => {
          settournamentData(res.data["allTournaments"])
          console.log(res.data["allTournaments"])   
      })
      .catch((error) => {
          console.log(error);
      });
  }, [])


  
  return (
    <div className={styles.container}>
          <div class="scoreInfoContainer">
        <div class="scoreContainer">
            <p class="teamName">
              {tournamentData && tournamentData[0].teamAName}              
            </p>
            <p class="score">2</p>
        </div>
        <div class="scoreContainer">
            <p class="teamName">
              {tournamentData && tournamentData[0].teamBName}     
            </p>
            <p class="score">3</p>
        </div>
    </div>
    <div class="upperDiv">
        <div class="matchInfo">
            <div class="teamsInfoContainer">
                <div class="teamInfoContainer" id="teamAInfoContainer">
                  {tournamentData && tournamentData[0].teamALogo &&
                    <img src={tournamentData[0].teamALogo.url} alt={tournamentData[0].teamALogo.alt} />
                  }
                </div>
                <div class="teamInfoContainer" id="teamBInfoContainer">
                  {tournamentData && tournamentData[0].teamBLogo &&
                    <img src={tournamentData[0].teamBLogo.url} alt={tournamentData[0].teamBLogo.alt} />
                  }
                </div>
            </div>

        </div>
        
        <div class="tourLogoContainer">
            <img src="./images/yeaksa-summer-tour-orange-logo-01.svg" alt="YEAKSA SUMMER CUP" />
        </div>
        <div class="tourInfo">
            <span class="tourName">
                YeakSa Summer Cup
                <br />
                <span class="tourGameName">
                  {tournamentData && tournamentData[0].subtitle}
                </span>
            </span>
            <div class="casterInfo">
                <img src="./images/mic-svg.svg" alt="." />
                <p>
                  {tournamentData && tournamentData[0].casters}
                </p>
            </div>
        </div>
    </div>
    </div>
  )
}
