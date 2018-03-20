import React from 'react';

class StorePicker extends React.Component{
    render(){
        return (
        <React.Fragment>
            <form action="" className="store-selectore">
                <h2>PPP</h2>
                <input type="text" required placeholder="Store Name"/>
                <button type="submit">Visit Store arr </button>
            </form>
        </React.Fragment>
        )
    }
}

export default StorePicker;