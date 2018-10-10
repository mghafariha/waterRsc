import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment-jalaali';
class ItemRow extends React.Component{

    render(){
        return (
            <tr>
                
                <td>{this.props.description}</td>
                <td>{this.props.LongitudeWell}</td>
                <td>{this.props.LatitudeWell}</td>
               
                {/* <td>{moment(this.props.DateCensus)}</td> */}
                <td>{this.props.OwnerCode}</td>
                <td>{this.props.OwnerMobile}</td> 

        <td>{this.props.ElectricityCode}</td> 
        <td>{this.props.SerialNumberMeter}</td>
        <td>{this.props.SerialNumberModem}</td>
        <td>{this.props.ManufacturerMeter}</td>
        {/* <td>{moment(this.props.DateInstallationMeter)}</td> */}
        {/* <td>{this.props.TypeMeter}</td>
        <td>{this.props.NumberMeters}</td>
        <td>{this.props.WaterSystem}</td>
        <td>{this.props.ApprovedVolume}</td>
        <td>{this.props.WorkHours}</td>
        <td>{this.props.WaterMeasurementMethod}</td>
        <td>{this.props.EC}</td>
        <td>{this.props.DEBI}</td>
        <td>{this.props.PresentSituation}</td>
        <td>{this.props.DiameterWaterPipe}</td>
        <td>{this.props.YearDig}</td>
        <td>{this.props.PowerlevelElectricity}</td>
        <td>{this.props.PowerlevelDiesel}</td>
        <td>{this.props.ArtifactsType}</td>
        <td>{this.props.AreaUnderCultivation}</td>
        <td>{this.props.CultivarType}</td>
        <td>{this.props.KindConsumptionWater}</td>
        <td>{this.props.Pipeline}</td>
        <td>{this.props.WellDepth}</td>
        <td>{this.props.WaterSurface}</td> */}


                <td><button>Delete</button></td>
                <td><button>Edit</button></td>
      
                </tr>
        )
    }
}
export default ItemRow