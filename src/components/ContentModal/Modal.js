import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@material-ui/icons/YouTube';
import './Modal.css'

const style = {

    width: '90%',
    height: '80%',
    bgcolor: '#39445a',
    border: '1px solid #282c34',
    boxShadow: 24,
    p: 4,
};

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = React.useState([]);
    const [video, setVideo] = React.useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const fetchData = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
        setContent(data)
    }


    const fetchVideo = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

        setVideo(data.results[0]?.key)
    }


    React.useEffect(() => {
        fetchVideo();
        fetchData()
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <div className='media'

                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={handleOpen}

            >
                {children}
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Fade in={open}>
                    {content && (<Box sx={style} >
                        <div className='ContentModal'>
                            <img className='contentModal_portrait' alt={content.name || content.title} src={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable} />
                            <img className='contentModal_landscape' alt={content.name || content.title} src={content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape} />
                            <div className="contentModal_about">
                                <span className="contentModal_title">
                                    {content.name || content.title}(
                                    {(content.first_air_date || content.release_date || "----").substring(0, 4)}
                                    )



                                </span>
                                {content.tagline && (<i className='tagline'>{content.tagline}</i>)}
                                <span className="contentModal_description">
                                    {content.overview}
                                </span>
                                <div>

                                </div>
                                <Button
                                    variant='contained'
                                    startIcon={<YouTubeIcon />}
                                    color='secondary'
                                    target='_blank'
                                    href={`https://www.youtube.com/watch?v=${video}`}


                                >
                                    Watch the Trailer
                                </Button>
                            </div>
                        </div>

                    </Box>)}
                </Fade>
            </Modal>

        </>
    );
}
