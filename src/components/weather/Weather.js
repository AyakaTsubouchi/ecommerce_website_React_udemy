import React from "react";

class Weather extends React.Component{
    
    render(){
        const C = Math.round((this.props.temperature)-273.15)+" °C";
        const F = Math.round(((this.props.temperature)-273.15)*9/5+32)+" °F";
        return(
            <div className="weather-info">
            {
                this.props.city && <p className="weather__key">Location: 
                    <span className="weather__value">  {this.props.city}</span>                    
                </p> 
            }
            {
                this.props.weather && <p className="weather__key">Weather: 
                    <span className="weather__value">  {this.props.weather}</span>                    
                </p> 
            }
            {
                this.props.temperature && 
   
                <p className="weather__key">Temperature(C): 
                    <span className="weather__value"> {C}</span>
                <br/>
                Temperature(F): 
                    <span className="weather__value">{F}</span>
                </p>
         
                
            }

            {
                this.props.humidity && <p className="weather__key">Humidity: 
                    <span className="weather__value">  {this.props.humidity}</span>
                </p>
            }

            {
                this.props.description && <p className="weather__key">Conditions:  
                    <span className="weather__value">  {this.props.description}</span>
                </p>
            }

            {
                this.props.error && <p className="weather__error">{this.props.error}</p>
            }
    
        </div>
        )
    }
}
export default Weather;