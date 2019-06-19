import React from "react"
import './PhotoViewStyle.css'

class PhotoView extends React.Component {
        
    render() {  
        return (
            <div>
                {this.props.photos.message}
                {this.props.photos.photos.map((item, index) => {    
                    
                    return (
                        <a  href={item} key={index} target="_blank" rel="noopener noreferrer">
                            <img src={item} alt="Rover" className="photo"/>
                        </a>                                                       
                    )

                })}                
            </div>
        )
    }
}

export default PhotoView