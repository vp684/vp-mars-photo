import React from 'react';
import PhotoView from '../photoview/PhotoView'
import './SearchViewStyle.css'


class SearchView extends React.Component {


    state = {
        searchvalue: '',
        cameravalue: "FHAZ",
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
        // let regex = /^[0-9]*$/

        // if (searchStr.search(regex) || searchStr === '') {
        //     this.setState({searchvalue : ''})
        //     alert('Search must contain a Sol number only.')
        //     return false
        // }
        return true
    }

    handleSearchSubmit = event => {
        event.preventDefault()  
        let payload = {cameravalue: this.state.cameravalue, searchvalue: this.state.searchvalue}
        
        if (this.validateSearch(this.state.searchvalue)) {
            fetch('/api/search/', {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"        
                },
                body: JSON.stringify(payload)        
            })
                .then((response) => {
                return response.json()
            })
            .then((data) => {      
                if (data.error) {  
                    return this.setState({ photosProp: { photos: [], message: data.error } })
                }
                else if (data.photos.length > 0) {
                    this.setState({ photosProp: { photos: data.photos.map(item => item.img_src), message: '' } })
                } else { 
                    this.setState({ photosProp: { photos: [], message: 'No photos to display on Sol ' + this.state.searchvalue + ' from ' + this.state.cameravalue } })
                }                                      
            })
        }        

    }
    render() {
        return (
            <div className="main">   
                <div className="search-container">
                    <form>
                        Sol:
                        <input type="text" name='search' className="search-input" placeholder="Sol Number" autoComplete="off" value={this.state.searchvalue} onChange={this.handleSearchChange} />
                        Camera: 
                        <select onChange={this.handleCameraChange} className="camera-list">
                            <option value="FHAZ">FHAZ</option>
                            <option value="RHAZ">RHAZ</option>                   	
                            <option value="MAST">MAST</option>                    	
                            <option value="CHEMCAM">CHEMCAM</option>                    	
                            <option value="MAHLI">MAHLI</option>
                            <option value="MARDI">MARDI</option>                    	
                            <option value="NAVCAM">NAVCAM</option>                    	
                            <option value="PANCAM">PANCAM</option>                    	
                            <option value="MINITES">MINITES</option>                    	                  
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