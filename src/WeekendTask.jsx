import React from "react";
import Axios from "axios";


const API_URL = `http://localhost:8080`;

class ProductWeekendTask extends React.Component{
    state = {
        productList: [],
        activeProducts: [],
        selectedFile: null,
        formProduct: {
            productName:  "",
            price: null,
            picture: "",
        },
        editProduct: {
            productName: "",
            price: null,
            picture: "",
        }
    }

    inputHandler = (e, key, form) => {
        const {value} =e.target;

        this.setState({
            [form]: {
                ...this.state[form],
                [key]: value,
            }
        })
    }

    fileChangeHandler = (e) => {
        this.setState({ selectedFile: e.target.files[0] });
    }

    editBtnHandler = (idx) => {
        this.setState({
            editProduct: {
                ...this.state.productList[idx],
            }
        })
    }

    showProductHandler = () => {
        Axios.get(`${API_URL}/productWeekendTask`)
            .then((res) => {
                console.log(res.data);
                this.setState({ productList: res.data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    editProductHandler = () => {
        Axios.put(
            `${API_URL}.productWeekendTask/${this.state.editProduct.id}`,
            this.state.editProduct
        )
        .then((res) => {
            alert("Success!")
            console.log(this.state.editProduct)
            this.showProductHandler();
        })
        .catch((err) => {
            alert("error")
            console.log(err)
        })
    }

    addProductHandler = () => {
        let formData = new FormData();

        formData.append(
            "file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        formData.append("productData", JSON.stringify(this.state.formProduct));

        Axios.post(`${API_URL}/productWeekendTask`, formData)
            .then((res) => {
                this.showProductHandler();
                alert("Success!", "Your item has been added to the list", "success");
                console.log(res.data);
            })
            .catch((err) => {
                alert("Error!", "Your item could not be added to the list", "error");
                console.log(err);
            });

        console.log(this.state.formProduct)
        console.log(JSON.stringify(this.state.formProduct))
    };

    deleteHandler = (id) => {
        Axios.delete(`${API_URL}/productWeekendtask/delete/${id}`)
            .then((res) => {
                console.log(res);
                this.showProductHandler()
                alert("Delete", " ", "success")

            })
            .catch((err) => {
                console.log(err);

            })
    }

    componentDidMount(){
        this.showProductHandler();
    }

    render(){
        return (
            <div>Weekend Task</div>
        )
    }
}
export default Products;