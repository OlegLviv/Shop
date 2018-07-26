import React from 'react';
import Layout from './Layout';
import '../main.scss';
import DocumentTitle from 'react-document-title';
import {SITE_NAME} from "../constants/siteConstants";

export const App = () => (
	<DocumentTitle title={SITE_NAME}>
		<Layout/>
	</DocumentTitle>
);