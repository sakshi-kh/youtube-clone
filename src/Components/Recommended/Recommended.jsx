import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { API_KEY } from "../../data";
import { valueConv } from "../../data";
import { Link } from "react-router-dom";
function Recommended({ categoryId }) {
  const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    const realtedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=50&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(realtedVideo_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="recommended">
      {apiData.map((item, index) => {
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="video-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{valueConv(item.statistics.viewCount)} views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
export default Recommended;
