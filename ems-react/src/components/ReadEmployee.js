import React,{Component} from 'react';
import Employee from './Employee.component.js';
import EmployeeService from '../services/employee.service.js';
import IDFormHeader from  './GetIdFromUser.js'
class ReadEmployee extends Component{
    constructor(props){
        super(props);

        this.state={
            id:"",
            errorMessage:"",
            isEmployeeAvailable:false,
            EmployeeData:null
        };
        
       
    }
  //This method is called from Child Component(Employee), mainly to share the employee details 
    setData(emp,error){
        if(emp!=null){
            this.setState({
                isEmployeeAvailable:true,
                EmployeeData:emp
            });
        }else {
            this.setState({
                isEmployeeAvailable:false,
                errorMessage:"Employee not found. Please try a different id"
            });
        }
    }
    render(){

 
        return(
            <div>
                <h4 className="pull-left pad botBorder">Read Existing Employee</h4>
               <IDFormHeader setEmpOrError={this.setData.bind(this)}></IDFormHeader>
                {this.state.isEmployeeAvailable?(
                    <div>
                        <Employee empData={this.state.EmployeeData} oper="Read"></Employee>
                    </div>
                ):(this.state.errorMessage!=""?(<div>
                    <h4 className="pad customTextError">{this.state.errorMessage}</h4>
                </div>):
                   ( <div></div>)
                )}
            </div>
        );
    }
}

export default ReadEmployee;