import React from 'react';
import './FullCallMe.scss';
import {apiGet, apiPut} from "../../../../services/api";
import {getCallMeByIdUrl, getChangeCallMeStatusUrl} from "../../../../services/urls/orderUrls";
import {Spinner} from "../../../Spinner/Spinner";
import {getDateWithTimeString} from "../../../../utils/timeUtils";
import {CallMeStatus} from "../../../common/CallMeStatus/CallMeStatus";

const getId = props => props.match.params.id;

class FullCallMe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			callMe: null,
			loading: false
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

	render() {
		const {callMe, loading} = this.state;

		return (
			<div className="call-me-cont">
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
						</tr>
						</tbody>
					</table> : <Spinner/>
				}
			</div>
		)
	}
}

export default FullCallMe;