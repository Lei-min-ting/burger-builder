import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary';


const withErrorHandler = (WrappedComponent,axios) =>{
    return class extends Component{

        state = {
            error: null
        }
        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })
            this.reqInterceptor = axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            });
        }
        errorConfiremHandler =()=>{
            this.setState({error:null})
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.reqInterceptor);
        }
        render(){
            return(
                <Auxiliary>
                    <Modal show={this.state.error}
                            cliceked = {this.errorConfiremHandler}>
                        {this.state.error ? this.state.error.massage : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;
