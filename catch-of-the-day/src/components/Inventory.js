import React from 'react';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, {firebaseApp} from '../base';

class Inventory extends React.Component{

    state = {
        uid: null,
        owner: null
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=> {
                if (user) {
                    this.authHandler({user})
                }
            }
        )
    }
    authHandler = async authData =>{
        const store = await base.fetch(this.props.storeId, {context: this});
        if(!store.owner){
            await base.post(`${this.props.storeId}/owner`,{
                data: authData.user.uid
            })
        }
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }
    authenticate = (provider) =>{
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }
    logOut = async () =>{
        await  firebase.auth().signOut();
        this.setState({uid:null});
    }
    render(){
        const logOut = <button onClick={this.logOut}>Logout</button>
        if (!this.state.uid) {
            {logOut}
            return <Login authenticate={this.authenticate}/>;
        }
        return (
            <div className="inventory">
                <h2>Inventory!</h2>
                {logOut}
                {Object.keys(this.props.fishes).map(key =>
                    <EditFishForm
                        key = {key}
                        index = {key}
                        updateFish = {this.props.updateFish}
                        deleteFish = {this.props.deleteFish}
                        fish = {this.props.fishes[key]}/>
                )}
                <AddFishForm addFish = {this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load sample fishes</button>
            </div>
        )
    }
}

export default Inventory;