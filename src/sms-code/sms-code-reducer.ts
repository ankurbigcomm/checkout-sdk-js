import { combineReducers, composeReducers, Action } from '@bigcommerce/data-store';

import { clearErrorReducer } from '../common/error';
import { objectMerge, objectSet } from '../common/utility';

import { SMSCode } from './sms-code';
import { SendSMSCodeAction, SubmitSMSCodeAction, SMSCodeActionType } from './sms-code-actions';
import SMSCodeState, { DEFAULT_STATE, SMSCodeErrorsState, SMSCodeStatusesState } from './sms-code-state';

export default function SMSCodeReducer(
    state: SMSCodeState = DEFAULT_STATE,
    action: Action
): SMSCodeState {
    const reducer = combineReducers<SMSCodeState>({
        data: dataReducer,
        errors: composeReducers(errorsReducer, clearErrorReducer),
        statuses: statusesReducer,
    });

    return reducer(state, action);
}

function dataReducer(
    data: SMSCode | undefined,
    action: SendSMSCodeAction
): SMSCode | undefined {
    switch (action.type) {
    case SMSCodeActionType.SendSMSCodeSucceeded:
        return objectMerge(data, action.payload);

    default:
        return data;
    }
}

function errorsReducer(
    errors: SMSCodeErrorsState = DEFAULT_STATE.errors,
    action: SendSMSCodeAction
): SMSCodeErrorsState {
    switch (action.type) {
    case SMSCodeActionType.SendSMSCodeRequested:
    case SMSCodeActionType.SendSMSCodeSucceeded:
        return objectSet(errors, 'sendError', undefined);

    case SMSCodeActionType.SendSMSCodeFailed:
        return objectSet(errors, 'sendError', action.payload);

    default:
        return errors;
    }
}

function statusesReducer(
    statuses: SMSCodeStatusesState = DEFAULT_STATE.statuses,
    action: SendSMSCodeAction | SubmitSMSCodeAction
): SMSCodeStatusesState {
    switch (action.type) {
    case SMSCodeActionType.SendSMSCodeRequested:
        return objectSet(statuses, 'isSending', true);

    case SMSCodeActionType.SendSMSCodeFailed:
    case SMSCodeActionType.SendSMSCodeSucceeded:
        return objectSet(statuses, 'isSending', false);

    case SMSCodeActionType.SubmitSMSCodeRequested:
        return objectSet(statuses, 'isSubmitting', true);

    case SMSCodeActionType.SubmitSMSCodeFailed:
    case SMSCodeActionType.SendSMSCodeSucceeded:
        return objectSet(statuses, 'isSubmitting', true);
    default:
        return statuses;
    }
}
