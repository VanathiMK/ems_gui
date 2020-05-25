import React, * as react from "react";

import EmployeeService from "../services/employee.service"
class Employee extends react.Component{
    constructor(props){
        super(props);

        {/*Bind event handlers */}
        this.onChangeFirstName=this.onChangeFirstName.bind(this);
        this.onChangeSurName=this.onChangeSurName.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeDob=this.onChangeDob.bind(this);
        this.onChangeGender=this.onChangeGender.bind(this);
        this.createEmployee=this.createEmployee.bind(this);
        this.callRespectService=this.callRespectService.bind(this);
       // this.onClickCreate=this.onClickCreate.bind(this);

       if(props.oper=='Create'){
           this.state={
               id:"",
               firstName:"",
               surName:"",
               email:"",
               dob:"",
               gender:"",
               submitted:false
           };
       }else{
        this.state = {
            
            id:props.empData.id,
            firstName:props.empData.firstName,
            surName:props.empData.surName,
            email:props.empData.email,
            dob:props.empData.dob,
            gender:props.empData.gender,
            submitted:false
        };
    }
    }

    callRespectService(e){
        let operation = this.props.oper;
        let data={
            
            firstName:this.state.firstName,
            surName:this.state.surName,
            email:this.state.email,
            dob:this.state.dob,
            gender:this.state.gender,
        };
        switch(operation){
            case 'Create':{
                this.createEmployee(data);
                break;
            }
             case 'Update':{
                this.props.updateMethod(data);
                break;
             }
            case 'Delete':{
                this.props.deleteMethod(data);
                break;
            }
        }
    }
   async createEmployee(data){
       console.log("Inside create empoyee ");
        
      try{ 
        const response=  await  EmployeeService.createNewEmployee(data).then(response=>{
            console.log("request sent : " );
            this.setState({
            firstName:response.data.firstName,
            surName:response.data.surName,
            email:response.data.email,
            dob:response.data.dob,
            gender:response.data.gender,
            id:response.data.id,
            submitted: true
           });

        console.log("received response :" +response.data.message);
        }).catch(error=>{
            console.log(error);
        });          
          
    
    }catch(error){
        console.log("error sending data from createEmployee, component.js "+error);
    }
    console.log("in create employee");
    }
    onChangeFirstName(e){
        this.setState({
            firstName:e.target.value
        });
    }
    onChangeSurName(e){
        this.setState(
            {
                surName:e.target.value
            }
        );
    }
    onChangeEmail(e){
        this.setState(
            {
                email:e.target.value
            }
        );
    }
    onChangeDob(e){
        this.setState(
            {
                dob:e.target.value
            }
        );
    }
    onChangeGender(e){
        this.setState(
            {
                gender:e.target.value
            }
        );
    }
    onChangeOperation(e){
        this.setState(
            {
                operation:e.target.value
            }
        );
    }
    onClickCreate(e){
        this.setState({
            submitted:true
        });

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            firstName:nextProps.empData.firstName,
            surName:nextProps.empData.surName,
            email:nextProps.empData.email,
            dob:nextProps.empData.dob,
            gender:nextProps.empData.gender,
            id:nextProps.empData.id,
            submitted: false
        });
    }
    render(){
        return(
            <div className="container">
            {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                    <h3>Employee ID is {this.state.id}</h3>
                </div>
              ) : (
            <div className="container">
                        <h5 className="pad customColor3">Details of Employee id: {this.state.id}</h5>
                            <div className="form-group  row">
                                <label for="fname" className="col-sm-3 col-form-label">First Name:</label>                  
                             <div className="col-sm-7">    <input type="text" className="form-control" onChange={this.onChangeFirstName} name="fname" id="fname" value={this.state.firstName} required="true" placeholder="FirstName"></input>
                            </div><div className="col-sm-2"></div>
                            </div>
                
                        <div className="form-group row">
                        <label for="surname" className="col-sm-3 col-form-label">Sur Name:</label>
                        <div className="col-sm-7"> <input type="text" className="form-control"  placeholder="Surname" onChange={this.onChangeSurName} name="surname" id="surname" value={this.state.surName} required="true"></input>
                        </div>
                        <div className="col-sm-2">
                        </div></div>
                          <div className="form-group row">
                          <label for="email" className="col-sm-3 col-form-label"> Email:</label>
                          <div className="col-sm-7"> <input type="email" className="form-control" placeholder="email" onChange={this.onChangeEmail} name="email" id="email" value={this.state.email}  required="true"></input>
                          </div>
                          <div className="col-sm-2"></div>
                          </div>
                        <div className="form-group row">
                        <label for="dob" className="col-sm-3 col-form-label">DoB:</label>
                        <div className="col-sm-7"><input type="date"  className="form-control" placeholder="date of birth" onChange={this.onChangeDob} name="dob" id="dob" value={this.state.dob} required="true"></input>
                        </div>
                        <div className="col-sm-2"></div></div>
                           
                        <div className="form-group row">
                        <label className="col-sm-3 col-form-label">Gender:</label>
                        <div className="col-sm-7">  <div className="form-check">
                            <input type="radio" className="form-check-input" onChange={this.onChangeGender} name="gender" id="genderM" value="Male" checked={this.state.gender=="Male"}></input>
                            <label for="genderM">   Male</label>
                            </div>
                            <div className="form-check">
                            <input type="radio" className="form-check-input" onChange={this.onChangeGender} name="gender" id="genderF" value="Female"  checked={this.state.gender=="Female"} ></input>
                            <label for="genderF">Female</label>
                        </div>
                            </div>
                            <div className="col-sm-2"></div>
                      </div>
                    {(this.props.oper!="Read")?
                   ( <button type="submit" className="btn btn-secondary" id="submit" name="submitButton" onClick={this.callRespectService}>
                     Submit  </button>  ):(<div></div>)}

            </div>
              )
            }
            </div>
            
        )
    }
}

export default Employee;