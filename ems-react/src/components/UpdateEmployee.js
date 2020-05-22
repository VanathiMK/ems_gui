import React,{Component} from 'react';
import Employee from './Employee.component.js';
import IDFormHeader from  './GetIdFromUser.js'
import employeeService from '../services/employee.service.js';

class UpdateEmployee extends Component{

    constructor(props){
        super(props);

        this.state={
            id:"",
            errorMessage:"",
            isEmployeeAvailable:false,
            EmployeeData:null
        };
        
      this.updateEmployee=this.updateEmployee.bind(this) ;
    }
    setData(emp,error){
        if(emp!=null){
            this.setState({
                isEmployeeAvailable:true,
                id:emp.id,
                EmployeeData:emp
            });
        }else {
            this.setState({
                isEmployeeAvailable:false,
                errorMessage:"Error received " + error
            });
        }
    }

  async  updateEmployee(data){
      console.log("Inside update");
      let id=this.state.id;  
      let newData=data;
    await employeeService.updateEmployee(id,newData).then(response=>{
        console.log("response received updated!!!" + response.data.message);
        if(response.data.message=="Success"){
            this.setState({
                isEmployeeAvailable:false,
                errorMessage:"Employee updated successfully!! Hit Read to see the update!!!"
            });}
        else{
            this.setState({
                errorMessage:response.error
            });
        }
        
    }).catch(error=>{
        console.log("Error " +error);
    });
    }
    render(){

        return(
            <div>
                <h4 className="pull-left pad botBorder">Update Existing Employee</h4>
                <IDFormHeader setEmpOrError={this.setData.bind(this)}></IDFormHeader>

                
{//Add the Employee form if employee is returned in prrevious get call
}
                {this.state.isEmployeeAvailable?(
                    <div>
                        <Employee empData={this.state.EmployeeData} updateMethod={this.updateEmployee.bind(this)} oper="Update"></Employee>
                        
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

export default UpdateEmployee;