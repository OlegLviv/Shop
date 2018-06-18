import React from 'react';
import './CallMe.scss';
import {apiGet} from "../../../../services/api";
import {getCallMeUrl} from "../../../../services/urls/orderUrls";
import Pagination from 'react-js-pagination';
import {Spinner} from "../../../Spinner/Spinner";
import {getDateWithTimeString} from "../../../../utils/timeUtils";
import {Link} from 'react-router-dom';
import DocumentTitle from 'react-document-title';

const callMeListPerPage = 5;

class CallMe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			callMeArr: [],
			activePage: 1,
			totalProductCount: 0,
			callMeStatus: 0
		}
	}

	componentDidMount() {
		this.updateCallMeList(this.state.callMeStatus, this.state.activePage);
	}

	componentWillUpdate(nextProps, nextState) {
		if (this.state.callMeStatus !== nextState.callMeStatus)
			this.updateCallMeList(nextState.callMeStatus, this.state.activePage);
	}

	trySetLoading = () => !this.state.loading && this.setState({loading: true});

	updateCallMeList = (callMeStatus, activePage) => {
		this.trySetLoading();

		apiGet(getCallMeUrl(callMeStatus, activePage, callMeListPerPage))
			.then(resp => {
				this.setState({
					loading: false,
					callMeArr: resp.data.data,
					activePage: resp.data.pageNumber,
					totalProductCount: resp.data.totalCount
				});
			})
			.catch(err => {
				this.setState({loading: false});
				alert(`Error: ${err}`);
			});
	};

	onPaginationChange = pageNumber => this.updateCallMeList(this.state.callMeStatus, pageNumber);

	onChangeSelectCallMeStatus = ({target}) => this.setState({callMeStatus: target.value});

	renderCallMeList = () => {
		if (this.state.callMeArr.length)
			return (
				<ul className="list-group call-me-cont__list-box__list-group">
					{
						this.state.callMeArr.map(item => (
							<Link to={`/adminPanel/call-me/${item.id}`}>
								<li className="list-group-item call-me-cont__list-box__list-group__item">
									<div>{`Ім'я: ${item.name}`}</div>
									<div>{`Телефон: ${item.phone}`}</div>
									<div>{`Дата: ${getDateWithTimeString(item.date)}`}</div>
								</li>
							</Link>
						))
					}
				</ul>
			);
		return (
			<h4 className="text-center">
				Нічого не знайдено
			</h4>
		);
	};

	render() {
		return (
			<DocumentTitle title="Заявки на дзвінки">
				<div className="call-me-cont">
					<div className="call-me-cont__header">
						<div>Заявки на дзвінки</div>
						<select onChange={this.onChangeSelectCallMeStatus} className="form-control">
							<option value={0}>Нові</option>
							<option value={1}>Виконані</option>
						</select>
					</div>
					<div className="call-me-cont__list-box">
						{
							!this.state.loading ? this.renderCallMeList() : <Spinner/>
						}
					</div>
					<div className="edit-container__pagin-box">
						{this.state.callMeArr.length > 0 && <Pagination totalItemsCount={this.state.totalProductCount}
																		itemsCountPerPage={callMeListPerPage}
																		onChange={this.onPaginationChange}
																		activePage={this.state.activePage}
																		itemClass="page-item"
																		linkClass="page-link"
																		innerClass="edit-container__pagin-box__pagin pagination"/>}
					</div>
				</div>
			</DocumentTitle>
		);
	}
}

export default CallMe;