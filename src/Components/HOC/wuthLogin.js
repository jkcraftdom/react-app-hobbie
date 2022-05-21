import {Component} from 'react'

function withLogin(WrapperComponent){

    return class LoginWrapperComponente extends Component{
        constructor(props){
            super(props)

            this.state = {loggued: false}    
            this.verifyUserLogin = this.verifyUserLogin.bind(this)
        }

        verifyUserLogin(){
            setTimeout(()=>{
                const loggued = Math.round(Math.random())
                this.setState({loggued: loggued === 1})
            })
        }

        componentDidMount(){
            this.verifyUserLogin()
        }

        render(){
            return (
                <WrapperComponent 
                    {...this.props}
                    loggued = {this.state.loggued}
                ></WrapperComponent>
            )
        }

    }
}