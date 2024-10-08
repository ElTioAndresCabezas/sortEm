import './Leaderboard.css';

import { BrowserView, MobileOnlyView } from "react-device-detect";
import { useEffect, useState } from "react";

import LeaderboardTable from "./LeaderboardTable";
import useApi from "../useApi";
import { useKeyboard } from "../BaseGame/useKeyboard";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";

export default function Leaderboard() {
    const { getLeaderboard, getAllUsernames } = useApi();
    const [leaderboard, setLeaderboard] = useState([]);
    const [players, setUsernames] = useState([]);

    const navigate = useNavigate()


    useEffect(() => {
        getLeaderboard().then((data) => {
            setLeaderboard(data);
            console.log(data);
        });
        getAllUsernames().then((data) => {
            setUsernames(data);
            console.log(data);
        });
    }, []);

    useKeyboard({
        key: " ",
        preventRepeat: true,
        onKeyPressed: () => {
            navigate("/");
        }
    });

    const { ref } = useSwipeable({
        onSwipedUp: () => {
            navigate("/");
        },
        delta: 300,
    });

    useEffect(() => {
        ref(document);
        return () => {
            ref({});
        }
    }
    )



    return (
        <div>
            <MobileOnlyView>
                <span>Long swipe up to go back</span>
            </MobileOnlyView>
            <BrowserView>
                <span>Press space to go back</span>
            </BrowserView>

            <h1>Top 100</h1>

            <LeaderboardTable dataToDisplay={leaderboard} />

            <h2>Celebrating the Most Amazing Players!</h2>
            <div className="usernames">
                {players.map(({ username }, i) => (
                    username + " "
                ))}
            </div>


        </div >
    );
}
