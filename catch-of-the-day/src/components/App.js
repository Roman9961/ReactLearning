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
    }

    addFish = fish => {
        const fishes = {...this.state.fishes};
        fishes[`fish${Date.now()}`] = fish;
        this.setState({ fishes });
    };
    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    }
    addToOrder = (key) => {
        const order = {...this.state.order};
        order[key] = order[key]+1 || 1;
        this.setState({order});
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
                <Order fishes = {this.state.fishes} order = {this.state.order}/>
                <Inventory
                    addFish = {this.addFish}
                    loadSampleFishes = {this.loadSampleFishes}
                />
            </div>
        )
    }
}

export default App;