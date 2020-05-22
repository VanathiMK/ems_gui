import React,{ Component } from "react";

class Header extends Component{
    construtor(props){


    }
    render(){
        const operation = this.props.currentOper;
        var titleLabel;
        switch(operation){
            case "Create":{

            }
            case "Read":{

            }
            case "Update":{

            }
            case "Delete":{

            }
        }
        return(

<div>  
    <h4> Create New Employee</h4>
    <table>
        <tr>
            <td>
                {//Current operation is sent from App.js in props
                }
       
        <label>Employee ID: {this.props.currentOper}</label>
            </td>
            <td>
                <input type="text"/>
            </td>
        </tr>
    </table>
     </div>
        

        );
    }
}
export default Header;