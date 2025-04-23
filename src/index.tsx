import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageStyles, setPageStyles] = useState(defaultArticleState);
	const changeStyles = (value: ArticleStateType) => {
		setPageStyles(value);
	};

	const clearStyles = () => {
		setPageStyles(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageStyles.fontFamilyOption.value,
					'--font-size': pageStyles.fontSizeOption.value,
					'--font-color': pageStyles.fontColor.value,
					'--container-width': pageStyles.contentWidth.value,
					'--bg-color': pageStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm applyData={changeStyles} clearData={clearStyles} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
