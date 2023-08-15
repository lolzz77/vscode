/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { URI } from 'vs/base/common/uri';
import { createDecorator } from 'vs/platform/instantiation/common/instantiation';
import { Event } from 'vs/base/common/event';
import { IDisposable } from 'vs/base/common/lifecycle';
import { Command } from 'vs/editor/common/languages';
import { ISequence } from 'vs/base/common/sequence';
// import { IAction } from 'vs/base/common/actions';
// import { IMenu } from 'vs/platform/actions/common/actions';
import { ThemeIcon } from 'vs/base/common/themables';
// import { IMarkdownString } from 'vs/base/common/htmlContent';

export const VIEWLET_ID = 'workbench.view.symbol';
export const VIEW_PANE_ID = 'workbench.symbol';
export const REPOSITORIES_VIEW_PANE_ID = 'workbench.symbol.repositories';

// export interface IBaselineResourceProvider {
// 	getBaselineResource(resource: URI): Promise<URI>;
// }

export const ISymbolService = createDecorator<ISymbolService>('symbol');

export interface ISymbolResourceDecorations {
	icon?: URI | ThemeIcon;
	iconDark?: URI | ThemeIcon;
	tooltip?: string;
	strikeThrough?: boolean;
	faded?: boolean;
}

export interface ISymbolResource {
	readonly resourceGroup: ISymbolResourceGroup;
	readonly sourceUri: URI;
	readonly decorations: ISymbolResourceDecorations;
	readonly contextValue: string | undefined;
	readonly command: Command | undefined;
	open(preserveFocus: boolean): Promise<void>;
}

export interface ISymbolResourceGroup extends ISequence<ISymbolResource> {
	readonly provider: ISymbolProvider;
	readonly label: string;
	readonly id: string;
	readonly hideWhenEmpty: boolean;
	readonly onDidChange: Event<void>;
}

export interface ISymbolProvider extends IDisposable {
	readonly label: string;
	readonly id: string;
	readonly contextValue: string;

	readonly groups: ISequence<ISymbolResourceGroup>;

	// TODO@Joao: remove
	readonly onDidChangeResources: Event<void>;

	readonly rootUri?: URI;
	readonly inputBoxDocumentUri: URI;
	readonly count?: number;
	readonly commitTemplate: string;
	readonly onDidChangeCommitTemplate: Event<string>;
	readonly onDidChangeStatusBarCommands?: Event<readonly Command[]>;
	readonly acceptInputCommand?: Command;
	readonly actionButton?: ISymbolActionButtonDescriptor;
	readonly statusBarCommands?: readonly Command[];
	readonly onDidChange: Event<void>;

	getOriginalResource(uri: URI): Promise<URI | null>;
}

// export const enum InputValidationType {
// 	Error = 0,
// 	Warning = 1,
// 	Information = 2
// }

// export interface IInputValidation {
// 	message: string | IMarkdownString;
// 	type: InputValidationType;
// }

// export interface IInputValidator {
// 	(value: string, cursorPosition: number): Promise<IInputValidation | undefined>;
// }

// export enum SymbolInputChangeReason {
// 	HistoryPrevious,
// 	HistoryNext
// }

// export interface ISymbolInputChangeEvent {
// 	readonly value: string;
// 	readonly reason?: SymbolInputChangeReason;
// }

export interface ISymbolActionButtonDescriptor {
	command: Command;
	secondaryCommands?: Command[][];
	description?: string;
	enabled: boolean;
}

// export interface ISymbolActionButton {
// 	readonly type: 'actionButton';
// 	readonly repository: ISymbolRepository;
// 	readonly button?: ISymbolActionButtonDescriptor;
// }

// export interface ISymbolInput {
// 	readonly repository: ISymbolRepository;

// 	readonly value: string;
// 	setValue(value: string, fromKeyboard: boolean): void;
// 	readonly onDidChange: Event<ISymbolInputChangeEvent>;

// 	placeholder: string;
// 	readonly onDidChangePlaceholder: Event<string>;

// 	validateInput: IInputValidator;
// 	readonly onDidChangeValidateInput: Event<void>;

// 	enabled: boolean;
// 	readonly onDidChangeEnablement: Event<boolean>;

// 	visible: boolean;
// 	readonly onDidChangeVisibility: Event<boolean>;

// 	setFocus(): void;
// 	readonly onDidChangeFocus: Event<void>;

// 	showValidationMessage(message: string | IMarkdownString, type: InputValidationType): void;
// 	readonly onDidChangeValidationMessage: Event<IInputValidation>;

// 	showNextHistoryValue(): void;
// 	showPreviousHistoryValue(): void;
// }

// export interface ISymbolRepository extends IDisposable {
// 	readonly id: string;
// 	readonly provider: ISymbolProvider;
// 	readonly input: ISymbolInput;
// }

export interface ISymbolService {

	// readonly _serviceBrand: undefined;
	// readonly onDidAddRepository: Event<ISymbolRepository>;
	// readonly onDidRemoveRepository: Event<ISymbolRepository>;
	// readonly repositories: Iterable<ISymbolRepository>;
	// readonly repositoryCount: number;

	// registerSymbolProvider(provider: ISymbolProvider): ISymbolRepository;
	// getRepository(id: string): ISymbolRepository | undefined;
}

// export interface ISymbolTitleMenu {
// 	readonly actions: IAction[];
// 	readonly secondaryActions: IAction[];
// 	readonly onDidChangeTitle: Event<void>;
// 	readonly menu: IMenu;
// }

// export interface ISymbolRepositoryMenus {
// 	readonly titleMenu: ISymbolTitleMenu;
// 	readonly repositoryMenu: IMenu;
// 	getResourceGroupMenu(group: ISymbolResourceGroup): IMenu;
// 	getResourceMenu(resource: ISymbolResource): IMenu;
// 	getResourceFolderMenu(group: ISymbolResourceGroup): IMenu;
// }

// export interface ISymbolMenus {
// 	getRepositoryMenus(provider: ISymbolProvider): ISymbolRepositoryMenus;
// }

// export const enum ISymbolRepositorySortKey {
// 	DiscoveryTime = 'discoveryTime',
// 	Name = 'name',
// 	Path = 'path'
// }

// export const ISymbolViewService = createDecorator<ISymbolViewService>('SymbolView');

// export interface ISymbolViewVisibleRepositoryChangeEvent {
// 	readonly added: Iterable<ISymbolRepository>;
// 	readonly removed: Iterable<ISymbolRepository>;
// }

// export interface ISymbolViewService {
// 	readonly _serviceBrand: undefined;

// 	readonly menus: ISymbolMenus;

// 	repositories: ISymbolRepository[];
// 	readonly onDidChangeRepositories: Event<ISymbolViewVisibleRepositoryChangeEvent>;

// 	visibleRepositories: readonly ISymbolRepository[];
// 	readonly onDidChangeVisibleRepositories: Event<ISymbolViewVisibleRepositoryChangeEvent>;

// 	isVisible(repository: ISymbolRepository): boolean;
// 	toggleVisibility(repository: ISymbolRepository, visible?: boolean): void;

// 	toggleSortKey(sortKey: ISymbolRepositorySortKey): void;

// 	readonly focusedRepository: ISymbolRepository | undefined;
// 	readonly onDidFocusRepository: Event<ISymbolRepository | undefined>;
// 	focus(repository: ISymbolRepository): void;
// }
