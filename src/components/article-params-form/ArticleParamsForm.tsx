import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
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

type FormProps = {
	applyData: (pageStyles: ArticleStateType) => void;
	clearData: () => void;
};

export const ArticleParamsForm = (props: FormProps) => {
	const { applyData, clearData } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [selectValues, setSelectValues] = useState(defaultArticleState);
	const sidebar = useRef<HTMLElement>(null);

	const openForm = () => {
		if (!isOpen) {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		const closeByClick = (event: MouseEvent) => {
			if (!sidebar.current?.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', closeByClick);
		}

		return () => document.removeEventListener('mousedown', closeByClick);
	}, [isOpen]);

	const changeValues = (select: OptionType, optionName: string) => {
		setSelectValues({ ...selectValues, [optionName]: select });
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		applyData(selectValues);
		setIsOpen(false);
	};

	const handleClear = () => {
		clearData();
		setSelectValues(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={openForm} />
			<aside
				ref={sidebar}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<p className={styles.form_header}>Задайте параметры</p>
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
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleClear}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
