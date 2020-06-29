import { Action } from '@bigcommerce/data-store';

import { SMSCode } from './sms-code';

export enum SMSCodeActionType {
    SendSMSCodeRequested = 'SEND_SMS_CODE_REQUESTED',
    SendSMSCodeSucceeded = 'SEND_SMS_CODE_SUCCEEDED',
    SendSMSCodeFailed = 'SEND_SMS_CODE_FAILED',
    SubmitSMSCodeRequested = 'SUBMIT_SMS_CODE_REQUESTED',
    SubmitSMSCodeSucceeded = 'SUBMIT_SMS_CODE_SUCCEEDED',
    SubmitSMSCodeFailed = 'SUBMIT_SMS_CODE_FAILED',
}

export type SendSMSCodeAction =
    SendSMSCodeRequestedAction |
    SendSMSCodeSucceededAction |
    SendSMSCodeFailedAction;

export type SubmitSMSCodeAction =
    SubmitSMSCodeRequestedAction |
    SubmitSMSCodeSucceededAction |
    SubmitSMSCodeFailedAction;

export interface SendSMSCodeRequestedAction extends Action {
    type: SMSCodeActionType.SendSMSCodeRequested;
}

export interface SendSMSCodeSucceededAction extends Action<SMSCode> {
    type: SMSCodeActionType.SendSMSCodeSucceeded;
}

export interface SendSMSCodeFailedAction extends Action<Error> {
    type: SMSCodeActionType.SendSMSCodeFailed;
}

export interface SubmitSMSCodeRequestedAction extends Action {
    type: SMSCodeActionType.SubmitSMSCodeRequested;
}

export interface SubmitSMSCodeSucceededAction extends Action<SMSCode> {
    type: SMSCodeActionType.SubmitSMSCodeSucceeded;
}

export interface SubmitSMSCodeFailedAction extends Action<Error> {
    type: SMSCodeActionType.SubmitSMSCodeFailed;
}
