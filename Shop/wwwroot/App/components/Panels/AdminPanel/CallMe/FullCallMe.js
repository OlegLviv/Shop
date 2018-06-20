import React from 'react';
import './FullCallMe.scss';
import {apiDelete, apiGet, apiPut} from "../../../../services/api";
import {getCallMeByIdUrl, getChangeCallMeStatusUrl, getDeleteCallMeUrl} from "../../../../services/urls/orderUrls";
import {Spinner} from "../../../Spinner/Spinner";
import {getDateWithTimeString} from "../../../../utils/timeUtils";
import {CallMeStatus} from "../../../common/CallMeStatus/CallMeStatus";
import DocumentTitle from 'react-document-title';
import {SuccessDeletedCallMeModal} from "./SuccessDeletedCallMeModal";

const getId = props => props.match.params.id;

class FullCallMe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			callMe: null,
			loading: false,
			isShowSuccessDeletedCallMeModal: false
		}
	}


	componentDidMount() {
		this.updateCallMe();
	}

	trySetLoading = () => !this.state.loading && this.setState({loading: true});

	updateCallMe = () => {
		this.trySetLoading();

		apiGet(getCallMeByIdUrl(getId(this.props)))
			.then(resp => {
				console.log(resp);
				this.setState({
					loading: false,
					callMe: resp.data
				})
			})
			.catch(err => {
				this.setState({loading: false});
				alert(`Error: ${err}`);
			});
	};

	toggleStatus = () => {
		this.trySetLoading();

		let {callMeStatus} = {...this.state.callMe};

		if (callMeStatus === 0)
			callMeStatus = 1;
		else callMeStatus = 0;

		apiPut(getChangeCallMeStatusUrl(getId(this.props), callMeStatus))
			.then(resp => {
				this.setState({
					loading: false,
					callMe: resp.data
				});
			})
			.catch(err => {
				this.setState({loading: false});
				alert(`Error: ${err}`);
			});
	};

	onDeleteCallMe = () => {
		if (this.state.callMe && !this.state.loading) {
			this.trySetLoading();

			apiDelete(getDeleteCallMeUrl(this.state.callMe.id))
				.then(() => {
					this.setState({
						loading: false,
						isShowSuccessDeletedCallMeModal: true
					});
				})
				.catch(err => {
					this.setState({loading: false});
					alert(`Error:${err}`);
				});
		}
	};

	onCloseSuccessDeletedCallMeModal = () => {
		this.setState({isShowSuccessDeletedCallMeModal: false});
		window.location.replace('/adminPanel/call-me');
	};

	renderSuccessDeletedCallMeModal = () => <SuccessDeletedCallMeModal
		isOpen={this.state.isShowSuccessDeletedCallMeModal}
		onClose={this.onCloseSuccessDeletedCallMeModal}/>;

	render() {
		const {callMe, loading} = this.state;

		return (
			<DocumentTitle title={`Заявка на дзвінок: ${callMe ? callMe.name : ''}`}>
				<div className="call-me-cont">
					{this.renderSuccessDeletedCallMeModal()}
					<div className="call-me-cont__header">
						Інформація про зворотній дзвінок
					</div>
					{
						!loading && callMe ? <table>
							<thead>
							<tr>
								<th>Ім'я</th>
								<th>Телефон</th>
								<th>Дата</th>
								<th>Статус</th>
								<th>Видалити</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>{callMe.name}</td>
								<td>{callMe.phone}</td>
								<td>{getDateWithTimeString(callMe.date)}</td>
								<td>
									<CallMeStatus status={callMe.callMeStatus}
												  onClick={this.toggleStatus}/>
								</td>
								<td>
									<button className="btn btn-danger"
											onClick={this.onDeleteCallMe}>Видалити
									</button>
								</td>
							</tr>
							</tbody>
						</table> : <Spinner/>
					}
				</div>
			</DocumentTitle>
		);
	}
}

export default FullCallMe;