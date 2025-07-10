import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

type ArticleParamsFormProps = {
	setPageStyles: (selectValues: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setPageStyles,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectValues, setSelectValues] = useState(defaultArticleState);
	const sidebar = useRef<HTMLElement>(null);

	const toggleMenu = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		const closeByClick = (event: MouseEvent) => {
			if (!sidebar.current?.contains(event.target as Node)) {
				setIsSidebarOpen(false);
			}
		};

		if (isSidebarOpen) {
			document.addEventListener('mousedown', closeByClick);
		} else {
			document.removeEventListener('mousedown', closeByClick);
		}

		return () => document.removeEventListener('mousedown', closeByClick);
	}, [isSidebarOpen]);

	const changeValues = (select: OptionType, optionName: string) => {
		setSelectValues({ ...selectValues, [optionName]: select });
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPageStyles(selectValues);
		setIsSidebarOpen(false);
	};

	const handleClear = () => {
		setSelectValues(defaultArticleState);
		setPageStyles(defaultArticleState);
		setIsSidebarOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleMenu} />
			<aside
				ref={sidebar}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleClear}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectValues.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={changeValues}
						optionName='fontFamilyOption'
					/>
					<RadioGroup
						name='radio'
						selected={selectValues.fontSizeOption}
						options={fontSizeOptions}
						title='размер шрифта'
						onChange={changeValues}
						optionName='fontSizeOption'
					/>
					<Select
						selected={selectValues.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={changeValues}
						optionName='fontColor'
					/>
					<Separator />
					<Select
						selected={selectValues.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={changeValues}
						optionName='backgroundColor'
					/>
					<Select
						selected={selectValues.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={changeValues}
						optionName='contentWidth'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
