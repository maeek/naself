import { RootState } from '../../store'
import { dialogsAdapter } from './dialogs-reducer'

export const dialogSelectors = dialogsAdapter.getSelectors((state: RootState) => state.ui.dialogs)
