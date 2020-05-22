import React,{Component} from 'react';
import Employee from './Employee.component.js';
import IDFormHeader from  './GetIdFromUser.js'
import employeeService from '../services/employee.service.js';

class DeleteEmployee extends Component{

    constructor(props){
        super(props);

        this.state={
            id:"",
            errorMessage:"",
            isEmployeeAvailable:false,
            EmployeeData:null
        };
        
      this.deleteEmployee=this.deleteEmployee.bind(this) ;
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

  async  deleteEmployee(data){
      console.log("Inside delete");
      let id=this.state.id;  
    await employeeService.deleteEmployee(id).then(response=>{
        console.log("response received delete!!!" + response.data.message);
        if(response.data.message=="Success"){
            this.setState({
                isEmployeeAvailable:false,
                errorMessage:"Employee deleted successfully!! Hit Read to check!!!"
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
                <h4 className="pull-left pad botBorder">Delete Existing Employee</h4>
                <IDFormHeader setEmpOrError={this.setData.bind(this)}></IDFormHeader>
               {//Add the Employee form if employee is returned in prrevious get call
}
                {this.state.isEmployeeAvailable?(
                    <div>
                        <Employee empData={this.state.EmployeeData} deleteMethod={this.deleteEmployee.bind(this)} oper="Delete"></Employee>
                        
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

export default DeleteEmployee;