import { SMSCode } from './sms-code';

export default interface SMSCodeState {
    data?: SMSCode;
    errors: SMSCodeErrorsState;
    statuses: SMSCodeStatusesState;
}

export interface SMSCodeErrorsState {
    sendError?: Error;
}

export interface SMSCodeStatusesState {
    isSending?: boolean;
    isSubmitting?: boolean;
}

export const DEFAULT_STATE: SMSCodeState = {
    errors: {},
    statuses: {},
};
