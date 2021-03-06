import styles from '../styles/Home.module.css'
import Image from 'next/image'
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
                    tourLogo {
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
          <div className="scoreInfoContainer">
        <div className="scoreContainer">
            <p className="teamName">
              {tournamentData && tournamentData[0].teamAName}              
            </p>
            <p className="score">
             {tournamentData && tournamentData[0].teamAScore}
            </p>
        </div>
        <div className="scoreContainer">
            <p className="teamName">
              {tournamentData && tournamentData[0].teamBName}     
            </p>
            <p className="score">
             {tournamentData && tournamentData[0].teamBScore}
            </p>
        </div>
    </div>
    <div className="upperDiv">
        <div className="matchInfo">
            <div className="teamsInfoContainer">
                <div className="teamInfoContainer" id="teamAInfoContainer">
                  {tournamentData && tournamentData[0].teamALogo &&
                    <Image 
                      src={tournamentData[0].teamALogo.url} 
                      alt={tournamentData[0].teamALogo.alt} 
                      width="100"
                      height="100"
                    />
                  }
                </div>
                <div className="teamInfoContainer" id="teamBInfoContainer">
                  {tournamentData && tournamentData[0].teamBLogo &&
                    <Image 
                      src={tournamentData[0].teamBLogo.url} 
                      alt={tournamentData[0].teamBLogo.alt}
                      width="100"
                      height="100"
                    />
                  }
                </div>
            </div>

        </div>
        
        <div className="tourLogoContainer">
            {tournamentData && 
              (
                <Image 
                  src={tournamentData[0].tourLogo["url"]}
                  alt={tournamentData[0].tourLogo["alt"]}
                  width="110"
                  height="110"
                />
              )
            }
        </div>
        <div className="tourInfo">
            <span className="tourName">
                YeakSa Summer Cup
                <br />
                <span className="tourGameName">
                  {tournamentData && tournamentData[0].subtitle}
                </span>
            </span>
            <div className="casterInfo">
                <Image src="/images/mic-svg.svg" width="20" height="20" alt="." />
                <p>
                  {tournamentData && tournamentData[0].casters}
                </p>
            </div>
        </div>
    </div>
    </div>
  )
}
