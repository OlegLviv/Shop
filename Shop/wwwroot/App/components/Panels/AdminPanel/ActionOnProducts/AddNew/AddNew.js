import React from 'react';
import './AddNew.scss';
import {NAVIGATION_CATEGORIES} from "../../../../../utils/productsUtils";
import {normalizeCategory} from "../../../../../utils/productsUtils";

class AddNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: 'Рюкзаки. Сумочки'
        }
    }

    onChangeOptionCategory = (e) => {
        this.setState({category: e.target.value})
    };

    render() {
        return (
            <div className="container-add-new">
                <div className="row container-add-new__row">
                    <div className="col-6 container-add-new__row__item" border-right="true">
                        <div>Оберіть карегорію</div>
                    </div>
                    <div className="col-6 container-add-new__row__item">
                        <div>Оберіть підкарегорію</div>
                    </div>
                    <div className="col-6 container-add-new__row__item--inverse" border-right="true"
                         border-bottom="true" border-left="true">
                        <select onChange={this.onChangeOptionCategory}>
                            {
                                NAVIGATION_CATEGORIES.map(item => <option
                                    value={item}>{item}
                                </option>)
                            }
                        </select>
                    </div>
                    <div className="col-6 container-add-new__row__item--inverse" border-right="true"
                         border-bottom="true">
                        <select>
                            {
                                normalizeCategory(this.state.category).map(item => <option>{item}</option>)
                            }
                        </select>
                    </div>
                    <div className="col-6 container-add-new__row__item" border-right="true" margin-top="true">
                        <div>Властивість товару</div>
                    </div>
                    <div className="col-6 container-add-new__row__item" margin-top="true">
                        <div>Значення властивості</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddNew;