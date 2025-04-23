import { CSSProperties, useState } from 'react';

import { Article } from '../../components/article/Article';
import { ArticleParamsForm } from '../../components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [pageStyles, setPageStyles] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageStyles.fontFamilyOption.value,
					'--font-size': pageStyles.fontSizeOption.value,
					'--font-color': pageStyles.fontColor.value,
					'--container-width': pageStyles.contentWidth.value,
					'--bg-color': pageStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setPageStyles={setPageStyles} />
			<Article />
		</main>
	);
};
