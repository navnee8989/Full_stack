import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

function Post() {
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
       axios.get(`http://localhost:5000/posts/byId/${id}`).then((res)=>{
                const {title,PostText,username} = res.data
                const mainData = {title,PostText,username}
                setData(mainData)
       })
          
    }, [id]);

    return (
        <div className="card flex justify-center w-50 mx-auto my-4">
            <div className="card-body text-center animate__animated animate__fadeIn">
                <h1 className="py-4">{data.id}</h1>
                <h5 className="card-title bg-slate-600 text-white py-2 rounded-xl text-bold">
                    {data.title}
                </h5>
                <p className="card-text bg-orange-300 py-7 text-center mb-2">
                    {data.PostText}
                </p>
                <div className="card-name bg-green-300 py-6 text-center">
                    {data.username}
                </div>
            </div>
        </div>
    );
}

export default Post;
