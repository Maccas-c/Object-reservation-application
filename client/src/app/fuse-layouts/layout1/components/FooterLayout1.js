import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import RegulationButton from 'app/fuse-layouts/shared-components/regulations/RegulationButton';
import PurchaseButton from 'app/fuse-layouts/shared-components/PurchaseButton';
import KnowledgeBaseButton from '../../shared-components/knowLedgeBase/KnowledgeBaseButton';
import PriceListButton from '../../shared-components/priceList/PriceListButton';

function FooterLayout1() {
	const footerTheme = useSelector(selectFooterTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className="relative z-10 shadow-md"
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.paper }}
			>
				<Toolbar
					style={{ justifyContent: 'flex-end' }}
					className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center overflow-x-auto"
				>
					<PurchaseButton className="mx-4" />
					<RegulationButton className="mx-4" />
					<KnowledgeBaseButton className="mx-4" />
					<PriceListButton className="mx-4" />
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(FooterLayout1);
