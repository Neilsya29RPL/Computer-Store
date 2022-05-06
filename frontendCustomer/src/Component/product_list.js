
import React from "react";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

export default class ProdList extends React.Component{
    render(){
        return (
        <div className="col-lg-6 col-sm-12 p-2" >
            <div className="card">
                <div className="card-body row" >
                    {/* menampilkan Gambar / cover */}
                    <div className="col-6">
                        <img src={this.props.image} className="image" height="150" />
                    </div>
                    {/* menampilkan deskripsi */}
                    <div className="col-6">
                        <h5 className="text-info">
                            { this.props.name }
                        </h5>
                        <h6 className="text-danger">
                            Price     : { this.props.price}
                        </h6>
                        <h6 className="text-dark">
                            Stock    : { this.props.stock}
                        </h6>
                         {/* button untuk menambah ke keranjang belanja */}
                         <button className="btn btn-sm btn-success m-1" onClick={this.props.onCart}>
                            Add to Card
                        </button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}