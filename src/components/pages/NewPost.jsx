import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

export default function NewPost (props) {
    const [form, setForm] = useState({
        title: '',
        artist: '',
        rating: 0,
        blurb: "",
        user: props.currentUser.id
    })
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const { type } = useParams()

    console.log(type)
    
    // clears state so that search results are cleared when you navigate to different pages on the navbar
    // useEffect(() => {
    //     try {
    //         props.setApiResponse([])
    //         props.setArtistApiResponse([])
    //         props.setInputValue("")
    //         props.setSearch("")
    //         props.setArtist("")
    //     }catch (err) {
    //         console.warn(err)
    //         if (err.response) {
    //             setErrorMessage(err.response.data.message)
    //         }
    //     }
    // }, [])

    useEffect(()=> {
        setForm({title: props.track.track.name, artist: props.track.track.artist})
    }, [props.track])
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/post/new`, form)
            console.log("posted")
            navigate("/home")
        } catch(err) {
        console.warn(err)
        if (err.response) {
            setErrorMessage(err.response.data.message)
            }
        }
    }

    console.log(props.track)


    const trackForm =
            (
            <form onSubmit={handleSubmit}>
                <div >
                    <label htmlFor="songTitle">Song Title:</label>
                    <input type="text" 
                        id="songTitle" 
                        readOnly
                        value={`${props.track.track.name}`} 
                        className='formInputs'>
                    </input>
                    <br></br>
                    <label htmlFor="songArtist">Artist:</label>
                    <input type="text" 
                        id="songArtist" 
                        readOnly
                        value={`${props.track.track.artist}`} 
                        className="formInputs">
                    </input>
                    <br></br>
                    <label htmlFor="songRating">Rating:</label>
                    <input type="number" 
                        id="songRating" 
                        min="0" 
                        max="10"
                        onChange={(e) => setForm({...form, rating: e.target.value})}
                        placeholder="Rate the song 1-10"
                        className="formInputs">
                    </input>
                    <br></br>
                    <label htmlFor="songBlurb">Blurb:</label>
                    <textarea 
                    type='text' 
                    name="blurb" 
                    id="blurb" 
                    cols="100" 
                    rows="5" 
                    onChange={(e) => setForm({...form, blurb: e.target.value})} 
                    className="formInputs">

                    </textarea>
                </div>
                <br></br>
                <button type="submit" className="ml-2 p-3 bg-blue-600 rounded-md">Post Song!</button>
            </form>
        )
    
    const albumForm = (
            <form onSubmit={handleSubmit}>
            <div >
                <label htmlFor="songArtist">Artist:</label>
                <input type="text" 
                    id="songArtist" 
                    value={`${props.track.track.artist}`} 
                    className="formInputs">
                </input>
                <br></br>
                <label htmlFor="songRating">Rating:</label>
                <input type="number" 
                    id="songRating" 
                    min="0" 
                    max="10"
                    onChange={(e) => setForm({...form, rating: e.target.value})}
                    placeholder="Rate the song 1-10"
                    className="formInputs">
                </input>
                <br></br>
                <label htmlFor="songBlurb">Blurb:</label>
                <textarea 
                type='text' 
                name="blurb" 
                id="blurb" 
                cols="100" 
                rows="5" 
                onChange={(e) => setForm({...form, blurb: e.target.value})} 
                className="formInputs">

                </textarea>
            </div>
            <br></br>
            <button type="submit" className="ml-2 p-3 bg-blue-600 rounded-md">Post Song!</button>
        </form>

    )

    
    return (
       
        <div className="flex-col w-1/2 mx-auto">
            {type === 'track'? trackForm : albumForm}
         
        </div>
        
    )
}
