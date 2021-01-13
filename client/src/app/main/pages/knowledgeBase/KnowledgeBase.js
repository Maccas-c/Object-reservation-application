import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import knowledgeBaseDB from '../../../../@fake-db/db/knowledge-base-db';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function KnowledgeBase() {
	const classes = useStyles();
	const [dialog, setDialog] = useState({
		open: false,
		title: null,
		content: null
	});

	function handleOpenDialog(dialogData) {
		setDialog({
			open: true,
			...dialogData
		});
	}

	return (
		<div className="w-full">
			<div
				className={clsx(
					classes.header,
					'flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-36 sm:text-56 font-light">
						Jak możemy ci pomóc?
					</Typography>
				</FuseAnimate>

				<FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="opacity-75 mt-16 mx-auto max-w-512">
						Zapraszamy do podstawowych instrukcji w naszej aplikacji!
					</Typography>
				</FuseAnimate>
			</div>

			<div>
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
					className="flex flex-wrap justify-center max-w-xl w-full mx-auto px-16 sm:px-24 py-32"
				>
					{knowledgeBaseDB.map(category => (
						<div className="max-w-md w-full max-w-512 pb-24 md:w-1/2 md:p-16" key={category.id}>
							<Card className="rounded-8 shadow">
								<List component="nav" className="p-0">
									<Typography className="font-bold pl-32 py-16 text-16">{category.title}</Typography>

									{category.featuredArticles.map((article, index) => (
										<ListItem
											key={index}
											onClick={() => handleOpenDialog(article)}
											className="pl-32 border-b-1 border-solid"
											button
										>
											<ListItemIcon className="min-w-40">
												<Icon className="text-20">import_contacts</Icon>
											</ListItemIcon>
											<ListItemText primary={article.title} />
										</ListItem>
									))}
								</List>
							</Card>
						</div>
					))}
				</FuseAnimateGroup>
			</div>

			{useMemo(() => {
				function handleCloseDialog() {
					setDialog({
						...dialog,
						open: false
					});
				}

				return (
					<Dialog
						open={dialog.open}
						onClose={handleCloseDialog}
						aria-labelledby="knowledge-base-document"
						TransitionComponent={Transition}
					>
						<DialogTitle>{dialog.title}</DialogTitle>
						<DialogContent>
							<DialogContentText dangerouslySetInnerHTML={{ __html: dialog.content }} />
						</DialogContent>
						<DialogActions>
							<Button onClick={handleCloseDialog} color="primary">
								Zamknij
							</Button>
						</DialogActions>
					</Dialog>
				);
			}, [dialog])}
		</div>
	);
}

export default KnowledgeBase;
