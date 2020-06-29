import { memoizeOne } from '@bigcommerce/memoize';

import { createSelector } from '../common/selector';

import { SMSCode } from './sms-code';
import SMSCodeState, { DEFAULT_STATE } from './sms-code-state';

export default interface SMSCodeSelector {
    getSMSCode(): SMSCode | undefined;
    getSendError(): Error | undefined;
    isSending(): boolean;
    isSubmitting(): boolean;
}

export type SMSCodeSelectorFactory = (state: SMSCodeState) => SMSCodeSelector;

export function createSMSCodeSelectorFactory(): SMSCodeSelectorFactory {
    const getSMSCode = createSelector(
        (state: SMSCodeState) => state.data,
        SMSCode => () => SMSCode
    );

    const getSendError = createSelector(
        (state: SMSCodeState) => state.errors.sendError,
        error => () => error
    );

    const isSending = createSelector(
        (state: SMSCodeState) => !!state.statuses.isSending,
        status => () => status
    );

    const isSubmitting = createSelector(
        (state: SMSCodeState) => !!state.statuses.isSubmitting,
        status => () => status
    );

    return memoizeOne((
        state: SMSCodeState = DEFAULT_STATE
    ): SMSCodeSelector => {
        return {
            getSMSCode: getSMSCode(state),
            getSendError: getSendError(state),
            isSending: isSending(state),
            isSubmitting: isSubmitting(state),
        };
    });
}
