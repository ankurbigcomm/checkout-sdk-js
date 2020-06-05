import { createAction } from '@bigcommerce/data-store';
import { concat, defer, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { throwErrorAction } from '../common/error';
import { RequestOptions } from '../common/http-request';

import { SubmitSMSCodeRequestBody, SMSCodeRequestBody } from './sms-code';
import { SendSMSCodeAction, SMSCodeActionType } from './sms-code-actions';
import SMSCodeRequestSender from './sms-code-request-sender';

export default class SMSCodeActionCreator {
    constructor(
        private _requestSender: SMSCodeRequestSender
    ) {}

    sendSMSCode(
        request: SMSCodeRequestBody,
        options?: RequestOptions
    ): Observable<SendSMSCodeAction> {
        return concat(
            of(createAction(SMSCodeActionType.SendSMSCodeRequested)),
            defer(async () => {
                const { body } = await this._requestSender.sendSMSCode(request, options);

                return createAction(SMSCodeActionType.SendSMSCodeSucceeded, body);
            })
        ).pipe(
            catchError(error => throwErrorAction(SMSCodeActionType.SendSMSCodeFailed, error))
        );
    }

    submitSMSCode(
        request: SubmitSMSCodeRequestBody,
        options?: RequestOptions
    ): Observable<SendSMSCodeAction> {
        return concat(
            of(createAction(SMSCodeActionType.SendSMSCodeRequested)),
            defer(async () => {
                const { body } = await this._requestSender.submitSMSCode(request, options);

                return createAction(SMSCodeActionType.SendSMSCodeSucceeded, body);
            })
        ).pipe(
            catchError(error => throwErrorAction(SMSCodeActionType.SendSMSCodeFailed, error))
        );
    }
}
