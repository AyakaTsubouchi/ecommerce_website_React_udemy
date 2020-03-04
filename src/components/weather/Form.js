import React from "react";

class Form extends React.Component{
    render(){
        return(
            <form onSubmit = {this.props.loadWeather}>
                <select name="city" placeholder="City ...">
                <option  value="Vancouver">Vancouver</option>
                <option  value="Sydney">Sydneyr</option>
                <option  value="Kyoto">Kyoto</option>
                </select>
        
                <button>Get Weather</button>
            </form>
        )
    }
}

export default Form;