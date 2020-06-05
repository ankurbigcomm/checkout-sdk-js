import { RequestSender, Response } from '@bigcommerce/request-sender';

import { ContentType, RequestOptions } from '../common/http-request';

import { SubmitSMSCodeRequestBody, SMSCode, SMSCodeRequestBody } from './sms-code';

export default class SMSCodeRequestSender {
    constructor(
        private _requestSender: RequestSender
    ) {}

    sendSMSCode(
        {
            email,
            phone_number,
        }: SMSCodeRequestBody,
        {
            timeout,
        }: RequestOptions = {}
    ): Promise<Response<SMSCode>> {
        const url = '/login.php?action=text_login';
        const headers = { Accept: ContentType.JsonV1 };

        return this._requestSender.post(url, { body: {
            email,
            phone_number,
        }, headers, timeout });
    }

    submitSMSCode(
        {
            email,
            text_code,
        }: SubmitSMSCodeRequestBody,
        {
            timeout,
        }: RequestOptions = {}
    ): Promise<Response<SMSCode>> {
        const url = '/login.php?action=check_text_login';
        const headers = { Accept: ContentType.JsonV1 };

        return this._requestSender.post(url, { body: {
            email,
            text_code,
        }, headers, timeout });
    }
}
