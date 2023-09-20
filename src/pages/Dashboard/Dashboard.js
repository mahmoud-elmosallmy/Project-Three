import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import './dashboard.css';


export default function Dashborad() {
    return(
        <>
            <TopBar />
            <div className="side-content" >
                <SideBar />
                <div style={{width: "80%"}}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}
















// import { Outlet } from "react-router-dom";
// import SideBar from "./components/SideBar";
// import TopBar from "./components/TopBar";


// export default function Dashborad() {
//     return(
//         <>
//             <TopBar />
//             <div className="side-content" >
//                 <SideBar />
//                 <div style={{width: "80%"}}>
//                     <Outlet />
//                 </div>
//             </div>
//         </>
//     );
// }