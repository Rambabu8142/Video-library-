import { useEffect, useState } from "react"
import { VideoContract } from "../contracts/VideoContract"
import axios from "axios";

export function UserDashboard(){

    const [videos, setVideos] = useState<VideoContract[]>();

    function LoadVideos(){
        axios.get('http://127.0.0.1:7070/get-videos')
        .then(response=>{
             setVideos(response.data);
        })
    }

    useEffect(()=>{
        LoadVideos();
    },[])


    return(
      <div className="overflow-auto" style={{height:'500px'}}>
         <header className="text-center fs-5">  Dashboard </header>
         <img  src="channel-banner.jpg" width="100%"/>
         <nav className="text-center fs-3">
            <span className="me-4 fw-bold">Home</span> <span>Live</span>
         </nav>
        <main className="d-flex flex-wrap">
            {
                videos?.map(video=>

                    <div key={video.VideoId} className="card m-3 p-2" style={{width:'300px'}}>
                        <div className="card-header">
                            {video.Title}
                        </div>
                        <div className="card-body">
                            <iframe src={video.Url} width="100%" height="200" ></iframe>
                        </div>
                        <div className="card-footer d-flex justify-content-around">
                            <span className="bi bi-hand-thumbs-up"> {video.Likes} </span> 
                            <span className="bi bi-hand-thumbs-down"> {video.Dislikes} </span>
                        </div>
                    </div>

                )
            }
        </main>
      </div>
    )
 }