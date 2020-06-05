export interface SMSCode {
    sent_code: string;
    expiry: number;
}

export interface SMSCodeRequestBody {
    email: string;
    phone_number: string;
}

export interface SubmitSMSCodeRequestBody {
    email: string;
    text_code: string;
}
