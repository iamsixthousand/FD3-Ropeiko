import React from 'react';
import PropTypes from 'prop-types';

import './Ishop.css';
import Product from './Product.jsx';
import AddOrEditBlock from './AddOrEditBlock.jsx';

class Ishop extends React.Component {

    static propTypes = {
        products: PropTypes.array.isRequired,
    }

    state = {
        prodSelected: null,
        products: this.props.products,
        isInChangeMode: false,
        workmode: 'Просмотр',
        maxProdId: this.props.products.length,
        nextProduct: null,
    };

    createProd = () => { //метод только в данном компоненте
        this.setState({
            nextProduct: {
                prodname: '',
                price: '',
                photolink: '',
                count: '',
                code: ++this.state.maxProdId, //code для нового элемента 
            },
            workmode: 'Создать',
            prodSelected: null,
        }
        );
    }
    prodSelect = (code, prod) => { //метод для Product
        this.setState({ prodSelected: code, workmode: 'Просмотр', nextProduct: prod });
    }

    prodDelete = (code) => { //метод для Product
        this.setState({
            products: this.state.products.filter(prod => prod.code != code),
            nextProduct: (this.state.prodSelected == code) ? null : this.state.nextProduct,
            //maxProdId: --this.state.products.length,
        });
    }

    cbSave = (code, workmode, prod) => { //метод для AddOrEditBlock
        const newProduct = this.state.products.find(product => product.code == code) || {};
        newProduct.prodname = prod.prodname;
        newProduct.price = prod.price;
        newProduct.photolink = prod.photolink;
        newProduct.count = prod.count;

        if (workmode === 'Создать') {
            newProduct.code = prod.code;
            this.state.products.push(newProduct);
            //this.setState({maxProdId: ++this.state.products.length})
        }

        this.setState({ workmode: 'Просмотр', isInChangeMode: false, nextProduct: newProduct });

    }

    cbCancel = () => { //метод для AddOrEditBlock
        this.setState({
            workmode: 'Просмотр',
            isInChangeMode: false,
            nextProduct: this.state.products.find(prod => prod.code == this.state.prodSelected) || null,
            maxProdId: (this.state.workmode === 'Создать') ? this.state.products.length - 1 : this.state.products.length,
        })
    }

    cbEdit = (code, prod) => { //метод для Product
        this.setState({ prodSelected: code, nextProduct: prod, workmode: 'Изменить' });
    }

    cbInChangeToggle = (tf) => { //метод для AddOrEditBlock
        this.setState({ isInChangeMode: tf });
    }

    render() {

        const headers = ['Наименование', 'Цена', 'Ссылка на фото', 'Осталось на складе', 'Управление'].map(header =>
            <th className="Header" key={header}>
                {header}
            </th>
        );

        const prodElements = this.state.products.map(prod =>
            <Product
                key={prod.code} prodSelect={this.prodSelect} prodDelete={this.prodDelete} cbEdit={this.cbEdit}
                isSelected={this.state.prodSelected == prod.code} product={prod} isInChangeMode={this.state.isInChangeMode}
                workmode={this.state.workmode}
            />
        );

        return (
            <div className="Ishop">
                <table className={(this.state.isInChangeMode ? 'Disabled' : 'Products')}>
                    <thead className='Header'>
                        <tr>{headers}</tr>
                    </thead >
                    <tbody className='Table'>
                        {prodElements}
                    </tbody>
                </table>
                <button
                    onClick={this.createProd}
                    disabled={this.state.workmode === 'Создать' || this.state.isInChangeMode}>
                    ДОБАВИТЬ
                </button>
                {
                    (this.state.nextProduct) &&
                    <AddOrEditBlock
                        product={this.state.nextProduct}
                        workmode={this.state.workmode}
                        changeModeToggle={this.cbInChangeToggle}
                        cbSave={this.cbSave}
                        cbCancel={this.cbCancel}
                        key={this.state.nextProduct.code + this.state.workmode}
                    />
                }
            </div>
        );
    }
}

export default Ishop;