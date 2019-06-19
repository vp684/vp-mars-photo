import React from 'react';
import PhotoView from '../photoview/PhotoView'
import './SearchViewStyle.css'


class SearchView extends React.Component {


    state = {
        searchvalue: '',
        cameravalue: "fhaz",
        photosProp: {
            photos: [],
            message: 'No photos to display'    
        }
    }


    handleSearchChange = event => {         
        this.setState({ searchvalue: event.target.value })
    }
    handleCameraChange = event => {
        this.setState({cameravalue: event.target.value})
    }

    validateSearch(searchStr) {
        let regex = /^[0-9]*$/

        if (searchStr.search(regex) || searchStr === '') {
            this.setState({searchvalue : ''})
            alert('Search must contain a Sol number only.')
            return false
        }
        return true
    }

    handleSearchSubmit = event => {
        event.preventDefault()       
        
        if (this.validateSearch(this.state.searchvalue)) {
            fetch('/api/search/', {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"        
                },
                body: JSON.stringify(this.state)        
            })
                .then((response) => {
                return response.json()
            })
            .then((data) => {             
                if (data.photos.length > 0) {
                    this.setState({ photosProp: { photos: data.photos.map(item => item.img_src), message: '' } })
                } else { 
                    this.setState({ photosProp: { photos: [], message: 'No photos to display' } })
                }                                      
            })
        }        

    }
    render() {
        return (
            <div className="main">   
                <div className="home-container">
                    <form>
                        Sol:
                        <input type="text" name='search' className="search-input" placeholder="Sol Number" autoComplete="off" value={this.state.searchvalue} onChange={this.handleSearchChange} />
                        Camera: 
                        <select onChange={this.handleCameraChange} className="camera-list">
                            <option value="fhaz">FHAZ</option>
                            <option value="rhaz">RHAZ</option>                   	
                            <option value="mast">MAST</option>                    	
                            <option value="chemcam">CHEMCAM</option>                    	
                            <option value="mahli">MAHLI</option>
                            <option value="mardi">MARDI</option>                    	
                            <option value="navcam">NAVCAM</option>                    	
                            <option value="pancam">PANCAM</option>                    	
                            <option value="minites">MINITES</option>                    	                  
                        </select>      
                        <button type="submit" className="find-button" value="Submit" onClick={this.handleSearchSubmit}>Find Photos</button>                   
                    </form>
                    
                    
                </div>

                <PhotoView photos={this.state.photosProp} />
                
            </div>
      
                
        )
    }


}

export default SearchView