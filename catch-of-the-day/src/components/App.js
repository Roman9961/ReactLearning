import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component{
    state = {
        fishes : {},
        order : {}
    };
    componentDidMount(){
        const params = this.props.match.params;
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef){
            this.setState({order: JSON.parse(localStorageRef)});
        }
        this.ref = base.syncState(`${params.storeId}/fishes`,{
            context: this,
            state: 'fishes'
        });
    }
    componentWillUnmount(){
        base.removeBinding(this.ref);
    }
    componentDidUpdate(){
        console.log('Update');
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order));
    }

    addFish = fish => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    };
    updateFish = (key, updatedFish) =>{
        const fishes = {...this.state.fishes};
        fishes[key] = updatedFish;
        this.setState({fishes});
    }
    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    }
    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key]+1 || 1;
        this.setState({order});
    }
    deleteFromOrder = (key) => {
        const order = {...this.state.order};
        (order[key]>1)?(order[key]=order[key]-1):delete order[key]  ;
        this.setState({order});
    }

    deleteFish = key => {
        const fishes = {...this.state.fishes};
        fishes[key] = null;
        this.setState({ fishes });
    }
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="fresh seafood market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => (
                            <Fish
                                key = {key}
                                details = {this.state.fishes[key]}
                                index = {key}
                                addToOrder = {this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order
                    fishes = {this.state.fishes}
                    order = {this.state.order}
                    deleteFromOrder = {this.deleteFromOrder}
                />
                <Inventory
                    addFish = {this.addFish}
                    updateFish = {this.updateFish}
                    deleteFish = {this.deleteFish}
                    fishes = {this.state.fishes}
                    loadSampleFishes = {this.loadSampleFishes}
                    storeId = {this.props.match.params.storeId}
                />
            </div>
        )
    }
}

export default App;