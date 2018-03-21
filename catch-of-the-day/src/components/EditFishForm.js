import React from 'react';

class EditFishForm extends React.Component{
    handleChange = event => {

        const updatedFish = {
            ...this.props.fish,
        [event.currentTarget.name]: event.currentTarget.value};
        this.props.updateFish(this.props.index, updatedFish);
    };

    render(){
        return (
            <div className="fish-edit">
                <input name="name" onChange={this.handleChange} value={this.props.fish.name} ref={this.nameRef} type="text" placeholder="Name" />
                <input name="price" onChange={this.handleChange} value={this.props.fish.price} ref={this.priceRef} type="text" placeholder="Price" />
                <select name="status" onChange={this.handleChange} value={this.props.fish.status} ref={this.statusRef} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} value={this.props.fish.desc} ref={this.descRef} placeholder="Desc" />
                <input name="image" onChange={this.handleChange} value={this.props.fish.image} ref={this.imageRef} type="text" placeholder="Image" />
                <button onClick={()=>this.props.deleteFish(this.props.index)}>Delete Fish</button>
            </div>
        )
    }
}

export default EditFishForm;